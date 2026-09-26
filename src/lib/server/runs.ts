import { randomBytes, createHash } from 'node:crypto';
import { QUESTIONS } from '$lib/data';
import { LEVELS, deriveTier } from '$lib/quiz';
import type { Tier } from '$lib/types';
import { ensureSchema, query } from './db';
import { isBanned } from './blocklist';

// Publish + read logic. `verifyPayload` is the important one: the question bank
// is public, so a client-supplied score is trivially forgeable. We re-derive
// everything from the bank and ignore whatever the client claims.

export interface PublishAnswer {
	questionId: string;
	/** the chosen option's text, or null for a timeout */
	choice: string | null;
	timeMs: number;
}

export interface BoardRow {
	id: string;
	alias: string | null;
	level: number;
	score: number;
	total: number;
	tier: Tier;
	total_ms: number;
	created_at: string;
}

export interface PublicRun extends BoardRow {
	answers: PublishAnswer[];
}

export interface Verified {
	level: 1 | 2 | 3;
	score: number;
	total: number;
	tier: Tier;
	totalMs: number;
	answers: PublishAnswer[];
}

const QUESTION_BY_ID = new Map(QUESTIONS.map((q) => [q.id, q]));
const ALIAS_MAX = 24;

/** 8-char base64url id — the public capability to view (and rank) a run. */
function newId(): string {
	return randomBytes(6).toString('base64url');
}

function hashToken(token: string): string {
	return createHash('sha256').update(token).digest('hex');
}

/**
 * Keep the (optional) name to letters/numbers plus a little punctuation, capped.
 * Whitelisting beats blacklisting here: it kills links, markup and most abuse.
 */
export type AliasResult = { ok: true; alias: string | null } | { ok: false; error: string };

export function cleanAlias(input: unknown): AliasResult {
	if (typeof input !== 'string') return { ok: true, alias: null };
	const s = input
		.replace(/[^\p{L}\p{N} ._'’\-!?]/gu, '')
		.replace(/\s+/g, ' ')
		.trim()
		.slice(0, ALIAS_MAX)
		.trim();
	if (s.length < 2) return { ok: true, alias: null };
	if (isBanned(s)) return { ok: false, error: 'pick a different name' };
	return { ok: true, alias: s };
}

/** Validate against the real bank and recompute the score server-side. */
export function verifyPayload(payload: unknown): Verified | { error: string } {
	if (!payload || typeof payload !== 'object') return { error: 'bad payload' };
	const p = payload as Record<string, unknown>;

	const level = p.level;
	if (level !== 1 && level !== 2 && level !== 3) return { error: 'bad level' };
	const spec = LEVELS[level];

	if (!Array.isArray(p.answers)) return { error: 'bad answers' };
	if (p.answers.length !== spec.count) return { error: 'wrong question count' };

	const seen = new Set<string>();
	const answers: PublishAnswer[] = [];
	let score = 0;
	let totalMs = 0;

	for (const raw of p.answers) {
		if (!raw || typeof raw !== 'object') return { error: 'bad answer' };
		const a = raw as Record<string, unknown>;

		const q = typeof a.questionId === 'string' ? QUESTION_BY_ID.get(a.questionId) : undefined;
		if (!q) return { error: 'unknown question' };
		if (q.difficulty !== level) return { error: 'question outside level' };
		if (seen.has(q.id)) return { error: 'duplicate question' };
		seen.add(q.id);

		const choice = typeof a.choice === 'string' ? a.choice : null;
		if (choice !== null && !q.choices.includes(choice)) return { error: 'choice not in bank' };
		if (choice !== null && choice === q.choices[q.answerIndex]) score += 1;

		const rawMs = typeof a.timeMs === 'number' && Number.isFinite(a.timeMs) ? a.timeMs : 0;
		const timeMs = Math.max(0, Math.min(120_000, Math.round(rawMs)));
		totalMs += timeMs;

		answers.push({ questionId: q.id, choice, timeMs });
	}

	return { level, score, total: spec.count, tier: deriveTier(score, spec.count), totalMs, answers };
}

export interface PublishedRun {
	id: string;
	/** Returned once, at publish. Only its hash is stored, and it's the only way to delete the run. */
	deleteToken: string;
}

export async function publishRun(
	payload: unknown,
	alias: unknown
): Promise<PublishedRun | { error: string }> {
	const v = verifyPayload(payload);
	if ('error' in v) return v;

	await ensureSchema();
	const cleaned = cleanAlias(alias);
	if (!cleaned.ok) return { error: cleaned.error };

	const id = newId();
	const deleteToken = randomBytes(16).toString('base64url');
	await query(
		`insert into runs (id, level, score, total, tier, alias, total_ms, answers, delete_token_hash)
		 values ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9)`,
		[
			id,
			v.level,
			v.score,
			v.total,
			v.tier,
			cleaned.alias,
			v.totalMs,
			JSON.stringify(v.answers),
			hashToken(deleteToken)
		]
	);
	return { id, deleteToken };
}

/** Delete a run, but only with the token handed out at publish. */
export async function deleteRun(id: string, token: string): Promise<boolean> {
	if (!/^[A-Za-z0-9_-]{6,16}$/.test(id) || !token) return false;
	await ensureSchema();
	const rows = await query(
		`delete from runs where id = $1 and delete_token_hash = $2 returning id`,
		[id, hashToken(token)]
	);
	return rows.length > 0;
}

export async function getRun(id: string): Promise<PublicRun | null> {
	if (!/^[A-Za-z0-9_-]{6,16}$/.test(id)) return null;
	await ensureSchema();
	const rows = await query<PublicRun>(
		`select id, alias, level, score, total, tier, total_ms, created_at, answers
		   from runs where id = $1 limit 1`,
		[id]
	);
	return rows[0] ?? null;
}

/** Leaderboard: accuracy first, then speed, then who got there earliest. */
export async function getBoard(level: 1 | 2 | 3 | 'all', limit = 50): Promise<BoardRow[]> {
	await ensureSchema();
	const lvl = level === 'all' ? null : level;
	return query<BoardRow>(
		`select id, alias, level, score, total, tier, total_ms, created_at
		   from runs
		  where ($1::smallint is null or level = $1)
		  order by (score::numeric / total) desc, total_ms asc, created_at asc
		  limit $2`,
		[lvl, limit]
	);
}
