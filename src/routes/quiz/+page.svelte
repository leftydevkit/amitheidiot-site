<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import QuizTimer from '$lib/components/QuizTimer.svelte';
	import QuizChoice from '$lib/components/QuizChoice.svelte';
	import ProgressDots from '$lib/components/ProgressDots.svelte';
	import { NO_ANSWER_LABEL, WRONG_LINES, TIMEOUT_LINES, CORRECT_LINES } from '$lib/data';
	import type { Question, RunAnswer, RunResult } from '$lib/types';
	import { pickQuestions, shuffle, deriveTier, distinctLines, LEVELS, LEVEL_ORDER } from '$lib/quiz';
	import { unlockStats, recordMissed, saveLastResult, clearLastResult } from '$lib/gates';

	interface PreparedQuestion {
		question: Question;
		/** shuffled choice labels; correctIndex maps to the shuffled position. */
		shuffled: string[];
		correctIndex: number;
	}

	let index = $state(0);
	let questions = $state<PreparedQuestion[]>([]);
	let answers = $state<RunAnswer[]>([]);
	// The difficulty gate. null = the selector is showing, nothing drawn yet.
	let selected = $state<1 | 2 | 3 | null>(null);
	let runLength = $state(0);

	// Feedback state for the just-answered question.
	let phase = $state<'asking' | 'feedback'>('asking');
	let feedbackLine = $state('');
	let choiceStates = $state<('idle' | 'correct' | 'wrong')[]>([]);

	// Line pools tracked to avoid repeats within a run (§2.1/2.2, AC7).
	let usedWrong = new Set<string>();
	let usedTimeout = new Set<string>();
	let usedCorrect = new Set<string>();
	let questionStartedAt = $state(0);

	function prepare(q: Question): PreparedQuestion {
		const shuffled = shuffle(q.choices);
		const correctIndex = shuffled.indexOf(q.choices[q.answerIndex]);
		return { question: q, shuffled, correctIndex };
	}

	onMount(() => {
		clearLastResult(); // a run begins the moment a difficulty is picked
	});

	/** Begin a run at the chosen difficulty. */
	function start(difficulty: 1 | 2 | 3) {
		const lvl = LEVELS[difficulty];
		runLength = lvl.count;
		questions = pickQuestions(difficulty, lvl.count).map(prepare);
		selected = difficulty;
		index = 0;
		answers = [];
		phase = 'asking';
		feedbackLine = '';
		choiceStates = [];
		usedWrong = new Set<string>();
		usedTimeout = new Set<string>();
		usedCorrect = new Set<string>();
		questionStartedAt = performance.now();
	}

	const current = $derived(questions[index]);
	const correctSoFar = $derived(answers.filter((a) => a.correct).length);
	const level = $derived(current ? LEVELS[current.question.difficulty] : null);

	function recordAnswer(choiceIndex: number | null, timeMs: number) {
		if (!current) return;
		const correct = choiceIndex !== null && choiceIndex === current.correctIndex;

		let line: string;
		if (choiceIndex === null) {
			line = distinctLines(TIMEOUT_LINES, usedTimeout);
			usedTimeout.add(line);
		} else if (correct) {
			// Runs are 5–12 questions now, so praise can't be ordinal-indexed.
			line = distinctLines(CORRECT_LINES, usedCorrect);
			usedCorrect.add(line);
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

		if (answers.length >= runLength) {
			finish([...answers]);
		}
	}

	function finish(finalAnswers: RunAnswer[]) {
		const score = finalAnswers.filter((a) => a.correct).length;
		const result: RunResult = {
			answers: finalAnswers,
			score,
			tier: deriveTier(score, runLength),
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
		recordAnswer(null, current ? LEVELS[current.question.difficulty].seconds * 1000 : 0);
	}

	function next() {
		if (answers.length >= runLength) return;
		index += 1;
		phase = 'asking';
		feedbackLine = '';
		choiceStates = [];
		questionStartedAt = performance.now();
	}
</script>

<svelte:head>
	<title>amitheidiot — the quiz</title>
	<meta name="description" content="three levels. harder means more questions and less time." />
</svelte:head>

<main class="screen quiz">
	<div class="screen-body">
		<div class="wrap quiz-inner">
			{#if selected === null}
				<div class="select">
					<p class="eyebrow">pick your difficulty</p>
					<h1 class="select-title">how much do you actually know?</h1>
					<div class="levels">
						{#each LEVEL_ORDER as d}
							{@const lvl = LEVELS[d]}
							<button class="level-card" class:is-hard={d === 3} onclick={() => start(d)}>
								<span class="level-card-head">
									<span class="level-card-name">{lvl.name}</span>
									<span class="level-card-meta">{lvl.count} questions · {lvl.seconds}s each</span>
								</span>
								<span class="level-card-desc">{lvl.description}</span>
							</button>
						{/each}
					</div>
				</div>
			{:else if !current}
				<p class="loading">loading.</p>
			{:else}
				<ProgressDots
					current={index + 1}
					total={runLength}
					correct={correctSoFar}
					attempted={answers.length}
				/>

				<div class="level-row" class:is-hard={current.question.difficulty === 3}>
					<span class="level-name">{level?.name}</span>
					{#if phase === 'asking'}
						<QuizTimer seconds={level?.seconds ?? 5} onExpire={timeout} />
					{/if}
				</div>

				<h1 class="prompt">{current.question.prompt}</h1>

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
	/* Difficulty selector — shown before a run starts. */
	.select { display: flex; flex-direction: column; gap: 20px; }
	.select-title {
		font: clamp(2rem, 6vw, 3.4rem)/1 'Anton', sans-serif;
		font-size: min(clamp(2rem, 6vw, 3.4rem), 9vh);
		text-transform: uppercase;
		margin: 0;
	}
	.levels { display: flex; flex-direction: column; gap: 14px; }
	.level-card {
		display: flex;
		flex-direction: column;
		gap: 8px;
		text-align: left;
		background: transparent;
		color: var(--paper);
		border: 2px solid var(--paper);
		padding: 16px 18px;
		transition: transform 140ms ease, box-shadow 140ms ease;
	}
	.level-card:hover { transform: translate(-4px, -4px); box-shadow: 5px 5px 0 var(--blue); }
	.level-card-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 12px;
		flex-wrap: wrap;
	}
	.level-card-name { font: 1.9rem/1 'Anton', sans-serif; text-transform: uppercase; }
	.level-card-meta { font-size: 0.78rem; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.72; }
	.level-card-desc { font-size: 1rem; line-height: 1.45; opacity: 0.9; }
	.level-card.is-hard { border-color: var(--blood); }
	.level-card.is-hard .level-card-name { color: var(--blood); }
	.level-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
	}
	.level-name {
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--paper);
		opacity: 0.72;
		border: 2px solid rgba(241, 236, 224, 0.3);
		padding: 4px 10px;
		white-space: nowrap;
	}
	.level-row.is-hard .level-name {
		color: var(--blood);
		border-color: var(--blood);
		opacity: 1;
	}
	.prompt {
		font: clamp(1.6rem, 6vw, 3rem)/1.1 'Anton', sans-serif;
		font-size: min(clamp(1.6rem, 6vw, 3rem), 8vh);
		text-transform: uppercase;
		margin: 12px 0 4px;
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

