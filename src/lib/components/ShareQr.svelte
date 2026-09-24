<script lang="ts">
	// Inline SVG QR, generated client-side. The library emits a viewBox (no fixed
	// width/height), so the SVG scales to whatever box we give it. The code is
	// drawn dark-on-white by the library, which is why the frame is white — a
	// dark-on-dark QR would not scan.
	let { value, size = 176 }: { value: string; size?: number } = $props();

	let svg = $state('');

	$effect(() => {
		const v = value;
		if (!v) return;
		let cancelled = false;
		import('qrcode')
			.then((mod) => mod.default.toString(v, { type: 'svg', margin: 1 }))
			.then((out) => {
				if (!cancelled) svg = out;
			})
			.catch(() => {
				if (!cancelled) svg = '';
			});
		return () => {
			cancelled = true;
		};
	});
</script>

<div class="qr" style:--qr-size="{size}px">
	{#if svg}
		{@html svg}
	{:else}
		<span class="skeleton"></span>
	{/if}
</div>

<style>
	.qr {
		width: var(--qr-size);
		height: var(--qr-size);
		max-width: 100%;
		background: #fff;
		padding: 10px;
	}
	.qr :global(svg) {
		display: block;
		width: 100%;
		height: 100%;
	}
	.skeleton {
		display: block;
		width: 100%;
		height: 100%;
		background: var(--ink);
		opacity: 0.12;
	}
</style>
