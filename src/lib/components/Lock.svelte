<script lang="ts">
</script>

<section class="lock">
	<p class="lock-word">locked</p>
	<h1 class="lock-title">you don't get to see this yet.</h1>
	<p class="lock-copy">earn it.</p>
	<a class="button gold" href="/quiz">take the quiz</a>
</section>

<style>
	.lock {
		max-width: 640px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 14px;
		border: 2px solid var(--gold);
		padding: 40px 32px;
	}
	.lock-word { margin: 0; color: var(--gold); text-transform: uppercase; letter-spacing: 0.14em; font-size: 0.8rem; font-weight: 700; }
	.lock-title { margin: 0; font: clamp(2.4rem, 8vw, 4rem)/1 'Anton', sans-serif; text-transform: uppercase; }
	.lock-copy { margin: 0 0 14px; font-size: 1.3rem; }
</style>
