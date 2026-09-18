<script lang="ts">
	import { goto } from '$app/navigation';
	import Beat from '$lib/components/Beat.svelte';
	import { LESSON_BEATS, SKIP_LINE, SKIP_COPY } from '$lib/data';
	import { markLessonSeen } from '$lib/gates';

	let index = $state(0);
	let skipped = $state(false);
	const lastIndex = LESSON_BEATS.length - 1;

	function advance() {
		if (index < lastIndex) {
			index += 1;
			return;
		}
		finish();
	}

	function finish() {
		markLessonSeen();
		void goto('/quiz');
	}

	function skip() {
		if (skipped) {
			// A second tap on the already-revealed skip line is just the finish affordance.
			finish();
			return;
		}
		skipped = true;
		markLessonSeen();
	}
</script>

<svelte:head>
	<title>amitheidiot — the word</title>
	<meta name="description" content="the word had a different meaning once." />
</svelte:head>

<main class="shell origin">
	<header class="origin-head">
		<a class="wordmark" href="/">am<span class="accent">i</span>the<span class="blood">idiot</span></a>
		<button class="quiet-link skip" onclick={skip}>{SKIP_LINE}</button>
	</header>

	{#if skipped}
		<article class="skip-copy">
			<p>{SKIP_COPY}</p>
			<button class="button" onclick={finish}>take the quiz</button>
		</article>
	{:else}
		<div class="stage">
			{#key index}
				<Beat beat={LESSON_BEATS[index]} isLast={index === lastIndex} onAdvance={advance} />
			{/key}
		</div>
		<div class="progress" aria-hidden="true">
			{#each LESSON_BEATS as _, i}
				<span class:dot-active={i <= index}></span>
			{/each}
		</div>
	{/if}
</main>

<style>
	.origin { min-height: 100svh; display: flex; flex-direction: column; }
	.origin-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding-top: 26px;
	}
	.skip {
		background: none;
		border: 0;
		text-decoration: underline;
		text-underline-offset: 5px;
		font: inherit;
	}
	.stage {
		flex: 1;
		display: flex;
		align-items: center;
		padding: 40px 0;
	}
	.progress {
		display: flex;
		gap: 8px;
		padding-bottom: 40px;
	}
	.progress span {
		width: 18px;
		height: 4px;
		background: var(--paper);
		opacity: 0.25;
		transition: opacity 200ms ease;
	}
	.progress .dot-active { opacity: 0.9; }
	.skip-copy { flex: 1; display: flex; flex-direction: column; justify-content: center; max-width: 640px; margin: 0 auto; gap: 24px; }
	.skip-copy p { font-size: clamp(1.4rem, 4vw, 2.2rem); line-height: 1.4; }
	.skip-copy .button { align-self: flex-start; }
</style>
