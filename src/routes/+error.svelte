<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>amitheidiot — {page.status === 404 ? 'not found' : 'something broke'}</title>
</svelte:head>

<main class="shell error">
	{#if page.status === 404}
		<p class="eyebrow">404</p>
		<p class="error-copy">that page doesn't exist. neither, apparently, do three branches of government for a third of the country. go home.</p>
		<a class="button" href="/">home</a>
	{:else}
		<p class="eyebrow">error</p>
		<p class="error-copy">something broke. it wasn't a civics question. reload.</p>
		<button class="button" onclick={() => location.reload()}>reload</button>
	{/if}
</main>

<style>
	.error { min-height: 100svh; display: flex; flex-direction: column; justify-content: center; gap: 18px; align-items: flex-start; max-width: 640px; }
	.error-copy { font-size: clamp(1.3rem, 3vw, 1.8rem); line-height: 1.4; }
</style>
