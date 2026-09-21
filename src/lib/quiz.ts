import { QUESTIONS } from './data';
import type { Question, Tier } from './types';

// §9.2 — tunable numbers live here as named constants (single source of truth).
export const QUIZ_LENGTH = 5;

/**
 * Three levels, each with its own clock. Named in the app's dry, mean voice.
 * `difficulty` on a Question is the level key.
 *
 * The clock is a flat 8s at every level. (It used to tighten with difficulty —
 * 5/4/3 — which the landing copy still advertises; the ladder is a one-line
 * change back if the tightening is wanted.)
 */
export const LEVELS: Record<1 | 2 | 3, { name: string; seconds: number }> = {
	1: { name: 'the gimme', seconds: 8 },
	2: { name: 'the squeeze', seconds: 8 },
	3: { name: 'the reckoning', seconds: 8 }
};

export const DIFFICULTY_WEIGHTS: Record<1 | 2 | 3, number> = { 1: 3, 2: 3, 3: 2 };

/**
 * Draw `QUIZ_LENGTH` unique questions without replacement, weighted 3:3:2
 * across the three levels. The bank is 22×gimme / 23×squeeze / 22×reckoning,
 * so a run is broadly balanced but never the same five twice.
 */
export function pickFiveQuestions(): Question[] {
	const pool = [...QUESTIONS];
	const drawn: Question[] = [];

	while (drawn.length < QUIZ_LENGTH && pool.length > 0) {
		const totalWeight = pool.reduce((sum, q) => sum + DIFFICULTY_WEIGHTS[q.difficulty], 0);
		let r = Math.random() * totalWeight;
		let idx = 0;
		for (let i = 0; i < pool.length; i++) {
			r -= DIFFICULTY_WEIGHTS[pool[i].difficulty];
			if (r <= 0) {
				idx = i;
				break;
			}
		}
		// Safety: if floating point leaves r > 0 through the loop, take the last.
		if (r > 0) idx = pool.length - 1;

		drawn.push(pool[idx]);
		pool.splice(idx, 1);
	}

	return drawn;
}

/** §6 — tier derivation. */
export function deriveTier(score: number): Tier {
	if (score === 5) return 'CITIZEN';
	if (score === 4) return 'RESIDENT';
	if (score === 2 || score === 3) return 'IDIŌTĒS';
	return 'IDIOT'; // score 0 or 1
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
