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
	<link rel="preload" as="image" href="/images/origin/beat-1-900.webp" fetchpriority="high" />
</svelte:head>

<main class="screen origin">
	<!-- Full-bleed background + scrim. All 7 rendered (tiny, ~200KB total) and
	     crossfaded so there is never a pop-in; the active beat's layer is opaque. -->
	{#each BEAT_IMAGE_IDS as imgId, i}
		<div class="bg" class:bg-active={i === index && !skipped} aria-hidden="true">
			<picture>
				<source
					srcset="/images/origin/{imgId}-600.webp 600w,
							/images/origin/{imgId}-900.webp 900w,
							/images/origin/{imgId}-1366.webp 1366w"
					sizes="100vw"
					type="image/webp"
				/>
				<img src="/images/origin/{imgId}-900.webp" alt="" loading={i <= index + 1 || i === 0 ? 'eager' : 'lazy'} />
			</picture>
		</div>
	{/each}
	<div class="scrim" aria-hidden="true"></div>

	<div class="wrap origin-inner">
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
	</div>
</main>

<style>
	.origin {
		position: relative;
	}
	.origin-inner {
		position: relative;
		z-index: 2;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.bg {
		position: fixed;
		inset: 0;
		z-index: 0;
		opacity: 0;
		transition: opacity 320ms ease;
	}
	.bg.bg-active { opacity: 1; }
	.bg img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		/* Faintness lives here, not baked into the file — the WebP keeps full
		   detail and stays crisp. */
		opacity: 0.45;
	}
	/* Contrast scrim between image and text (§5). */
	.scrim {
		position: fixed;
		inset: 0;
		z-index: 1;
		pointer-events: none;
		background: linear-gradient(
			to bottom,
			rgba(22, 19, 14, 0.72),
			rgba(22, 19, 14, 0.5) 42%,
			rgba(22, 19, 14, 0.85)
		);
	}
	.origin-head {
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
		flex: 1;
		display: flex;
		align-items: flex-start;
		padding: 4vh 0 40px;
	}
	.progress {
		display: flex;
		gap: 8px;
		padding-bottom: max(24px, env(safe-area-inset-bottom));
	}
	.progress span {
		width: 18px;
		height: 4px;
		background: var(--paper);
		opacity: 0.25;
		transition: opacity 200ms ease;
	}
	.progress .dot-active { opacity: 0.9; }
	.skip-copy {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		max-width: 640px;
		margin: 0 auto;
		gap: 24px;
	}
	.skip-copy p { font-size: clamp(1.4rem, 4vw, 2.2rem); line-height: 1.4; }
	.skip-copy .button { align-self: flex-start; }
</style>
