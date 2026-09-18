<script lang="ts">
	import { goto } from '$app/navigation';
	import Beat from '$lib/components/Beat.svelte';
	import { LESSON_BEATS, BEAT_IMAGE_IDS, SKIP_LINE, SKIP_COPY } from '$lib/data';
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

	// Auto-fit: shrink the copy until it fits the space above the art band, so a
	// long beat never scrolls. em-based spacing scales with the font size.
	let stageEl = $state<HTMLElement>();

	function fit() {
		if (!stageEl) return;
		let scale = 1;
		stageEl.style.setProperty('--beat-scale', '1');
		while (scale > 0.5 && stageEl.scrollHeight > stageEl.clientHeight + 1) {
			scale = Math.round((scale - 0.03) * 100) / 100;
			stageEl.style.setProperty('--beat-scale', String(scale));
		}
	}

	// Runs after the DOM updates for each new beat.
	$effect(() => {
		void index;
		void skipped;
		fit();
	});
</script>

<svelte:head>
	<title>amitheidiot — the word</title>
	<meta name="description" content="the word had a different meaning once." />
	<meta property="og:title" content="amitheidiot — the word" />
	<meta property="og:description" content="the word had a different meaning once." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://amitheidiot.com/origin" />
	<meta property="og:image" content="https://amitheidiot.com/images/origin/og-origin.jpg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content="https://amitheidiot.com/images/origin/og-origin.jpg" />
	<!-- Beat 1 is render-blocking-preloaded (§7). -->
	<link
		rel="preload"
		as="image"
		imagesrcset="/images/origin/beat-1-600.webp 600w, /images/origin/beat-1-900.webp 900w, /images/origin/beat-1-1366.webp 1366w, /images/origin/beat-1-2048.webp 2048w"
		imagesizes="(max-width: 700px) 92vw, 900px"
		fetchpriority="high"
	/>
</svelte:head>

<main class="screen origin">
	<div class="wrap origin-inner">
		<header class="origin-head">
			<a class="wordmark" href="/">am<span class="accent">i</span>the<span class="blood">idiot</span></a>
			<button class="quiet-link skip" onclick={skip}>{SKIP_LINE}</button>
		</header>

		{#if skipped}
			<div class="stage stage-center">
				<article class="skip-copy">
					<p>{SKIP_COPY}</p>
				</article>
			</div>
			<footer class="origin-foot foot-end">
				<button class="button" onclick={finish}>take the quiz</button>
			</footer>
		{:else}
			<!-- Copy. Auto-shrunk to fit by the fit() effect above — never scrolls. -->
			<div class="stage" bind:this={stageEl}>
				{#key index}
					<Beat beat={LESSON_BEATS[index]} />
				{/key}
			</div>

			<!-- Art band. Sits below the copy and above the controls, so it can
			     never collide with the text however long the copy runs. -->
			<div class="art" aria-hidden="true">
				{#each BEAT_IMAGE_IDS as imgId, i}
					<picture class="art-frame" class:art-active={i === index}>
						<source
							srcset="/images/origin/{imgId}-600.webp 600w,
									/images/origin/{imgId}-900.webp 900w,
									/images/origin/{imgId}-1366.webp 1366w,
									/images/origin/{imgId}-2048.webp 2048w"
							sizes="(max-width: 700px) 92vw, 900px"
							type="image/webp"
						/>
						<img src="/images/origin/{imgId}-900.webp" alt="" loading={i <= index + 1 ? 'eager' : 'lazy'} />
					</picture>
				{/each}
			</div>

			<!-- Pinned footer: the advance control is always on screen. -->
			<footer class="origin-foot">
				<div class="progress" aria-hidden="true">
					{#each LESSON_BEATS as _, i}
						<span class:dot-active={i <= index}></span>
					{/each}
				</div>
				{#if index === lastIndex}
					<button class="button gold" onclick={advance}>start</button>
				{:else}
					<button class="hint" onclick={advance}>tap to continue</button>
				{/if}
			</footer>
		{/if}
	</div>
</main>

<style>
	.origin { background: #000; }
	.origin-inner {
		position: relative;
		z-index: 2;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.origin-head {
		flex: 0 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding-top: max(20px, env(safe-area-inset-top));
	}
	.skip {
		background: none;
		border: 0;
		text-decoration: underline;
		text-underline-offset: 5px;
		font: inherit;
	}
	.stage {
		flex: 1 1 auto;
		min-height: 0;
		overflow: hidden;
		display: flex;
		align-items: flex-start;
		padding: 3vh 0 10px;
	}
	.stage-center { align-items: center; justify-content: center; }

	/* Art band — fixed height, bottom-aligned art, crossfaded between beats.
	   The art is wide; it may bleed past the viewport edges, which is invisible
	   because its ground is the same black as the page. */
	.art {
		flex: 0 0 auto;
		position: relative;
		height: clamp(140px, 30vh, 300px);
		overflow: hidden;
	}
	.art-frame {
		position: absolute;
		inset: 0;
		opacity: 0;
		transition: opacity 320ms ease;
	}
	.art-frame.art-active { opacity: 1; }
	/* Translated centre, not text-align: an inline-block wider than its
	   container is laid out flush-left and overflows right, so on a phone you'd
	   see the image's empty left margin instead of the subject. */
	.art-frame img {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		height: 100%;
		width: auto;
	}

	.origin-foot {
		flex: 0 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 10px 0 max(20px, env(safe-area-inset-bottom));
	}
	.foot-end { justify-content: flex-start; }
	.progress { display: flex; gap: 8px; }
	.progress span {
		width: 18px;
		height: 4px;
		background: var(--paper);
		opacity: 0.25;
		transition: opacity 200ms ease;
	}
	.progress .dot-active { opacity: 0.9; }
	.hint {
		display: inline-block;
		background: none;
		border: 0;
		color: var(--gold);
		font: inherit;
		font-size: 0.8rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		opacity: 0.85;
		text-decoration: underline;
		text-underline-offset: 4px;
		min-height: 44px;
		padding: 0 4px;
	}
	.skip-copy { max-width: 640px; }
	.skip-copy p { font-size: clamp(1.4rem, 4vw, 2.2rem); line-height: 1.4; }
</style>
