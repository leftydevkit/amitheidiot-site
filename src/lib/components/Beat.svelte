<script lang="ts">
	import { onMount } from 'svelte';
	import type { Beat } from '$lib/data';

	let { beat }: { beat: Beat } = $props();

	let mounted = $state(false);
	// SSR-safe: entrance animation only after client mount (§9.13).
	onMount(() => { mounted = true; });
</script>

<article class={mounted ? 'beat entered' : 'beat'}>
	{#each beat.lines as line, i}
		{#if i === 0}
			<p class="first greek">{line}</p>
		{:else if beat.emphatic === i}
			<p class="emphatic">{line}</p>
		{:else}
			<p>{line}</p>
		{/if}
	{/each}
</article>

<style>
	.beat {
		position: relative;
		z-index: 1;
		width: 100%;
		max-width: 640px;
		margin: 0 auto;
		opacity: 0;
		transform: translateY(12px);
	}
	.beat.entered {
		opacity: 1;
		transform: none;
		transition: opacity 320ms ease, transform 320ms ease;
	}
	/* --beat-scale is set by the route to shrink the copy until it fits the
	   screen, so a long beat never scrolls. em-based spacing scales with it. */
	.beat p {
		font-size: calc(clamp(1.1rem, 3.1vw, 1.7rem) * var(--beat-scale, 1));
		line-height: 1.45;
		margin: 0 0 0.5em;
		text-wrap: pretty;
		text-shadow: 0 1px 10px rgba(0, 0, 0, 0.7);
	}
	/* Scoped as `.beat p.first` — as a bare `.first` it lost to `.beat p`
	   on specificity and the opening word rendered at paragraph size. */
	.beat p.first {
		font-size: calc(clamp(2.3rem, 9vw, 5rem) * var(--beat-scale, 1));
		margin-bottom: 0.1em;
		line-height: 1;
	}
	.emphatic { font-style: italic; }
</style>
