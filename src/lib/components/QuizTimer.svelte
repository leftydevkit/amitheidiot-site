<script lang="ts">
	import { onMount } from 'svelte';

	let { seconds, onExpire }: { seconds: number; onExpire: () => void } = $props();

	let remaining = $state(0);
	let mounted = $state(false);

	// The countdown is game logic and never slows for reduced motion; only the
	// animated drain is stripped there (the numeral still counts down).
	let prefersReduced = $state(false);

	onMount(() => {
		mounted = true;
		prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	});

	// Re-arms whenever `seconds` changes (a new question, a new level).
	$effect(() => {
		const total = seconds;
		remaining = total;
		const startedAt = performance.now();
		let raf = requestAnimationFrame(function tick() {
			const elapsed = (performance.now() - startedAt) / 1000;
			const next = Math.max(0, total - elapsed);
			remaining = next;
			if (next <= 0) onExpire();
			else raf = requestAnimationFrame(tick);
		});
		return () => cancelAnimationFrame(raf);
	});

	const pct = $derived(mounted && !prefersReduced ? (remaining / seconds) * 100 : 100);
	const whole = $derived(Math.max(0, Math.ceil(remaining)));
</script>

<div class="timer" role="timer" aria-live="polite" aria-label="time remaining">
	<span class="ring" style:--pct="{pct}%"></span>
	<span class="numeral">{whole}</span>
</div>

<style>
	.timer {
		position: relative;
		width: 52px;
		height: 52px;
		display: grid;
		place-items: center;
		margin: 6px 0;
	}
	.ring {
		position: absolute;
		inset: 0;
		border-radius: 50%;
		background: conic-gradient(var(--gold) var(--pct), rgba(241, 236, 224, 0.14) 0);
		mask: radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 4px));
		-webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 4px));
	}
	.numeral {
		position: relative;
		font: 1.35rem/1 'Anton', sans-serif;
		color: var(--gold);
	}
</style>
