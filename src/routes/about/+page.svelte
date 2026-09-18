<script lang="ts">
	const LAST_REVIEWED = '2026-09-17';
</script>

<svelte:head>
	<title>amitheidiot — sources & method</title>
	<meta name="description" content="sources, methodology, and the last time every number was checked." />
</svelte:head>

<main class="shell about">
	<a class="wordmark" href="/">am<span class="accent">i</span>the<span class="blood">idiot</span></a>
	<p class="eyebrow">about</p>
	<h1 class="page-title">sources &amp; method</h1>

	<section class="block">
		<h2>what this is</h2>
		<p>five civics questions, three seconds each, and a story about what the word idiot used to mean. no accounts, no email, no analytics, no data leaves your browser.</p>
	</section>

	<section class="block">
		<h2>the questions</h2>
		<p>all 24 questions are drawn from the public-domain u.s. citizenship and immigration services 2008 civics test, rewritten into four-choice form where the original was open-ended. the correct answer to every question is verifiable against that source document.</p>
		<a class="quiet-link" href="https://www.uscis.gov/sites/default/files/document/questions-and-answers/OoC_100_Questions_2008_Civics_Test_V1.pdf" target="_blank" rel="noopener noreferrer">uscis 2008 civics test (pdf) ↗</a>
	</section>

	<section class="block">
		<h2>the statistics</h2>
		<p>every statistic on the wall was checked live against its publisher on {LAST_REVIEWED}. no figure in this app is approximated. where a number could not be tied to a real, citable source, it was cut. each card carries its outlet, year, and a direct link.</p>
	</section>

	<section class="block">
		<h2>last reviewed</h2>
		<p>{LAST_REVIEWED}</p>
	</section>

	<section class="block">
		<h2>not affiliated</h2>
		<p>this site is not affiliated with, endorsed by, or connected to the u.s. government, uscis, any school, or any of the research organizations cited. we are just quoting their published work.</p>
	</section>

	<p class="meta back"><a class="quiet-link" href="/">← back</a></p>
</main>

<style>
	.about { max-width: 720px; }
	.block { margin: 34px 0; border-top: 2px solid var(--paper); padding-top: 22px; }
	.block h2 { margin: 0 0 12px; font: 2rem/1 'Anton', sans-serif; text-transform: uppercase; }
	.block p { line-height: 1.6; font-size: 1.05rem; }
	.block a { display: inline-block; margin-top: 6px; }
	.back { margin-top: 40px; }
</style>
