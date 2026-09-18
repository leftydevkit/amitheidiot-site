<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import QuizTimer from '$lib/components/QuizTimer.svelte';
	import QuizChoice from '$lib/components/QuizChoice.svelte';
	import ProgressDots from '$lib/components/ProgressDots.svelte';
	import { NO_ANSWER_LABEL, WRONG_LINES, TIMEOUT_LINES, CORRECT_LINES } from '$lib/data';
	import type { Question, RunAnswer, RunResult } from '$lib/types';
	import { pickFiveQuestions, shuffle, deriveTier, distinctLines, QUIZ_LENGTH, TIMER_SECONDS } from '$lib/quiz';
	import { unlockStats, recordMissed, saveLastResult, clearLastResult } from '$lib/gates';

	const TIMER_MS = TIMER_SECONDS * 1000;

	interface PreparedQuestion {
		question: Question;
		/** shuffled choice labels; correctIndex maps to the shuffled position. */
		shuffled: string[];
		correctIndex: number;
	}

	let index = $state(0);
	let questions = $state<PreparedQuestion[]>([]);
	let answers = $state<RunAnswer[]>([]);

	// Feedback state for the just-answered question.
	let phase = $state<'asking' | 'feedback'>('asking');
	let feedbackLine = $state('');
	let choiceStates = $state<('idle' | 'correct' | 'wrong')[]>([]);

	// Line pools tracked to avoid repeats within a run (§2.1/2.2, AC7).
	let usedWrong = new Set<string>();
	let usedTimeout = new Set<string>();
	let questionStartedAt = $state(0);

	function prepare(q: Question): PreparedQuestion {
		const shuffled = shuffle(q.choices);
		const correctIndex = shuffled.indexOf(q.choices[q.answerIndex]);
		return { question: q, shuffled, correctIndex };
	}

	onMount(() => {
		clearLastResult(); // a new run is starting
		questions = pickFiveQuestions().map(prepare);
		questionStartedAt = performance.now();
	});

	const current = $derived(questions[index]);
	const correctSoFar = $derived(answers.filter((a) => a.correct).length);

	function recordAnswer(choiceIndex: number | null, timeMs: number) {
		if (!current) return;
		const correct = choiceIndex !== null && choiceIndex === current.correctIndex;

		let line: string;
		if (choiceIndex === null) {
			line = distinctLines(TIMEOUT_LINES, usedTimeout);
			usedTimeout.add(line);
		} else if (correct) {
			const ordinal = Math.min(correctSoFar, CORRECT_LINES.length - 1);
			line = CORRECT_LINES[ordinal];
		} else {
			line = distinctLines(WRONG_LINES, usedWrong);
			usedWrong.add(line);
		}

		answers = [...answers, {
			questionId: current.question.id,
			choiceIndex,
			correct,
			timeMs
		}];
		feedbackLine = line;

		// Reveal correct/wrong marking on the choices.
		choiceStates = current.shuffled.map((_, i) =>
			i === current.correctIndex ? 'correct' : 'wrong'
		);

		phase = 'feedback';

		if (answers.length >= QUIZ_LENGTH) {
			finish([...answers]);
		}
	}

	function finish(finalAnswers: RunAnswer[]) {
		const score = finalAnswers.filter((a) => a.correct).length;
		const result: RunResult = {
			answers: finalAnswers,
			score,
			tier: deriveTier(score),
			completedAt: Date.now()
		};

		// Gate 2 write: completion (not score) unlocks stats. Same instant records
		// misses and the session result (§5, Gate 2).
		unlockStats();
		recordMissed(
			finalAnswers
				.filter((a) => !a.correct)
				.map((a) => ({ questionId: a.questionId, choiceIndex: a.choiceIndex, missedAt: result.completedAt }))
		);
		saveLastResult(result);

		void goto('/results');
	}

	function select(choiceIndex: number) {
		if (phase === 'feedback') return;
		recordAnswer(choiceIndex, performance.now() - questionStartedAt);
	}

	function timeout() {
		if (phase === 'feedback') return;
		recordAnswer(null, TIMER_MS);
	}

	function next() {
		if (answers.length >= QUIZ_LENGTH) return;
		index += 1;
		phase = 'asking';
		feedbackLine = '';
		choiceStates = [];
		questionStartedAt = performance.now();
	}
</script>

<svelte:head>
	<title>amitheidiot — the quiz</title>
	<meta name="description" content="five questions. three seconds each." />
</svelte:head>

<main class="screen quiz">
	<div class="screen-body">
		<div class="wrap quiz-inner">
			{#if !current}
				<p class="loading">loading.</p>
			{:else}
				<ProgressDots
					current={index + 1}
					total={QUIZ_LENGTH}
					correct={correctSoFar}
					attempted={answers.length}
				/>

				<h1 class="prompt">{current.question.prompt}</h1>

				{#if phase === 'asking'}
					<QuizTimer onExpire={timeout} />
				{/if}

				<div class="choices">
					{#each current.shuffled as label, i}
						<QuizChoice
							{label}
							state={phase === 'asking' ? 'idle' : choiceStates[i]}
							disabled={phase === 'feedback'}
							onSelect={() => select(i)}
						/>
					{/each}
				</div>

				{#if phase === 'feedback'}
					<div class="feedback">
						{#if answers[answers.length - 1]?.choiceIndex === null}
							<p class="answer">{NO_ANSWER_LABEL}</p>
						{/if}
						<p class="line">{feedbackLine}</p>
						<button class="button" onclick={next}>next</button>
					</div>
				{/if}
			{/if}
		</div>
	</div>
</main>

<style>
	.quiz-inner {
		min-height: 100%;
		max-width: 720px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: max(20px, env(safe-area-inset-top)) 0 20px;
	}
	.loading { color: var(--paper); }
	.prompt {
		font: clamp(1.6rem, 6vw, 3rem)/1.1 'Anton', sans-serif;
		font-size: min(clamp(1.6rem, 6vw, 3rem), 8vh);
		text-transform: uppercase;
		margin: 10px 0 4px;
	}
	.choices { display: flex; flex-direction: column; gap: 12px; margin-top: 10px; }
	.feedback { margin-top: 18px; display: flex; flex-direction: column; gap: 12px; align-items: flex-start; }
	.feedback .answer { margin: 0; color: var(--gold); font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; }
	.feedback .line { margin: 0; font-size: 1.15rem; line-height: 1.4; }
	.feedback .button { margin-top: 2px; width: 100%; }

	@media (max-width: 620px) {
		.quiz-inner { padding-top: max(16px, env(safe-area-inset-top)); }
		.choices { gap: 10px; }
	}
</style>

