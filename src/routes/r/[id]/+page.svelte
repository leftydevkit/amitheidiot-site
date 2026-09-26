<script lang="ts">
	import { onMount } from 'svelte';
	import { QUESTIONS, TIER_DETAILS, NO_ANSWER_LABEL, REPORT_EMAIL } from '$lib/data';
	import ShareQr from '$lib/components/ShareQr.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const run = $derived(data.run);
	const tier = $derived(TIER_DETAILS[run.tier]);
	const title = $derived(`${tier?.label ?? run.tier} — ${run.score}/${run.total}`);

	// The delete token only ever lives on the device that published the run, so
	// this affordance shows for the publisher and nobody else.
	let delToken = $state<string | null>(null);
	let removing = $state(false);
	let removed = $state(false);

	onMount(() => {
		try {
			delToken = localStorage.getItem(`amiti_del_${data.run.id}`);
		} catch {
			delToken = null;
		}
	});

	async function removeRun() {
		if (!delToken || removing) return;
		removing = true;
		try {
			const res = await fetch(`/api/runs/${data.run.id}/delete`, {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ token: delToken })
			});
			if (res.ok) {
				try {
					localStorage.removeItem(`amiti_del_${data.run.id}`);
				} catch {
					/* ignore */
				}
				removed = true;
			}
		} finally {
			removing = false;
		}
	}

	function reveal(questionId: string, choice: string | null) {
		const q = QUESTIONS.find((x) => x.id === questionId);
		if (!q) return null;
		return {
			prompt: q.prompt,
			theirs: choice ?? NO_ANSWER_LABEL,
			correct: q.choices[q.answerIndex]
		};
	}
</script>

<svelte:head>
	<title>{title} — amitheidiot</title>
	<meta name="description" content={`${run.alias ?? 'someone'} scored ${run.score} of ${run.total} on amitheidiot.`} />
	<meta property="og:title" content={`${title} — amitheidiot`} />
	<meta property="og:description" content={`${run.alias ?? 'someone'} scored ${run.score} of ${run.total}.`} />
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<main class="screen shared">
	<div class="screen-body">
		<div class="wrap shared-inner">
			<header class="app-bar">
				<a class="wordmark" href="/">am<span class="accent">i</span>the<span class="blood">idiot</span></a>
				<span class="eyebrow">shared result</span>
			</header>

			<section class="hero">
				<h1 class="tier">{tier?.label ?? run.tier}</h1>
				<p class="score-line">{run.score} / {run.total}</p>
				<p class="who">{run.alias ? `${run.alias} scored this.` : 'someone scored this, anonymously.'}</p>
			</section>

			<section class="qr-block">
				<ShareQr value={data.shareUrl} size={168} />
				<div class="qr-copy">
					<p>scan it to open this exact result. or just screenshot the thing and send it.</p>
					<p class="url">{data.shareUrl}</p>
				</div>
			</section>

			<section class="reveal">
				<h2 class="reveal-title">what they got</h2>
				{#each run.answers as a}
					{@const r = reveal(a.questionId, a.choice)}
					{#if r}
						<div class="item" class:ok={a.choice === r.correct}>
							<p class="q">{r.prompt}</p>
							<p class="theirs">they said: {r.theirs}</p>
							{#if a.choice !== r.correct}
								<p class="correct">correct: {r.correct}</p>
							{/if}
						</div>
					{/if}
				{/each}
			</section>

			<section class="actions">
				<a class="button gold" href="/quiz">take the quiz</a>
				<a class="button secondary" href="/board">the board</a>
			</section>

			{#if delToken}
				<div class="owner">
					{#if removed}
						<p class="removed">gone. it is off the board.</p>
					{:else}
						<button class="remove" onclick={removeRun} disabled={removing}>
							{removing ? 'removing…' : 'delete this result'}
						</button>
					{/if}
				</div>
			{/if}

			<p class="report">
				something abusive here?
				<a class="quiet-link" href={`mailto:${REPORT_EMAIL}?subject=report ${run.id}`}>report this result</a>
			</p>
		</div>
	</div>
</main>

<style>
	.shared-inner {
		max-width: 720px;
		padding-top: max(20px, env(safe-area-inset-top));
	}
	.hero {
		margin: 18px 0 8px;
		border-top: 2px solid var(--paper);
		padding-top: 20px;
	}
	.tier {
		font-size: min(clamp(3rem, 14vw, 8rem), 16vh);
		line-height: 0.85;
		font-family: 'Anton', sans-serif;
		text-transform: uppercase;
		color: var(--gold);
		margin: 8px 0 6px;
	}
	.score-line {
		font-size: 1.5rem;
		font-weight: 700;
	}
	.who {
		opacity: 0.85;
		margin-bottom: 26px;
	}
	.qr-block {
		display: flex;
		gap: 18px;
		align-items: center;
		flex-wrap: wrap;
		border: 2px solid var(--paper);
		padding: 16px;
		margin-bottom: 30px;
	}
	.qr-copy {
		flex: 1 1 220px;
	}
	.qr-copy p {
		margin: 0 0 8px;
		line-height: 1.45;
	}
	.qr-copy .url {
		font-size: 0.82rem;
		opacity: 0.72;
		word-break: break-all;
	}
	.reveal {
		border-top: 2px solid var(--paper);
		padding-top: 22px;
	}
	.reveal-title {
		font: 2rem/1 'Anton', sans-serif;
		text-transform: uppercase;
		margin: 0 0 18px;
	}
	.item {
		border: 2px solid var(--paper);
		padding: 14px 16px;
		margin-bottom: 12px;
	}
	.item.ok {
		border-color: var(--blue);
	}
	.q {
		margin: 0 0 8px;
		font-weight: 700;
		font-size: 1.05rem;
	}
	.theirs {
		margin: 0;
		opacity: 0.82;
	}
	.correct {
		margin: 6px 0 0;
		color: var(--blood);
		font-weight: 700;
	}
	.actions {
		display: flex;
		gap: 12px;
		flex-wrap: wrap;
		margin: 30px 0 max(24px, env(safe-area-inset-bottom));
	}
	.owner { padding-bottom: max(24px, env(safe-area-inset-bottom)); }
	.remove {
		background: none;
		border: 2px solid var(--blood);
		color: var(--blood);
		padding: 9px 14px;
		font: inherit;
		font-size: 0.78rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		cursor: pointer;
	}
	.remove:disabled { opacity: 0.5; cursor: default; }
	.removed { color: var(--gold); font-weight: 700; }
	.report { margin-top: 18px; font-size: 0.8rem; opacity: 0.6; }
</style>
