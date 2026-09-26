<script lang="ts">
	import { onMount } from 'svelte';
	import { loadLastResult } from '$lib/gates';
	import { TIER_DETAILS, PEP_TALK, NO_ANSWER_LABEL, QUESTIONS } from '$lib/data';
	import ShareCard from '$lib/components/ShareCard.svelte';
	import ShareQr from '$lib/components/ShareQr.svelte';
	import type { RunResult } from '$lib/types';

	let result = $state<RunResult | null>(null);
	onMount(() => {
		result = loadLastResult();
	});

	const tier = $derived(result ? TIER_DETAILS[result.tier] : null);
	const score = $derived(result?.score ?? 0);

	// Publish (optional): stores the run server-side, returns a short id, and puts
	// it on the board. Anonymous unless a name is typed. The score is recomputed
	// server-side, so nothing here is trusted.
	let alias = $state('');
	let publishing = $state(false);
	let publishedId = $state<string | null>(null);
	let publishError = $state('');

	const origin = typeof location !== 'undefined' ? location.origin : 'https://amitheidiot.com';
	const shareUrl = $derived(publishedId ? `${origin}/r/${publishedId}` : '');
	const canPublish = $derived(
		!!result &&
			[1, 2, 3].includes(result.level) &&
			result.answers.every((a) => typeof a.choice !== 'undefined')
	);

	async function publish() {
		if (!result || publishing) return;
		publishing = true;
		publishError = '';
		try {
			const res = await fetch('/api/runs', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({
					alias: alias.trim() || null,
					result: {
						level: result.level,
						answers: result.answers.map((a) => ({
							questionId: a.questionId,
							choice: a.choice ?? null,
							timeMs: a.timeMs
						}))
					}
				})
			});
			const body = (await res.json().catch(() => ({}))) as {
				id?: string;
				deleteToken?: string;
				error?: string;
			};
			if (!res.ok || !body.id) throw new Error(body.error || 'could not publish');
			publishedId = body.id;
			// The token lives only on this device; it's the only way to remove the run later.
			if (body.deleteToken) {
				try {
					localStorage.setItem(`amiti_del_${body.id}`, body.deleteToken);
				} catch {
					/* storage blocked — the run just can't be self-deleted from here */
				}
			}
		} catch (e) {
			publishError = e instanceof Error ? e.message : 'could not publish';
		} finally {
			publishing = false;
		}
	}

	function questionFor(id: string) {
		return QUESTIONS.find((q) => q.id === id);
	}

	function reveal(questionId: string, choice: string | null) {
		const q = questionFor(questionId);
		if (!q) return null;
		return {
			prompt: q.prompt,
			theirs: choice ?? NO_ANSWER_LABEL,
			correct: q.choices[q.answerIndex]
		};
	}
</script>

<svelte:head>
	<title>amitheidiot — your score</title>
	<meta name="description" content="the word had a different meaning once." />
</svelte:head>

<main class="screen results">
	<div class="screen-body">
		<div class="wrap results-inner">
			{#if !result}
				<section class="empty">
					<p class="empty-copy">there's no score to show you. you haven't played yet.</p>
					<a class="button" href="/quiz">take the quiz</a>
				</section>
			{:else}
				<section class="score-hero">
					<p class="eyebrow">your score</p>
					<h1 class="tier">{tier?.label ?? 'IDIOT'}</h1>
					<p class="score-line">{score} / {result.answers.length}</p>
					<p class="tier-desc">{tier?.description}</p>
				</section>

				<section class="pep-talk">
					{#each PEP_TALK as p}
						<p>{p}</p>
					{/each}
				</section>

				<section class="reveal">
					<h2 class="reveal-title">the answers</h2>
					{#each result.answers as a}
						{@const r = reveal(a.questionId, a.choice)}
						{#if r}
							<div class="reveal-item" class:is-correct={a.correct}>
								<p class="reveal-q">{r.prompt}</p>
								<p class="reveal-theirs">you said: {r.theirs}</p>
								{#if !a.correct}
									<p class="reveal-correct">correct: {r.correct}</p>
								{/if}
							</div>
						{/if}
					{/each}
				</section>

				<section class="actions">
					<a class="button gold" href="/stats">see the numbers</a>
					<a class="button secondary" href="/learn">review what you missed</a>
					<a class="button secondary" href="/board">the board</a>
					<a class="button secondary" href="/quiz">play again</a>
				</section>

				<section class="publish">
					<h2 class="publish-title">put it on the board</h2>
					{#if publishedId}
						<div class="published">
							<ShareQr value={shareUrl} size={168} />
							<div class="published-copy">
								<p>screenshot this and send it. the code opens this exact result, and you are on the board.</p>
								<p class="published-url">{shareUrl}</p>
								<p class="published-note">keep this device — it is the only place that can remove the result later.</p>
							</div>
						</div>
					{:else}
						<p class="publish-lede">optional. add a name and it shows on the board — leave it blank and you stay anonymous.</p>
						<div class="publish-row">
							<input
								class="alias-input"
								type="text"
								maxlength="24"
								placeholder="a name (optional)"
								bind:value={alias}
								autocomplete="off"
							/>
							<button class="button" onclick={publish} disabled={publishing || !canPublish}>
								{publishing ? 'publishing…' : 'publish this run'}
							</button>
						</div>
						{#if publishError}
							<p class="publish-err">{publishError}</p>
						{:else if !canPublish}
							<p class="publish-err">this run predates sharing — play again to publish it.</p>
						{/if}
					{/if}
				</section>

				<ShareCard {result} />
			{/if}
		</div>
	</div>
</main>

<style>
	.results-inner { max-width: 720px; padding-top: max(24px, env(safe-area-inset-top)); }
	.empty { min-height: 70%; display: flex; flex-direction: column; justify-content: center; gap: 18px; align-items: flex-start; }
	.empty-copy { font-size: clamp(1.25rem, 3vw, 1.8rem); line-height: 1.4; max-width: 560px; }
	.score-hero { margin-top: 12px; }
	.tier {
		font: clamp(3.2rem, 16vw, 9rem)/0.85 'Anton', sans-serif;
		font-size: min(clamp(3.2rem, 16vw, 9rem), 17vh);
		margin: 10px 0 6px;
		text-transform: uppercase;
		color: var(--gold);
	}
	.score-line { font-size: 1.5rem; font-weight: 700; }
	.tier-desc { max-width: 560px; font-size: 1.15rem; line-height: 1.5; margin-bottom: 34px; }
	.pep-talk { border-top: 2px solid var(--paper); padding-top: 24px; display: flex; flex-direction: column; gap: 18px; }
	.pep-talk p { margin: 0; line-height: 1.6; font-size: 1.02rem; max-width: 640px; }
	.reveal { margin-top: 36px; border-top: 2px solid var(--paper); padding-top: 24px; }
	.reveal-title { font: 2rem/1 'Anton', sans-serif; text-transform: uppercase; margin: 0 0 18px; }
	.reveal-item { border: 2px solid var(--paper); padding: 16px 18px; margin-bottom: 12px; }
	.reveal-item.is-correct { border-color: var(--blue); }
	.reveal-q { margin: 0 0 8px; font-weight: 700; font-size: 1.08rem; }
	.reveal-theirs { margin: 0; opacity: 0.82; }
	.reveal-correct { margin: 6px 0 0; color: var(--blue); font-weight: 700; }
	.actions { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 32px; }

	.publish { margin-top: 40px; border-top: 2px solid var(--paper); padding-top: 24px; max-width: 640px; }
	.publish-title { font: 2rem/1 'Anton', sans-serif; text-transform: uppercase; margin: 0 0 12px; }
	.publish-lede { margin: 0 0 14px; line-height: 1.5; max-width: 560px; }
	.publish-row { display: flex; gap: 12px; flex-wrap: wrap; align-items: stretch; }
	.alias-input {
		flex: 1 1 220px;
		background: transparent;
		border: 2px solid var(--paper);
		color: var(--paper);
		font: inherit;
		font-size: 16px; /* >=16px prevents iOS input auto-zoom */
		min-height: 52px;
		padding: 12px 14px;
	}
	.alias-input:focus { outline: 4px solid var(--gold); outline-offset: 2px; }
	.publish-err { margin: 12px 0 0; color: var(--blood); font-weight: 700; line-height: 1.4; }
	.published { display: flex; gap: 18px; align-items: center; flex-wrap: wrap; }
	.published-copy { flex: 1 1 220px; }
	.published-copy p { margin: 0 0 8px; line-height: 1.45; }
	.published-url { font-size: 0.82rem; opacity: 0.72; word-break: break-all; }
	.published-note { font-size: 0.82rem; opacity: 0.6; }

	@media (max-width: 620px) {
		.actions .button { flex: 1 1 100%; }
	}
</style>
