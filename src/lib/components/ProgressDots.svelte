<script lang="ts">
	let {
		current,
		total,
		correct,
		attempted
	}: {
		current: number; // 1-based current question
		total: number;
		correct: number;
		attempted: number;
	} = $props();
</script>

<div class="progress" aria-label={`question ${current} of ${total}, ${correct} correct`}>
	<span class="label">{current}/{total}</span>
	<span class="tally">{correct} right · {attempted} answered</span>
</div>

<style>
	.progress {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 0.85rem;
		letter-spacing: 0.04em;
		color: var(--paper);
		opacity: 0.8;
		padding: 12px 0;
	}
	.label { font-weight: 700; text-transform: uppercase; }
	.tally { color: var(--gold); }
</style>
