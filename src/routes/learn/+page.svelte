<script lang="ts">
	import { onMount } from 'svelte';
	import { NO_ANSWER_LABEL, QUESTIONS } from '$lib/data';
	import { getMissedQuestions } from '$lib/gates';

	let missed = $state<{ prompt: string; theirs: string; correct: string; sourceUrl: string }[]>([]);

	onMount(() => {
		const misses = getMissedQuestions();
		missed = misses
			.map((m) => {
				const q = QUESTIONS.find((x) => x.id === m.questionId);
				if (!q) return null;
				return {
					prompt: q.prompt,
					theirs: m.choiceIndex === null ? NO_ANSWER_LABEL : q.choices[m.choiceIndex],
					correct: q.choices[q.answerIndex],
					sourceUrl: q.sourceUrl
				};
			})
			.filter((x): x is NonNullable<typeof x> => x !== null);
	});
</script>

<svelte:head>
	<title>amitheidiot — what you missed</title>
	<meta name="description" content="the questions you missed, re-taught." />
</svelte:head>

<main class="shell learn">
	<a class="wordmark" href="/">am<span class="accent">i</span>the<span class="blood">idiot</span></a>
	<p class="eyebrow">learn</p>
	<h1 class="page-title">what you missed</h1>

	{#if missed.length === 0}
		<section class="empty">
			<p class="empty-copy">you missed nothing. we don't have material for you. go brag on the results page.</p>
			<a class="button" href="/results">back to results</a>
		</section>
	{:else}
		<p class="ack">you missed {missed.length}. nobody hands you this at birth. here it is, slowly.</p>
		{#each missed as m}
			<article class="miss-card">
				<h2 class="miss-q">{m.prompt}</h2>
				<p class="miss-theirs">you said: {m.theirs}</p>
				<p class="miss-correct">correct: {m.correct}</p>
				<a class="miss-source" href={m.sourceUrl} target="_blank" rel="noopener noreferrer">source ↗</a>
			</article>
		{/each}
		<div class="actions">
			<a class="button gold" href="/quiz">try again</a>
			<a class="button secondary" href="/results">back to results</a>
		</div>
	{/if}
</main>

<style>
	.learn { max-width: 720px; }
	.ack { font-size: 1.1rem; line-height: 1.5; max-width: 560px; margin: 18px 0 28px; }
	.miss-card { border: 2px solid var(--paper); padding: 18px 20px; margin-bottom: 14px; }
	.miss-q { margin: 0 0 10px; font: 1.4rem/1.2 'Anton', sans-serif; text-transform: uppercase; }
	.miss-theirs { margin: 0; opacity: 0.82; }
	.miss-correct { margin: 6px 0 10px; color: var(--blue); font-weight: 700; }
	.miss-source { font-size: 0.78rem; color: var(--gold); text-underline-offset: 3px; }
	.empty { min-height: 50svh; display: flex; flex-direction: column; justify-content: center; gap: 18px; align-items: flex-start; }
	.empty-copy { font-size: clamp(1.3rem, 3vw, 1.8rem); line-height: 1.4; max-width: 560px; }
	.actions { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 24px; }
</style>
