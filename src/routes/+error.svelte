<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>amitheidiot — {page.status === 404 ? 'not found' : 'something broke'}</title>
</svelte:head>

<main class="screen error">
	<div class="screen-center">
		<div class="wrap error-inner">
			{#if page.status === 404}
				<p class="eyebrow">404</p>
				<p class="error-copy">that page doesn't exist. neither, apparently, do three branches of government for a third of the country. go home.</p>
				<a class="button" href="/">home</a>
			{:else}
				<p class="eyebrow">error</p>
				<p class="error-copy">something broke. it wasn't a civics question. reload.</p>
				<button class="button" onclick={() => location.reload()}>reload</button>
			{/if}
		</div>
	</div>
</main>

<style>
	.error-inner { display: flex; flex-direction: column; gap: 18px; align-items: flex-start; max-width: 640px; }
	.error-copy { font-size: clamp(1.25rem, 3vw, 1.8rem); line-height: 1.4; }
</style>
