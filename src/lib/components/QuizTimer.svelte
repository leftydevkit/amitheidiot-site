<script lang="ts">
	import { onMount } from 'svelte';
	import { TIMER_SECONDS } from '$lib/quiz';

	let { onExpire }: { onExpire: () => void } = $props();

	let remaining = $state(TIMER_SECONDS);
	let mounted = $state(false);

	// The countdown itself is game logic and never slows for reduced motion;
	// only the visual drain is stripped (§9.11). We detect the preference for
	// the numeral fallback only.
	let prefersReduced = $state(false);
	let done = $state(false);

	onMount(() => {
		mounted = true;
		prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const startedAt = performance.now();
		const tick = () => {
			const elapsed = (performance.now() - startedAt) / 1000;
			const next = Math.max(0, TIMER_SECONDS - elapsed);
			remaining = next;
			if (next <= 0) {
				done = true;
				onExpire();
			} else {
				requestAnimationFrame(tick);
			}
		};
		requestAnimationFrame(tick);
	});

	const pct = $derived(mounted && !prefersReduced ? (remaining / TIMER_SECONDS) * 100 : 100);
	const whole = $derived(Math.ceil(remaining));
</script>

<div class="timer" role="timer" aria-live="polite" aria-label="time remaining">
	{#if mounted && prefersReduced}
		<span class="numeral">{whole}</span>
	{:else}
		<span class="ring" style:--pct="{pct}%"></span>
	{/if}
</div>

<style>
	.timer { display: flex; align-items: center; justify-content: center; margin: 20px 0; }
	.ring {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: conic-gradient(var(--gold) var(--pct), rgba(241, 236, 224, 0.15) 0);
		mask: radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 5px));
		-webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 5px));
	}
	.numeral {
		font: 2rem/1 'Anton', sans-serif;
		color: var(--gold);
		min-width: 1.5em;
		text-align: center;
	}
</style>
