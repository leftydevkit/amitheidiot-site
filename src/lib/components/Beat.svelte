<script lang="ts">
	import { onMount } from 'svelte';
	import type { Beat } from '$lib/data';

	let { beat, onAdvance, isLast }: {
		beat: Beat;
		onAdvance: () => void;
		isLast: boolean;
	} = $props();

	let mounted = $state(false);
	// SSR-safe: entrance animation only after client mount (§9.13).
	onMount(() => { mounted = true; });
</script>

<svelte:head>
	<title>amitheidiot — the word</title>
</svelte:head>

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
	{#if isLast}
		<button class="button gold" onclick={onAdvance}>start</button>
	{:else}
		<button class="hint" onclick={onAdvance}>tap to continue</button>
	{/if}
</article>

<style>
	.beat {
		cursor: pointer;
		outline: none;
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
	.beat p {
		font-size: clamp(1.25rem, 3.4vw, 1.9rem);
		line-height: 1.5;
		margin: 0 0 0.6em;
		text-wrap: pretty;
	}
	.first { font-size: clamp(3rem, 12vw, 6rem); margin-bottom: 0.2em; line-height: 1; }
	.emphatic { font-style: italic; }
	.hint {
		display: inline-block;
		margin-top: 1em;
		background: none;
		border: 0;
		color: var(--gold);
		font: inherit;
		font-size: 0.8rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		opacity: 0.8;
		text-decoration: underline;
		text-underline-offset: 4px;
	}
	.button { margin-top: 2em; }
</style>
