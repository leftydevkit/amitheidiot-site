import { QUESTIONS } from './data';
import type { Question, Tier } from './types';

/**
 * A difficulty tier. Named in the app's dry, mean voice — MAGA-flavoured, since
 * the whole point is to make the people who slept through civics squirm. The
 * harder the level, the less rope per question and the more questions you owe.
 * `difficulty` on a Question is the level key.
 */
export interface Level {
	name: string;
	/** Per-question clock, in seconds. */
	seconds: number;
	/** Questions asked in a run at this level. */
	count: number;
	/** One-line pitch, shown in the difficulty selector. */
	description: string;
}

export const LEVELS: Record<1 | 2 | 3, Level> = {
	1: {
		name: 'the rally',
		seconds: 12,
		count: 5,
		description:
			'five questions, twelve seconds apiece. the easy ones — the things you would know if you had ever read past a headline. there is no excuse for missing any of them.'
	},
	2: {
		name: 'the echo chamber',
		seconds: 8,
		count: 8,
		description:
			'eight questions, eight seconds apiece. this is where the things you "heard somewhere" start to cost you.'
	},
	3: {
		name: 'not maga',
		seconds: 6,
		count: 12,
		description:
			'twelve questions, six seconds apiece. the real test, and the one most people fail: do you know it, or do you just feel like you do?'
	}
};

/** Levels easiest-first — the order the selector lists them. */
export const LEVEL_ORDER: (1 | 2 | 3)[] = [1, 2, 3];

/** Draw `count` unique questions of a single difficulty, in random order. */
export function pickQuestions(difficulty: 1 | 2 | 3, count: number): Question[] {
	return shuffle(QUESTIONS.filter((q) => q.difficulty === difficulty)).slice(0, count);
}

/** §6 — tier derivation. Proportional, so it holds for any run length. */
export function deriveTier(score: number, total: number): Tier {
	const pct = total > 0 ? score / total : 0;
	if (pct >= 1) return 'CITIZEN';
	if (pct >= 0.8) return 'RESIDENT';
	if (pct >= 0.4) return 'IDIŌTĒS';
	return 'IDIOT';
}

/** Fisher–Yates, returns a new array (does not mutate the input). */
export function shuffle<T>(input: readonly T[]): T[] {
	const arr = [...input];
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
}

/** Draw a distinct line from `pool` for each pointer in `used`, cycling if exhausted. */
export function distinctLines(pool: readonly string[], used: Set<string>): string {
	for (const line of pool) {
		if (!used.has(line)) return line;
	}
	// Pool exhausted (guarded against by pool sizing); fall back deterministically.
	return pool[Math.min(used.size, pool.length - 1)];
}
