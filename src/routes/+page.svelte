<script lang="ts">
	import { onMount } from 'svelte';
	import { hasSeenLesson } from '$lib/gates';
	import { LANDING_TEASER, REENTRY_LINK } from '$lib/data';

	let seen = $state(false);
	onMount(() => {
		seen = hasSeenLesson();
	});
</script>

<svelte:head>
	<title>amitheidiot — civic knowledge, briefly</title>
	<meta name="description" content="five questions. three levels. the clock tightens as it gets harder." />
	<meta property="og:title" content="amitheidiot" />
	<meta property="og:description" content="five questions. three levels. the clock tightens as it gets harder." />
</svelte:head>

<main class="screen landing">
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
		</div>
	</div>

	<footer class="landing-tease wrap">
		<b>35%</b>
		<span>{LANDING_TEASER}</span>
	</footer>
</main>

<style>
	.landing-main { padding: 16px 0; }
	.landing .page-title { margin: 12px 0 16px; }
	.landing .lede { max-width: 34ch; }
	.actions { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; margin-top: 26px; }
	.actions .button { flex: 0 1 auto; }
	/* The re-entry link is a real invitation — bigger and fuller than a footer note. */
	.actions .quiet-link {
		font-size: 1.25rem;
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
		font: clamp(2.8rem, 8vw, 4.5rem)/0.8 'Anton', sans-serif;
	}

	@media (max-width: 620px) {
		.landing .page-title { font-size: min(clamp(3rem, 15vw, 9rem), 19vh); }
		.lede { font-size: 1.05rem; }
		.actions { gap: 18px; margin-top: 22px; }
		.actions .button { flex: 1 1 100%; }
		.actions .quiet-link { font-size: 1.15rem; }
	}
</style>
