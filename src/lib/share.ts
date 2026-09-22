import type { RunAnswer, Question } from './types';

/**
 * §2.10 — share card copy. The variant is chosen from the run's real answer,
 * never fabricated. Timeout is distinct from wrong and is reported as silence.
 */

export interface ShareVariant {
	alias: string;
	prompt: string;
	lines: string[];
}

export function buildShareText(
	alias: string,
	question: Question,
	answer: RunAnswer
): ShareVariant {
	const prompt = question.prompt;
	const correctChoice = question.choices[question.answerIndex];

	// Perfect-run variant (all correct) is handled at the results level,
	// not per-answer; here we cover the two non-perfect answer shapes.
	let lines: string[];

	if (answer.choiceIndex === null) {
		// Timeout variant.
		lines = [
			`${alias} said: nothing. the clock ran out.`,
			`correct answer: "${correctChoice}"`,
			'the silence said enough.'
		];
	} else {
		const theirChoice = question.choices[answer.choiceIndex];
		lines = [
			`${alias} answered: "${theirChoice}"`,
			`correct answer: "${correctChoice}"`,
			`${alias} said that like they were sure.`
		];
	}

	return { alias, prompt, lines };
}

/** The full five-line share card, including the prompt lead. */
export function buildShareCard(alias: string, question: Question, answer: RunAnswer): string[] {
	const v = buildShareText(alias, question, answer);
	return [`${v.alias} was asked: "${v.prompt}"`, ...v.lines];
}
