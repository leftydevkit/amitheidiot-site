import { fail, redirect } from '@sveltejs/kit';
import { createHash, timingSafeEqual } from 'node:crypto';
import { env } from '$env/dynamic/private';
import { dbConfigured } from '$lib/server/db';
import { listRuns, type PublishAnswer } from '$lib/server/runs';
import { QUESTIONS } from '$lib/data';
import type { Actions, PageServerLoad } from './$types';

export const prerender = false;

const COOKIE = 'amit_admin';
const SHOWN = 200;

const QUESTION_BY_ID: Record<string, (typeof QUESTIONS)[number]> = Object.fromEntries(
	QUESTIONS.map((q) => [q.id, q])
);

/** Constant-time compare of two strings of any length (hash first: equal length). */
function sameKey(a: string, b: string): boolean {
	const h = (s: string) => createHash('sha256').update(s).digest();
	return timingSafeEqual(h(a), h(b));
}

function isAuthed(cookies: { get(name: string): string | undefined }): boolean {
	const key = env.ADMIN_KEY || '';
	if (!key) return false;
	const given = cookies.get(COOKIE) || '';
	return given.length > 0 && sameKey(given, key);
}

interface AdminAnswer extends PublishAnswer {
	prompt: string;
	correct: boolean;
	correctChoice: string;
}

function enrich(answers: PublishAnswer[]): AdminAnswer[] {
	return (answers || []).map((a) => {
		const q = QUESTION_BY_ID[a.questionId];
		return {
			...a,
			prompt: q?.prompt ?? a.questionId,
			correctChoice: q ? q.choices[q.answerIndex] : '',
			correct: Boolean(q && a.choice !== null && a.choice === q.choices[q.answerIndex])
		};
	});
}

export const load: PageServerLoad = async ({ cookies, url }) => {
	if (!(env.ADMIN_KEY || ''))
		return { configured: false, authed: false, db: false, level: null, q: '', rows: [], truncated: false, stats: null };
	if (!isAuthed(cookies))
		return { configured: true, authed: false, db: dbConfigured(), level: null, q: '', rows: [], truncated: false, stats: null };
	if (!dbConfigured())
		return { configured: true, authed: true, db: false, level: null, q: '', rows: [], truncated: false, stats: null };

	const levelRaw = url.searchParams.get('level');
	const level = levelRaw === '1' || levelRaw === '2' || levelRaw === '3' ? Number(levelRaw) : null;
	const q = (url.searchParams.get('q') || '').trim().toLowerCase();

	let all;
	try {
		all = await listRuns(500);
	} catch (e) {
		// An unreachable or unmigrated database should render the page, not 500 it.
		console.error('[admin] list failed:', e);
		return { configured: true, authed: true, db: false, level: null, q: '', rows: [], truncated: false, stats: null };
	}

	const rows = all
		.filter((r) => (level === null ? true : r.level === level))
		.filter((r) => {
			if (!q) return true;
			return (r.alias || '').toLowerCase().includes(q) || r.id.toLowerCase().includes(q);
		})
		.map((r) => ({
			id: r.id,
			alias: r.alias,
			level: r.level,
			score: r.score,
			total: r.total,
			tier: r.tier,
			total_ms: r.total_ms,
			created_at: r.created_at,
			when: new Date(r.created_at).toISOString().replace('T', ' ').slice(0, 16),
			pct: Math.round((r.score / r.total) * 100),
			answers: enrich(r.answers)
		}));

	const tierCounts: Record<string, number> = { CITIZEN: 0, RESIDENT: 0, 'IDIŌTĒS': 0, IDIOT: 0 };
	const byQuestion: Record<string, { prompt: string; asked: number; correct: number; missed: number; timeouts: number }> = {};

	for (const r of rows) {
		tierCounts[r.tier] = (tierCounts[r.tier] || 0) + 1;
		for (const a of r.answers) {
			const hit = (byQuestion[a.questionId] ??= {
				prompt: a.prompt,
				asked: 0,
				correct: 0,
				missed: 0,
				timeouts: 0
			});
			hit.asked += 1;
			if (a.correct) hit.correct += 1;
			else hit.missed += 1;
			if (a.choice === null) hit.timeouts += 1;
		}
	}

	const questions = Object.entries(byQuestion)
		.map(([id, v]) => ({ id, ...v, accuracy: v.asked ? Math.round((v.correct / v.asked) * 100) : 0 }))
		.sort((a, b) => b.missed - a.missed || a.accuracy - b.accuracy);

	const avgPct = rows.length
		? Math.round(rows.reduce((n, r) => n + r.pct, 0) / rows.length)
		: 0;

	return {
		configured: true,
		authed: true,
		db: true,
		level,
		q,
		rows: rows.slice(0, SHOWN),
		truncated: rows.length > SHOWN,
		stats: {
			total: rows.length,
			showing: Math.min(rows.length, SHOWN),
			avgPct,
			perfect: rows.filter((r) => r.score === r.total).length,
			tiers: tierCounts,
			questions
		}
	};
};

export const actions: Actions = {
	login: async ({ request, cookies, url }) => {
		const key = env.ADMIN_KEY || '';
		if (!key) return fail(503, { error: 'admin is not configured (set ADMIN_KEY)' });
		const data = await request.formData();
		const given = String(data.get('key') || '');
		if (!given || !sameKey(given, key)) return fail(401, { error: 'wrong key' });
		cookies.set(COOKIE, given, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: url.protocol === 'https:',
			maxAge: 60 * 60 * 12
		});
		throw redirect(303, '/admin');
	},
	logout: async ({ cookies }) => {
		cookies.delete(COOKIE, { path: '/' });
		throw redirect(303, '/admin');
	}
};
