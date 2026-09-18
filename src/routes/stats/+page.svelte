<script lang="ts">
	import { onMount } from 'svelte';
	import Lock from '$lib/components/Lock.svelte';
	import StatCard from '$lib/components/StatCard.svelte';
	import { STATS } from '$lib/data';
	import { isStatsUnlocked } from '$lib/gates';
	import type { Stat } from '$lib/types';

	let unlocked = $state(false);
	let active = $state('civics');

	onMount(() => {
		unlocked = isStatsUnlocked();
	});

	const SECTIONS = [
		{ key: 'civics', label: 'civics' },
		{ key: 'literacy', label: 'reading & literacy' },
		{ key: 'science', label: 'science & trust' },
		{ key: 'education', label: 'education' },
		{ key: 'media', label: 'media' },
		{ key: 'overall', label: 'the picture' }
	] as const;

	const activeStats = $derived(STATS.filter((s) => s.section === active));
</script>

<svelte:head>
	<title>amitheidiot — the numbers</title>
	<meta name="description" content="the receipts. every figure cited to its source." />
</svelte:head>

<main class="screen stats">
	{#if !unlocked}
		<div class="screen-center">
			<div class="wrap">
				<Lock />
			</div>
		</div>
	{:else}
		<header class="stats-head wrap">
			<div class="stats-titlerow">
				<a class="wordmark" href="/">am<span class="accent">i</span>the<span class="blood">idiot</span></a>
				<span class="eyebrow">the wall</span>
			</div>
			<h1 class="stats-title">the receipts</h1>
			<nav class="sections" aria-label="statistics sections">
				{#each SECTIONS as s}
					<button
						class="section-tab"
						class:section-active={active === s.key}
						onclick={() => (active = s.key)}
					>
						{s.label}
					</button>
				{/each}
			</nav>
		</header>

		<div class="screen-body">
			<div class="wrap">
				<div class="cards stat-grid">
					{#each activeStats as stat}
						<StatCard {stat} />
					{/each}
				</div>
			</div>
		</div>
	{/if}
</main>

<style>
	.stats-head { flex: 0 0 auto; padding-top: max(20px, env(safe-area-inset-top)); }
	.stats-titlerow { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; }
	.stats-title {
		margin: 10px 0 14px;
		font: clamp(2rem, 7vw, 4rem)/0.9 'Anton', sans-serif;
		font-size: min(clamp(2rem, 7vw, 4rem), 9vh);
		text-transform: uppercase;
		letter-spacing: -0.02em;
	}
	/* Tabs scroll horizontally on narrow screens — never wrap, never overflow. */
	.sections {
		display: flex;
		gap: 8px;
		margin: 0 0 16px;
		overflow-x: auto;
		overflow-y: hidden;
		flex-wrap: nowrap;
		scrollbar-width: none;
		-webkit-overflow-scrolling: touch;
	}
	.sections::-webkit-scrollbar { display: none; }
	.section-tab {
		flex: 0 0 auto;
		background: transparent;
		border: 2px solid var(--paper);
		color: var(--paper);
		padding: 8px 16px;
		font: inherit;
		font-size: 0.82rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		min-height: 44px;
		white-space: nowrap;
	}
	.section-tab:hover { background: rgba(241, 236, 224, 0.08); }
	.section-active { background: var(--paper); color: var(--ink); }
	.stat-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
	@media (max-width: 620px) {
		.stat-grid { grid-template-columns: 1fr; }
	}
</style>

