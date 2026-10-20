<script lang="ts">
	import { onMount } from 'svelte';
	import { hasSeenLesson } from '$lib/gates';
	import { LANDING_TEASER, REENTRY_LINK } from '$lib/data';

	let seen = $state(false);

	// The hero clip plays at half speed for the joke's slow delivery. Set it again
	// on loadedmetadata too, because autoplay can start late.
	let videoEl = $state<HTMLVideoElement>();
	function slowVideo() {
		if (videoEl) videoEl.playbackRate = 0.5;
	}
	$effect(() => {
		if (videoEl) videoEl.playbackRate = 0.5;
	});

	onMount(() => {
		seen = hasSeenLesson();
	});

	// Auto-fit the hero: shrink the type until the whole page fits the viewport,
	// so nothing is clipped on a short window. --hero-scale drives the sizes.
	let pageEl = $state<HTMLElement>();
	let mainEl = $state<HTMLElement>();

	/**
	 * Two failure modes, because the layout differs by width:
	 *  - narrow: .landing-main fills the centred region, so its own content
	 *    overflows it and scrollHeight grows;
	 *  - wide: it is content-height and centred, so it overflows its *parent*
	 *    instead, and on a short window the centred block rides up under the
	 *    header and collides with the wordmark. That never shows up as
	 *    scrollHeight, so the header line is checked directly too.
	 */
	function overflowed(el: HTMLElement): boolean {
		if (el.scrollHeight > el.clientHeight + 1) return true;
		const bar = pageEl?.querySelector('.app-bar');
		if (!bar) return false;
		return el.getBoundingClientRect().top < bar.getBoundingClientRect().bottom - 0.5;
	}

	function fitHero() {
		const el = mainEl ?? pageEl;
		if (!el) return;
		// Set the knob on the .screen, not .landing-main, so the footer inherits it
		// too: on a short window the footer's big numeral is the least important
		// thing on the page, so it should yield before the hero type gets tiny.
		const target = pageEl ?? el;
		let scale = 1;
		target.style.setProperty('--hero-scale', '1');
		while (scale > 0.45 && overflowed(el)) {
			scale = Math.round((scale - 0.03) * 100) / 100;
			target.style.setProperty('--hero-scale', String(scale));
		}
	}

	$effect(() => {
		void seen;
		fitHero();
		const onResize = () => fitHero();
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	});
</script>

<svelte:head>
	<title>amitheidiot — civic knowledge, briefly</title>
	<meta name="description" content="three levels. harder means more questions and less time." />
	<meta property="og:title" content="amitheidiot" />
	<meta property="og:description" content="three levels. harder means more questions and less time." />
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
				<video
					bind:this={videoEl}
					src="/video/stupid-thinker.mp4"
					poster="/images/home/stupid-thinker-900.webp"
					autoplay
					muted
					loop
					playsinline
					preload="metadata"
					onloadedmetadata={slowVideo}
				></video>
			</figure>
		</div>
	</div>

	<footer class="landing-tease wrap">
		<span><b>35%</b> {LANDING_TEASER}</span>
		<a class="quiet-link board-link" href="/board">the board ↗</a>
	</footer>
</main>

<style>
	/* The figure is the anchor of the hero, so it appears at every width. Narrow
	   screens have no dead space beside the copy, so it sits in the flow, centered
	   under the copy block. It is scaled by --hero-scale — same knob as the type —
	   so fitHero() can shrink it along with everything else instead of letting it
	   push the page past the viewport. The poster is generated from the clip's
	   first frame (scripts/process-home-figure.sh), so the hand-off shares
	   orientation, aspect and framing — no flip, no resize mid-load. */
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
		width: calc(min(92vw, 600px) * var(--hero-scale, 1));
		margin: auto auto 0;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		pointer-events: none;
	}
	.hero-figure video {
		display: block;
		width: 100%;
		height: auto;
		max-height: 46vh;
		object-fit: contain;
		mix-blend-mode: screen; /* the clip's black ground drops into the ink */
		filter: contrast(1.6) brightness(1.08); /* crush the near-black so the box disappears */
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
		.hero-figure video { max-height: 66vh; }
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
		gap: calc(16px * var(--hero-scale, 1));
		align-items: baseline;
		border-top: 2px solid var(--paper);
		padding: calc(14px * var(--hero-scale, 1)) 0 max(18px, env(safe-area-inset-bottom));
		font-size: calc(0.85rem * var(--hero-scale, 1));
		line-height: 1.35;
	}
	.landing-tease b {
		color: var(--gold);
		font: calc(clamp(1.9rem, 4.2vw, 2.8rem) * var(--hero-scale, 1))/0.8 'Anton', sans-serif;
	}
	.landing-tease > span { grid-column: 1 / -1; }
	.landing-tease .board-link { grid-column: 1 / -1; justify-self: start; font-size: calc(0.85rem * var(--hero-scale, 1)); }

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
		.landing-tease { padding: 4px 0 max(6px, env(safe-area-inset-bottom)); gap: calc(8px * var(--hero-scale, 1)); }
		.landing-tease b { font: calc(clamp(1.6rem, 3.5vw, 2.4rem) * var(--hero-scale, 1))/0.8 'Anton', sans-serif; }
	}
</style>
