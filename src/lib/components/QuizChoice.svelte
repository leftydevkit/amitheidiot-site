<script lang="ts">
	let {
		label,
		onSelect,
		disabled,
		state
	}: {
		label: string;
		onSelect: () => void;
		disabled: boolean;
		state: 'idle' | 'correct' | 'wrong';
	} = $props();
</script>

<button
	class="choice"
	class:is-correct={state === 'correct'}
	class:is-wrong={state === 'wrong'}
	{disabled}
	onclick={onSelect}
>
	{label}
</button>

<style>
	.choice {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
		min-height: 64px;
		padding: 12px 20px;
		border: 2px solid var(--paper);
		background: transparent;
		color: var(--paper);
		font-size: 1.1rem;
		text-align: left;
		line-height: 1.35;
		transition: transform 120ms ease, background 120ms ease;
	}
	.choice:hover:not(:disabled) { background: rgba(241, 236, 224, 0.08); }
	.choice:disabled { cursor: default; }
	.choice.is-correct { background: var(--blue); border-color: var(--blue); color: #fff; }
	.choice.is-wrong { background: var(--blood); border-color: var(--blood); color: #fff; }
</style>
