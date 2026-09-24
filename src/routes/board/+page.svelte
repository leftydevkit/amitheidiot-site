<script lang="ts">
	import { LEVELS, LEVEL_ORDER } from '$lib/quiz';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const TABS = [
		{ key: 'all' as const, label: 'all levels', href: '/board' },
		...LEVEL_ORDER.map((d) => ({ key: d, label: LEVELS[d].name, href: `/board?level=${d}` }))
	];

	const secs = (ms: number) => `${(ms / 1000).toFixed(1)}s`;
	const pct = (score: number, total: number) => `${Math.round((score / total) * 100)}%`;
</script>

<svelte:head>
	<title>amitheidiot — the board</title>
	<meta name="description" content="everyone who chose to be scored in public, ranked by accuracy." />
</svelte:head>

<main class="screen board">
	<div class="screen-body">
		<div class="wrap board-inner">
			<header class="app-bar">
				<a class="wordmark" href="/">am<span class="accent">i</span>the<span class="blood">idiot</span></a>
				<span class="eyebrow">the board</span>
			</header>

			<h1 class="page-title">the board</h1>
			<p class="lede">everyone who chose to be scored in public. ranked by accuracy, then by how fast they got there.</p>

			<nav class="tabs">
				{#each TABS as t}
					<a class="tab" class:on={data.level === t.key} href={t.href}>{t.label}</a>
				{/each}
			</nav>

			{#if !data.configured}
				<p class="empty">the board is offline right now. try again in a minute.</p>
			{:else if data.rows.length === 0}
				<p class="empty">nobody has published a run at this level yet. be the first, or the field is yours.</p>
			{:else}
				<ol class="rows">
					{#each data.rows as r, i}
						<li class="row">
							<span class="rank">{i + 1}</span>
							<a class="name" href={`/r/${r.id}`}>{r.alias ?? 'anonymous'}</a>
							<span class="tier">{r.tier}</span>
							<span class="nums">{r.score}/{r.total} · {pct(r.score, r.total)} · {secs(r.total_ms)}</span>
							<span class="when">{r.when}</span>
						</li>
					{/each}
				</ol>
			{/if}

			<section class="actions">
				<a class="button gold" href="/quiz">take the quiz</a>
			</section>
		</div>
	</div>
</main>

<style>
	.board-inner {
		max-width: 780px;
		padding-top: max(20px, env(safe-area-inset-top));
		padding-bottom: max(30px, env(safe-area-inset-bottom));
	}
	.page-title {
		font-size: min(clamp(2.6rem, 12vw, 6rem), 14vh);
		margin: 18px 0 10px;
	}
	.lede {
		max-width: 60ch;
		margin-bottom: 22px;
	}
	.tabs {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
		margin-bottom: 20px;
	}
	.tab {
		border: 2px solid var(--paper);
		padding: 6px 12px;
		text-decoration: none;
		font-size: 0.78rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		opacity: 0.66;
	}
	.tab.on {
		opacity: 1;
		background: var(--paper);
		color: var(--ink);
	}
	.empty {
		border: 2px solid var(--paper);
		padding: 20px;
		opacity: 0.85;
	}
	.rows {
		list-style: none;
		margin: 0;
		padding: 0;
		counter-reset: none;
	}
	.row {
		display: grid;
		grid-template-columns: 2.4rem minmax(0, 1fr) auto;
		grid-template-areas:
			'rank name nums'
			'. tier when';
		align-items: baseline;
		gap: 2px 12px;
		border-top: 2px solid rgba(241, 236, 224, 0.24);
		padding: 12px 0;
	}
	.rank {
		grid-area: rank;
		font-family: 'Anton', sans-serif;
		font-size: 1.3rem;
		color: var(--gold);
	}
	.name {
		grid-area: name;
		font-weight: 700;
		font-size: 1.1rem;
		text-decoration: none;
		overflow-wrap: anywhere;
	}
	.name:hover {
		text-decoration: underline;
	}
	.tier {
		grid-area: tier;
		font-size: 0.72rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		opacity: 0.72;
	}
	.nums {
		grid-area: nums;
		text-align: right;
		font-variant-numeric: tabular-nums;
	}
	.when {
		grid-area: when;
		text-align: right;
		font-size: 0.78rem;
		opacity: 0.55;
	}
	.actions {
		margin-top: 28px;
	}
</style>
