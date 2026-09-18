import type { MissedQuestion, RunResult } from './types';

// localStorage key contracts (§6).
const LESSON_KEY = 'amitheidiot.lessonSeen';
const STATS_KEY = 'amitheidiot.statsUnlocked';
const MISSED_KEY = 'amitheidiot.missedQuestions';

// sessionStorage key contract (§6).
const LAST_RESULT_KEY = 'amitheidiot.lastResult';

const local = () => (typeof localStorage === 'undefined' ? null : localStorage);
const session = () => (typeof sessionStorage === 'undefined' ? null : sessionStorage);

// --- Gate 1: the lesson ---------------------------------------------------

export function hasSeenLesson(): boolean {
	return local()?.getItem(LESSON_KEY) === '1';
}

export function markLessonSeen(): void {
	local()?.setItem(LESSON_KEY, '1');
}

// --- Gate 2: the stats ------------------------------------------------------

export function isStatsUnlocked(): boolean {
	return local()?.getItem(STATS_KEY) === '1';
}

export function unlockStats(): void {
	local()?.setItem(STATS_KEY, '1');
}

// --- Missed-questions queue (/learn) ---------------------------------------

export function getMissedQuestions(): MissedQuestion[] {
	try {
		const raw = local()?.getItem(MISSED_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? (parsed as MissedQuestion[]) : [];
	} catch {
		return [];
	}
}

/** Accumulate misses, deduped by questionId keeping the most recent miss. */
export function recordMissed(missed: MissedQuestion[]): void {
	const storage = local();
	if (!storage) return;

	let existing: MissedQuestion[] = [];
	try {
		const raw = storage.getItem(MISSED_KEY);
		if (raw) existing = JSON.parse(raw);
	} catch {
		existing = [];
	}

	const map = new Map<string, MissedQuestion>();
	for (const m of existing) map.set(m.questionId, m);
	for (const m of missed) map.set(m.questionId, m);

	storage.setItem(MISSED_KEY, JSON.stringify([...map.values()]));
}

// --- Last result (sessionStorage, UX convenience only) ----------------------

export function saveLastResult(result: RunResult): void {
	session()?.setItem(LAST_RESULT_KEY, JSON.stringify(result));
}

export function loadLastResult(): RunResult | null {
	try {
		const raw = session()?.getItem(LAST_RESULT_KEY);
		return raw ? (JSON.parse(raw) as RunResult) : null;
	} catch {
		return null;
	}
}

/** Called on /quiz mount — a new run is starting, drop the old result. */
export function clearLastResult(): void {
	session()?.removeItem(LAST_RESULT_KEY);
}
