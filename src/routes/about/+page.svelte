<script lang="ts">
	const LAST_REVIEWED = '2026-09-17';
</script>

<svelte:head>
	<title>amitheidiot — sources & method</title>
	<meta name="description" content="sources, methodology, and the last time every number was checked." />
</svelte:head>

<main class="screen about">
	<header class="app-bar wrap">
		<a class="wordmark" href="/">am<span class="accent">i</span>the<span class="blood">idiot</span></a>
		<span class="eyebrow">about</span>
	</header>

	<div class="screen-body">
		<div class="wrap about-inner">
			<h1 class="page-title">sources &amp; method</h1>

			<section class="block">
				<h2>what this is</h2>
				<p>a civics quiz and a mirror. pick your difficulty — the rally, the echo chamber, or not maga — and it gets longer and faster the deeper you go: five questions at twelve seconds, eight at eight, twelve at six. there is a short lesson on what the word idiot used to mean, and a wall of numbers on how little the country actually knows. it is not subtle about the point. no account, no email, no analytics — nothing about you leaves your browser unless you choose to publish a run.</p>
			</section>

			<section class="block">
				<h2>what we store</h2>
				<p>nothing, unless you publish a run. if you do, we keep that one result — the questions you answered, your score, the time it took, and the name you typed if you typed one — so the shared link opens and the board can rank it. no account, no email, no analytics, no IP logging.</p>
				<p>the only cookie we set is a random string used to stop spam, and it says nothing about you. scoring is recomputed on our side from the question bank, so a published result is the result that was actually played. everything else stays on your device.</p>
			</section>

			<section class="block">
				<h2>the questions</h2>
				<p>the bank is the public-domain u.s. citizenship and immigration services 2008 civics test — quoted verbatim, minus the few questions whose answer depends on where you live or who happens to hold office this week. the original is oral and open-ended; we made every one four-choice, with distractors of our own. the hardest level adds a further set of questions harder than the citizenship test, because that test was never the bar for citizens. every answer is verifiable against the source document.</p>
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
		</div>
	</div>
</main>

<style>
	.about-inner { max-width: 720px; }
	.about .page-title { margin: 14px 0 18px; }
	.block { margin: 28px 0; border-top: 2px solid var(--paper); padding-top: 20px; }
	.block h2 { margin: 0 0 12px; font: 1.9rem/1 'Anton', sans-serif; text-transform: uppercase; }
	.block p { line-height: 1.6; font-size: 1.02rem; }
	.block a { display: inline-block; margin-top: 6px; }
	.back { margin-top: 32px; }
</style>
