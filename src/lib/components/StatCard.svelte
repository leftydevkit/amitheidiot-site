<script lang="ts">
	import type { Stat } from '$lib/types';

	let { stat }: { stat: Stat } = $props();
</script>

<article class="stat-card">
	<p class="stat-figure">{stat.figure}</p>
	<p class="stat-claim">{stat.claim}</p>
	<p class="stat-dry">{stat.dryLine}</p>
	<p class="stat-meta">
		<span class="stat-source">{stat.sourceOutlet}</span>
		<span class="stat-year">{stat.sourceYear}</span>
		<a class="stat-link" href={stat.sourceUrl} target="_blank" rel="noopener noreferrer">source ↗</a>
	</p>
</article>

<style>
	.stat-card {
		border: 2px solid var(--paper);
		padding: 22px 24px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.stat-figure {
		margin: 0;
		font: clamp(2.4rem, 5vw, 3.4rem)/1 'Anton', sans-serif;
		color: var(--gold);
	}
	.stat-claim { margin: 0; font-size: 1.15rem; line-height: 1.4; font-weight: 500; }
	.stat-dry { margin: 0; font-size: 0.95rem; line-height: 1.5; opacity: 0.82; }
	.stat-meta {
		margin: 8px 0 0;
		display: flex;
		gap: 10px;
		align-items: center;
		flex-wrap: wrap;
		font-size: 0.78rem;
		letter-spacing: 0.04em;
		opacity: 0.72;
	}
	.stat-source { text-transform: uppercase; }
	.stat-link { color: var(--gold); text-underline-offset: 3px; }
</style>
