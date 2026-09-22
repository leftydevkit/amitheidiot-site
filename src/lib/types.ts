export interface Question {
	id: string;
	prompt: string;
	choices: [string, string, string, string];
	/** Index into the unshuffled `choices` above (correct choice always written first). */
	answerIndex: 0 | 1 | 2 | 3;
	sourceUrl: string;
	category: 'civics-structure' | 'civics-rights' | 'history' | 'symbols-geography' | 'current';
	difficulty: 1 | 2 | 3;
}

export interface Stat {
	id: string;
	section: 'civics' | 'literacy' | 'science' | 'education' | 'media' | 'overall';
	figure: string; // pre-formatted display value, e.g. "35%"
	claim: string; // plain-language one-liner
	dryLine: string; // the editorial line beneath the number
	sourceOutlet: string;
	sourceYear: number;
	sourceUrl: string;
}

export interface RunAnswer {
	questionId: string;
	/** null = timeout, displayed as "no answer". */
	choiceIndex: number | null;
	correct: boolean;
	timeMs: number; // captured, not surfaced in v1 UI
}

export interface RunResult {
	answers: RunAnswer[]; // one per question asked, in the order asked
	score: number; // 0 .. answers.length
	tier: Tier; // derived, never stored redundantly elsewhere
	completedAt: number; // epoch ms
}

export type Tier = 'CITIZEN' | 'RESIDENT' | 'IDIŌTĒS' | 'IDIOT';

/** A missed question, persisted for /learn. */
export interface MissedQuestion {
	questionId: string;
	choiceIndex: number | null;
	missedAt: number;
}
