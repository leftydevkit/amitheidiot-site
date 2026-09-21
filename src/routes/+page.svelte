<script lang="ts">
	import { onMount } from 'svelte';
	import { hasSeenLesson } from '$lib/gates';
	import { LANDING_TEASER, REENTRY_LINK } from '$lib/data';

	let seen = $state(false);
	onMount(() => {
		seen = hasSeenLesson();
	});

	// Auto-fit the hero: shrink the type until the whole page fits the viewport,
	// so nothing is clipped on a short window. --hero-scale drives the sizes.
	let pageEl = $state<HTMLElement>();

	function fitHero() {
		if (!pageEl) return;
		let scale = 1;
		pageEl.style.setProperty('--hero-scale', '1');
		while (scale > 0.55 && pageEl.scrollHeight > pageEl.clientHeight + 1) {
			scale = Math.round((scale - 0.03) * 100) / 100;
			pageEl.style.setProperty('--hero-scale', String(scale));
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
		<div class="wrap landing-main">
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
					sizes="(min-width: 1024px) min(42vw, 620px), min(72vw, 440px)"
					width="900"
					height="638"
					alt=""
				/>
			</figure>
		</div>
	</div>

	<footer class="landing-tease wrap">
		<b>35%</b>
		<span>{LANDING_TEASER}</span>
	</footer>
</main>

<style>
	/* The figure is the anchor of the hero, so it appears at every width. Narrow
	   screens have no dead space beside the copy, so it sits in the flow, centered
	   under the copy block. It is scaled by --hero-scale — same knob as the type —
	   so fitHero() can shrink it along with everything else instead of letting it
	   push the page past the viewport. Mirrored and knocked out of its ground by
	   scripts/process-home-figure.sh. */
	.landing-main { position: relative; }
	.hero-figure {
		width: calc(min(72vw, 440px) * var(--hero-scale, 1));
		margin: calc(22px * var(--hero-scale, 1)) auto 0;
		pointer-events: none;
	}
	.hero-figure img {
		display: block;
		width: 100%;
		height: auto;
		max-height: 34vh;
		object-fit: contain;
		margin-inline: auto;
	}

	/* Wide screens: the wrap is capped at 1120px and the copy only fills its left
	   half, leaving real dead space on the right. Float him into it as a second
	   column. Out of flow on purpose: a flex child here would stretch .actions to
	   full width (align-self:stretch is the default), shoving the button's right
	   border out to the wrap edge. bottom:0 is the column's content-box bottom,
	   flush with the button's border until .landing-main's padding pushes it past. */
	@media (min-width: 1024px) {
		.hero-figure {
			position: absolute;
			bottom: calc(16px * var(--hero-scale, 1));
			right: 0;
			width: min(42vw, 620px);
			margin: 0;
		}
		.hero-figure img { max-height: 66vh; }
	}

	.landing-main { padding: calc(16px * var(--hero-scale, 1)) 0; }
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
		.lede { font-size: calc(1.05rem * var(--hero-scale, 1)); }
		.actions { gap: 18px; margin-top: calc(22px * var(--hero-scale, 1)); }
		.actions .button { flex: 1 1 100%; }
		.actions .quiet-link { font-size: calc(1.15rem * var(--hero-scale, 1)); }
	}
</style>
