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
	<meta name="description" content="five questions. three seconds each. the word had a different meaning once." />
	<meta property="og:title" content="amitheidiot" />
	<meta property="og:description" content="five questions. three seconds each. the word had a different meaning once." />
</svelte:head>

<main class="shell landing">
	<a class="wordmark" href="/">am<span class="accent">i</span>the<span class="blood">idiot</span></a>
	<p class="eyebrow">ἰδιώτης · a private citizen</p>
	<h1 class="page-title">are you smarter<br />than an <span class="blood">idiot</span></h1>
	<p class="lede">not the person who does not know. the person who is proud of it.</p>
	<div class="actions">
		<a class="button" href={seen ? '/quiz' : '/origin'}>{seen ? 'take the quiz' : 'begin'}</a>
		<a class="quiet-link" href="/origin">{REENTRY_LINK}</a>
	</div>
	<div class="tease">
		<b>35%</b>
		<span>{LANDING_TEASER}</span>
	</div>
</main>

<style>
	.landing { min-height: 100svh; display: flex; flex-direction: column; justify-content: center; }
	.landing .wordmark { position: absolute; top: 26px; }
	.landing .eyebrow { margin-top: 60px; }
	.landing .page-title { margin: 18px 0 22px; max-width: 1000px; }
	.actions { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; margin-top: 28px; }
	.tease {
		margin-top: auto;
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 18px;
		align-items: baseline;
		border-top: 2px solid var(--paper);
		padding: 18px 0;
		font-size: 0.9rem;
	}
	.tease b { color: var(--gold); font: 2.4rem/0.8 'Anton', sans-serif; }
	@media (max-width: 620px) {
		.landing .wordmark { width: calc(100% - 28px); }
	}
</style>
