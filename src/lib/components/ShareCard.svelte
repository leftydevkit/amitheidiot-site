<script lang="ts">
	import { QUESTIONS } from '$lib/data';
	import { buildShareCard } from '$lib/share';
	import type { RunResult } from '$lib/types';

	let { result }: { result: RunResult } = $props();

	let alias = $state('');
	let copied = $state(false);

	const perfect = $derived(result.answers.length > 0 && result.score === result.answers.length);
	const shareAnswer = $derived(() => {
		const wrong = result.answers.find((a) => !a.correct);
		return wrong ?? result.answers[0];
	});

	function questionFor(id: string) {
		return QUESTIONS.find((q) => q.id === id);
	}

	function fullCardText(): string {
		const a = shareAnswer();
		if (!a) return '';
		const name = alias.trim() || 'someone';

		if (perfect) {
			return [
				`${name} got all ${result.answers.length} right.`,
				`${name} knows what an idiot actually is, and isn't one.`,
				'are you?'
			].join('\n');
		}

		const q = questionFor(a.questionId);
		if (q) {
			return buildShareCard(name, q, a).join('\n');
		}
		return `${name} was asked something they didn't quite land.`;
	}

	async function copy() {
		try {
			await navigator.clipboard.writeText(fullCardText());
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch {
			// Clipboard unavailable — copied stays false.
		}
	}

	async function share() {
		const text = fullCardText();
		if (navigator.share) {
			try {
				await navigator.share({ text });
				return;
			} catch {
				// user cancelled; fall through to copy
			}
		}
		await copy();
	}
</script>

<div class="share-card">
	<h2 class="share-title">your card</h2>
	<p class="alias-prompt">what should we call you on the card? (a nickname is fine. no last names.)</p>
	<input
		class="alias-input"
		type="text"
		placeholder="a nickname"
		bind:value={alias}
		maxlength="32"
		autocomplete="off"
	/>

	<pre class="card-preview">{fullCardText()}</pre>

	<div class="share-actions">
		<button class="button" onclick={share}>share</button>
		<button class="button secondary" onclick={copy}>{copied ? 'copied' : 'copy'}</button>
	</div>
</div>

<style>
	.share-card { margin-top: 40px; border-top: 2px solid var(--paper); padding-top: 26px; max-width: 640px; }
	.share-title { font: 2rem/1 'Anton', sans-serif; text-transform: uppercase; margin: 0 0 12px; }
	.alias-prompt { font-size: 0.9rem; color: var(--gold); margin: 0 0 10px; }
	.alias-input {
		width: 100%;
		background: transparent;
		border: 2px solid var(--paper);
		color: var(--paper);
		font: inherit;
		font-size: 16px; /* >=16px prevents iOS input auto-zoom */
		min-height: 52px;
		padding: 12px 14px;
		margin-bottom: 16px;
	}
	.alias-input:focus { outline: 4px solid var(--gold); outline-offset: 2px; }
	.card-preview {
		font-family: 'Space Grotesk', sans-serif;
		white-space: pre-wrap;
		word-break: break-word;
		line-height: 1.5;
		border: 2px solid var(--paper);
		padding: 16px 18px;
		margin: 0 0 16px;
		background: rgba(241, 236, 224, 0.04);
	}
	.share-actions { display: flex; gap: 12px; flex-wrap: wrap; }
	@media (max-width: 620px) {
		.share-actions .button { flex: 1 1 100%; }
	}
</style>
