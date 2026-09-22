<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { hasSeenLesson } from '$lib/gates';
	import { LANDING_TEASER, REENTRY_LINK, HERO_THOUGHTS } from '$lib/data';

	let seen = $state(false);
	// The whole comment is laid out at once and each word fades in with a staggered
	// delay (CSS below), so the bubble never reflows. This timer just advances to
	// the next comment once the current one has fully revealed and been held.
	let thoughtIndex = $state(0);
	let thoughtTimer: ReturnType<typeof setTimeout> | undefined;

	const WORD_STAGGER = 300; // keep in sync with the .word animation-delay
	const WORD_FADE = 400;
	const HOLD = 2000;

	function scheduleNext() {
		const words = HERO_THOUGHTS[thoughtIndex].split(' ');
		const revealMs = (words.length - 1) * WORD_STAGGER + WORD_FADE;
		thoughtTimer = setTimeout(() => {
			thoughtIndex = (thoughtIndex + 1) % HERO_THOUGHTS.length;
			scheduleNext();
		}, revealMs + HOLD);
	}

	onMount(() => {
		seen = hasSeenLesson();
		scheduleNext();
	});

	onDestroy(() => {
		if (thoughtTimer) clearTimeout(thoughtTimer);
	});

	// Auto-fit the hero: shrink the type until the whole page fits the viewport,
	// so nothing is clipped on a short window. --hero-scale drives the sizes.
	let pageEl = $state<HTMLElement>();
	let mainEl = $state<HTMLElement>();

	function fitHero() {
		// The hero overflows inside .landing-main (the figure hangs below it), not
		// on <main>, so measure the inner block — otherwise nothing shrinks and the
		// figure (and its anthill) clips on short phones.
		const el = mainEl ?? pageEl;
		if (!el) return;
		let scale = 1;
		el.style.setProperty('--hero-scale', '1');
		while (scale > 0.55 && el.scrollHeight > el.clientHeight + 1) {
			scale = Math.round((scale - 0.03) * 100) / 100;
			el.style.setProperty('--hero-scale', String(scale));
		}
	}

	$effect(() => {
		void seen;
		fitHero();
	});
</script>

<svelte:head>
	<title>amitheidiot — civic knowledge, briefly</title>
	<meta name="description" content="five questions. three levels. the clock tightens as it gets harder." />
	<meta property="og:title" content="amitheidiot" />
	<meta property="og:description" content="five questions. three levels. the clock tightens as it gets harder." />
</svelte:head>

<main class="screen landing" bind:this={pageEl}>
	<header class="app-bar wrap">
		<a class="wordmark" href="/">am<span class="accent">i</span>the<span class="blood">idiot</span></a>
	</header>

	<div class="screen-center">
		<div class="wrap landing-main" bind:this={mainEl}>
			<p class="eyebrow">the word used to mean something else</p>
			<h1 class="page-title">are you smarter<br />than an <span class="blood">idiot</span></h1>
			<p class="lede">not the person who does not know. the person who is proud of it.</p>
			<div class="actions">
				<a class="button" href={seen ? '/quiz' : '/origin'}>{seen ? 'take the quiz' : 'begin'}</a>
				<a class="quiet-link" href="/origin">{REENTRY_LINK}</a>
			</div>

			<figure class="hero-figure" aria-hidden="true">
				<img
					src="/images/home/stupid-thinker-900.webp"
					srcset="/images/home/stupid-thinker-600.webp 600w, /images/home/stupid-thinker-900.webp 900w, /images/home/stupid-thinker-1366.webp 1366w"
					sizes="(min-width: 1024px) min(36vw, 520px), min(92vw, 600px)"
					width="900"
					height="535"
					alt=""
				/>
				{#key thoughtIndex}
					<figcaption class="thought">
						{#each HERO_THOUGHTS[thoughtIndex].split(' ') as word, i (i)}
							<span class="word" style:--i="{i}">{word}</span>
						{/each}
					</figcaption>
				{/key}
			</figure>
		</div>
	</div>

	<footer class="landing-tease wrap">
		<span><b>35%</b> {LANDING_TEASER}</span>
	</footer>
</main>

<style>
	/* The figure is the anchor of the hero, so it appears at every width. Narrow
	   screens have no dead space beside the copy, so it sits in the flow, centered
	   under the copy block. It is scaled by --hero-scale — same knob as the type —
	   so fitHero() can shrink it along with everything else instead of letting it
	   push the page past the viewport. Mirrored and knocked out of its ground by
	   scripts/process-home-figure.sh. */
	.landing-main {
		position: relative;
		display: flex;
		flex-direction: column;
		flex: 1 1 auto;
		min-height: 0;
		padding: calc(16px * var(--hero-scale, 1)) 0 0;
	}
	.hero-figure {
		position: relative;
		container-type: inline-size;
		width: calc(min(92vw, 600px) * var(--hero-scale, 1));
		margin: auto auto 0;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		pointer-events: none;
	}
	/* Thought-bubble text, laid over the bubble baked into the v2 art. The bubble
	   interior sits at L1.5% T1.1% W34.9% H30.3% of the image (measured from the
	   processed knockout), and the type is in container units so it tracks the
	   figure at every width. Content comes from HERO_THOUGHT. */
	.thought {
		position: absolute;
		left: 0.9%;
		top: 1.6%;
		width: 49.6%;
		height: 58.1%;
		display: flex;
		flex-wrap: wrap;
		align-content: center;
		align-items: center;
		justify-content: center;
		gap: 0.35em;
		overflow: hidden;
		font-size: clamp(13px, 4.4cqw, 30px);
		line-height: 1.15;
		letter-spacing: 0.04em;
		color: var(--paper);
	}
	/* All words are present from the start (so the layout is stable) and each
	   fades in after the previous one — no movement, just opacity. The stagger
	   must match WORD_STAGGER in the script. */
	.word {
		animation: word-fade 400ms ease both;
		animation-delay: calc(var(--i) * 300ms);
	}
	@keyframes word-fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	.hero-figure img {
		display: block;
		width: 100%;
		height: auto;
		max-height: 46vh;
		object-fit: contain;
	}

	/* Wide screens: the wrap is capped at 1120px and the copy only fills its left
	   half, leaving real dead space on the right. Float him into it as a second
	   column. Out of flow on purpose: a flex child here would stretch .actions to
	   full width (align-self:stretch is the default), shoving the button's right
	   border out to the wrap edge. bottom:0 is the column's content-box bottom,
	   flush with the button's border until .landing-main's padding pushes it past. */
	@media (min-width: 1024px) {
		.landing-main { display: block; flex: 0 0 auto; height: auto; padding: calc(16px * var(--hero-scale, 1)) 0; }
		.hero-figure {
			position: absolute;
			bottom: calc(16px * var(--hero-scale, 1));
			right: 0;
			width: min(36vw, 520px);
			margin: 0;
			display: block;
		}
		.hero-figure img { max-height: 66vh; }
	}

	/* line-height < 1 makes Anton's caps overflow the line box and collide with
	   the eyebrow; the top margin buys that space back. */
	.landing .page-title {
		font-size: calc(min(clamp(3rem, 12vw, 8rem), 19vh) * var(--hero-scale, 1));
		line-height: 0.86;
		margin: calc(0.16em + 6px) 0 calc(0.1em * var(--hero-scale, 1));
	}
	.landing .lede {
		max-width: 34ch;
		font-size: calc(clamp(1.05rem, 2.5vw, 1.55rem) * var(--hero-scale, 1));
	}
	.actions {
		display: flex;
		align-items: center;
		gap: 20px;
		flex-wrap: wrap;
		margin-top: calc(26px * var(--hero-scale, 1));
	}
	.actions .button { flex: 0 1 auto; }
	/* The re-entry link is a real invitation — bigger and fuller than a footer note. */
	.actions .quiet-link {
		font-size: calc(1.25rem * var(--hero-scale, 1));
		font-weight: 500;
		opacity: 0.92;
		text-decoration-thickness: 2px;
		text-underline-offset: 6px;
	}

	.landing-tease {
		flex: 0 0 auto;
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 16px;
		align-items: baseline;
		border-top: 2px solid var(--paper);
		padding: 14px 0 max(18px, env(safe-area-inset-bottom));
		font-size: 0.85rem;
		line-height: 1.35;
	}
	.landing-tease b {
		color: var(--gold);
		font: clamp(1.9rem, 4.2vw, 2.8rem)/0.8 'Anton', sans-serif;
	}

	@media (max-width: 620px) {
		/* Slimmer chrome on phones so the hero figure (and its anthill) fits
		   without clipping: smaller wordmark, tighter header, minimal footer
		   padding. */
		.app-bar { padding-top: max(10px, env(safe-area-inset-top)); }
		.wordmark { font-size: clamp(2.2rem, 8vw, 2.8rem); }
		.landing .page-title { font-size: calc(min(clamp(2.5rem, 10vw, 8rem), 18vh) * var(--hero-scale, 1)); }
		.lede { font-size: calc(1.05rem * var(--hero-scale, 1)); }
		.actions { gap: 18px; margin-top: calc(22px * var(--hero-scale, 1)); }
		.actions .button { flex: 1 1 100%; }
		.actions .quiet-link { font-size: calc(1.15rem * var(--hero-scale, 1)); }
		.landing-tease { padding: 4px 0 max(6px, env(safe-area-inset-bottom)); gap: 8px; }
		.landing-tease b { font: clamp(1.6rem, 3.5vw, 2.4rem)/0.8 'Anton', sans-serif; }
	}
</style>
