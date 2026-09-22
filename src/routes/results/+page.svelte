<script lang="ts">
	import { onMount } from 'svelte';
	import { loadLastResult } from '$lib/gates';
	import { TIER_DETAILS, PEP_TALK, NO_ANSWER_LABEL, QUESTIONS } from '$lib/data';
	import ShareCard from '$lib/components/ShareCard.svelte';
	import type { RunResult } from '$lib/types';

	let result = $state<RunResult | null>(null);
	onMount(() => {
		result = loadLastResult();
	});

	const tier = $derived(result ? TIER_DETAILS[result.tier] : null);
	const score = $derived(result?.score ?? 0);

	// Join answer -> question for the reveal. RunResult stores questionId +
	// choiceIndex only; the full text lives in the question bank.
	function questionFor(id: string) {
		return QUESTIONS.find((q) => q.id === id);
	}

	function reveal(questionId: string, choiceIndex: number | null): { prompt: string; theirs: string; correct: string } {
		const q = questionFor(questionId)!;
		const correct = q.choices[q.answerIndex];
		const theirs = choiceIndex === null ? NO_ANSWER_LABEL : q.choices[choiceIndex];
		return { prompt: q.prompt, theirs, correct };
	}
</script>

<svelte:head>
	<title>amitheidiot — your score</title>
	<meta name="description" content="the word had a different meaning once." />
</svelte:head>

<main class="screen results">
	<div class="screen-body">
		<div class="wrap results-inner">
			{#if !result}
				<section class="empty">
					<p class="empty-copy">there's no score to show you. you haven't played yet.</p>
					<a class="button" href="/quiz">take the quiz</a>
				</section>
			{:else}
				<section class="score-hero">
					<p class="eyebrow">your score</p>
					<h1 class="tier">{tier?.label ?? 'IDIOT'}</h1>
					<p class="score-line">{score} / {result.answers.length}</p>
					<p class="tier-desc">{tier?.description}</p>
				</section>

				<section class="pep-talk">
					{#each PEP_TALK as p}
						<p>{p}</p>
					{/each}
				</section>

				<section class="reveal">
					<h2 class="reveal-title">the answers</h2>
					{#each result.answers as a}
						{@const r = reveal(a.questionId, a.choiceIndex)}
						<div class="reveal-item" class:is-correct={a.correct}>
							<p class="reveal-q">{r.prompt}</p>
							<p class="reveal-theirs">you said: {r.theirs}</p>
							{#if !a.correct}
								<p class="reveal-correct">correct: {r.correct}</p>
							{/if}
						</div>
					{/each}
				</section>

				<section class="actions">
					<a class="button gold" href="/stats">see the numbers</a>
					<a class="button secondary" href="/learn">review what you missed</a>
					<a class="button secondary" href="/quiz">play again</a>
				</section>

				<ShareCard {result} />
			{/if}
		</div>
	</div>
</main>

<style>
	.results-inner { max-width: 720px; padding-top: max(24px, env(safe-area-inset-top)); }
	.empty { min-height: 70%; display: flex; flex-direction: column; justify-content: center; gap: 18px; align-items: flex-start; }
	.empty-copy { font-size: clamp(1.25rem, 3vw, 1.8rem); line-height: 1.4; max-width: 560px; }
	.score-hero { margin-top: 12px; }
	.tier {
		font: clamp(3.2rem, 16vw, 9rem)/0.85 'Anton', sans-serif;
		font-size: min(clamp(3.2rem, 16vw, 9rem), 17vh);
		margin: 10px 0 6px;
		text-transform: uppercase;
		color: var(--gold);
	}
	.score-line { font-size: 1.5rem; font-weight: 700; }
	.tier-desc { max-width: 560px; font-size: 1.15rem; line-height: 1.5; margin-bottom: 34px; }
	.pep-talk { border-top: 2px solid var(--paper); padding-top: 24px; display: flex; flex-direction: column; gap: 18px; }
	.pep-talk p { margin: 0; line-height: 1.6; font-size: 1.02rem; max-width: 640px; }
	.reveal { margin-top: 36px; border-top: 2px solid var(--paper); padding-top: 24px; }
	.reveal-title { font: 2rem/1 'Anton', sans-serif; text-transform: uppercase; margin: 0 0 18px; }
	.reveal-item { border: 2px solid var(--paper); padding: 16px 18px; margin-bottom: 12px; }
	.reveal-item.is-correct { border-color: var(--blue); }
	.reveal-q { margin: 0 0 8px; font-weight: 700; font-size: 1.08rem; }
	.reveal-theirs { margin: 0; opacity: 0.82; }
	.reveal-correct { margin: 6px 0 0; color: var(--blue); font-weight: 700; }
	.actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 32px; }

	@media (max-width: 620px) {
		.actions .button { flex: 1 1 100%; }
	}
</style>
