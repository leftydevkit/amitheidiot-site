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

<main class="shell stats">
	{#if !unlocked}
		<Lock />
	{:else}
		<a class="wordmark" href="/">am<span class="accent">i</span>the<span class="blood">idiot</span></a>
		<p class="eyebrow">the wall</p>
		<h1 class="page-title">the receipts</h1>

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

		<div class="cards stat-grid">
			{#each activeStats as stat}
				<StatCard {stat} />
			{/each}
		</div>
	{/if}
</main>

<style>
	.stats { max-width: 1120px; }
	.sections { display: flex; gap: 8px; flex-wrap: wrap; margin: 0 0 26px; }
	.section-tab {
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
	}
	.section-tab:hover { background: rgba(241, 236, 224, 0.08); }
	.section-active { background: var(--paper); color: var(--ink); }
	.stat-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
	@media (max-width: 620px) {
		.stat-grid { grid-template-columns: 1fr; }
	}
</style>
