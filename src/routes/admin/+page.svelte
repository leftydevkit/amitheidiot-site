<script lang="ts">
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	const LEVEL_LABEL: Record<number, string> = {
		1: 'the rally',
		2: 'the echo chamber',
		3: 'not maga'
	};

	const secs = (ms: number) => `${(ms / 1000).toFixed(1)}s`;
</script>

<svelte:head>
	<title>amitheidiot — admin</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main class="screen board">
	<div class="screen-body">
		<div class="wrap admin-inner">
			<header class="app-bar">
				<a class="wordmark" href="/">am<span class="accent">i</span>the<span class="blood">idiot</span></a>
				<span class="eyebrow">admin</span>
			</header>

			{#if !data.configured}
				<h1 class="page-title">admin</h1>
				<p class="empty">admin is not configured on this server. set <code>ADMIN_KEY</code> and redeploy.</p>
			{:else if !data.authed}
				<h1 class="page-title">admin</h1>
				<p class="lede">one key. this page is not linked from anywhere.</p>
				<form method="POST" action="?/login" class="login">
					<label class="field">
						<span>key</span>
						<!-- svelte-ignore a11y_autofocus -- the page has exactly one control -->
						<input name="key" type="password" autocomplete="current-password" required autofocus />
					</label>
					<button class="button gold" type="submit">open</button>
					{#if form?.error}<p class="err">{form.error}</p>{/if}
				</form>
			{:else if !data.db}
				<h1 class="page-title">admin</h1>
				<p class="empty">the database is not reachable right now — the runs table cannot be read.</p>
			{:else if data.stats}
				<div class="head-row">
					<h1 class="page-title">the runs</h1>
					<form method="POST" action="?/logout">
						<button class="button secondary" type="submit">lock</button>
					</form>
				</div>

				<section class="stats">
					<div class="stat"><b>{data.stats.total}</b><span>runs</span></div>
					<div class="stat"><b>{data.stats.avgPct}%</b><span>average accuracy</span></div>
					<div class="stat"><b>{data.stats.perfect}</b><span>perfect runs</span></div>
					<div class="stat"><b>{data.stats.tiers.CITIZEN}</b><span>citizen</span></div>
					<div class="stat"><b>{data.stats.tiers.RESIDENT}</b><span>resident</span></div>
					<div class="stat"><b>{data.stats.tiers['IDIŌTĒS']}</b><span>idiōtēs</span></div>
					<div class="stat"><b>{data.stats.tiers.IDIOT}</b><span>idiot</span></div>
				</section>

				<form method="GET" class="filters">
					<label class="field">
						<span>level</span>
						<select name="level">
							<option value="" selected={data.level === null}>all levels</option>
							{#each [1, 2, 3] as lvl}
								<option value={lvl} selected={data.level === lvl}>{LEVEL_LABEL[lvl]}</option>
							{/each}
						</select>
					</label>
					<label class="field grow">
						<span>name or key</span>
						<input name="q" value={data.q} placeholder="alias or run id" />
					</label>
					<button class="button" type="submit">filter</button>
					{#if data.q || data.level !== null}
						<a class="button secondary" href="/admin">reset</a>
					{/if}
				</form>

				{#if data.rows.length === 0}
					<p class="empty">no runs match that. {data.stats.total === 0 ? 'nobody has published one yet.' : ''}</p>
				{:else}
					<p class="hint">
						showing {data.stats.showing} of {data.stats.total}{data.truncated ? ' (newest first)' : ''}.
						click a row to see every answer.
					</p>

					<ol class="runs">
						{#each data.rows as r}
							<li>
								<details class="run">
									<summary>
										<span class="when">{r.when}</span>
										<span class="who">{r.alias ?? 'anonymous'}</span>
										<span class="lvl">{LEVEL_LABEL[r.level] ?? `level ${r.level}`}</span>
										<span class="tier">{r.tier}</span>
										<span class="nums">{r.score}/{r.total} · {r.pct}% · {secs(r.total_ms)}</span>
										<a class="open" href={`/r/${r.id}`} target="_blank" rel="noreferrer">open ↗</a>
									</summary>
									<div class="answers">
										<div class="run-meta">key <code>{r.id}</code> · {r.total_ms} ms total</div>
										{#each r.answers as a}
											<div class="answer" class:wrong={!a.correct}>
												<span class="mark">{a.correct ? '✓' : '✕'}</span>
												<span class="q">{a.prompt}</span>
												<span class="said">
													{a.choice === null ? 'timeout' : a.choice}
												</span>
												<span class="truth">{a.correct ? '' : `correct: ${a.correctChoice}`}</span>
												<span class="ms">{a.timeMs} ms</span>
											</div>
										{/each}
									</div>
								</details>
							</li>
						{/each}
					</ol>
				{/if}

				{#if data.stats.questions.length}
					<section class="qstats">
						<h2>hardest questions</h2>
						<p class="hint">by misses across the runs above. “timeout” means the clock ran out.</p>
						<table>
							<thead>
								<tr><th>question</th><th>asked</th><th>missed</th><th>timeouts</th><th>accuracy</th></tr>
							</thead>
							<tbody>
								{#each data.stats.questions as q}
									<tr>
										<td class="qp">{q.prompt}</td>
										<td class="n">{q.asked}</td>
										<td class="n">{q.missed}</td>
										<td class="n">{q.timeouts}</td>
										<td class="n">{q.accuracy}%</td>
									</tr>
								{/each}
							</tbody>
						</table>
					</section>
				{/if}
			{/if}
		</div>
	</div>
</main>

<style>
	.admin-inner {
		max-width: 1040px;
		padding-top: max(20px, env(safe-area-inset-top));
		padding-bottom: max(40px, env(safe-area-inset-bottom));
	}
	.page-title {
		font-size: min(clamp(2.4rem, 10vw, 5rem), 13vh);
		margin: 18px 0 10px;
	}
	.head-row {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 16px;
	}
	.login {
		display: flex;
		gap: 12px;
		align-items: flex-end;
		flex-wrap: wrap;
		max-width: 520px;
	}
	.field {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	.field span {
		font-size: 0.7rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		opacity: 0.7;
	}
	.field input,
	.field select {
		background: transparent;
		border: 2px solid var(--paper);
		color: inherit;
		padding: 9px 10px;
		font: inherit;
		min-width: 180px;
	}
	.field.grow {
		flex: 1 1 220px;
	}
	.err {
		flex-basis: 100%;
		margin: 0;
		color: var(--blood);
		font-weight: 700;
	}
	.stats {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		gap: 10px;
		margin: 18px 0 22px;
	}
	.stat {
		border: 2px solid rgba(241, 236, 224, 0.24);
		padding: 10px 12px;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.stat b {
		font-family: 'Anton', sans-serif;
		font-size: 1.5rem;
		color: var(--gold);
	}
	.stat span {
		font-size: 0.68rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		opacity: 0.66;
	}
	.filters {
		display: flex;
		gap: 10px;
		align-items: flex-end;
		flex-wrap: wrap;
		margin-bottom: 14px;
	}
	.hint {
		font-size: 0.8rem;
		opacity: 0.66;
		margin: 0 0 8px;
	}
	.empty {
		border: 2px solid var(--paper);
		padding: 20px;
		opacity: 0.85;
	}
	.runs {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.run {
		border-top: 2px solid rgba(241, 236, 224, 0.24);
	}
	.run summary {
		display: grid;
		grid-template-columns: 9.5rem minmax(0, 1fr) 8rem 6rem auto auto;
		gap: 10px;
		align-items: baseline;
		padding: 10px 0;
		cursor: pointer;
		list-style: none;
		overflow-wrap: anywhere;
	}
	.run summary::-webkit-details-marker {
		display: none;
	}
	.when {
		font-size: 0.78rem;
		opacity: 0.55;
		font-variant-numeric: tabular-nums;
	}
	.who {
		font-weight: 700;
	}
	.lvl,
	.tier {
		font-size: 0.7rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		opacity: 0.72;
	}
	.nums {
		text-align: right;
		font-variant-numeric: tabular-nums;
	}
	.open {
		font-size: 0.78rem;
		opacity: 0.8;
	}
	.answers {
		padding: 4px 0 16px;
	}
	.run-meta {
		font-size: 0.74rem;
		opacity: 0.6;
		margin-bottom: 8px;
	}
	.answer {
		display: grid;
		grid-template-columns: 1.4rem minmax(0, 1fr) minmax(0, 0.9fr) minmax(0, 0.9fr) 5rem;
		gap: 8px;
		padding: 5px 0;
		border-top: 1px dashed rgba(241, 236, 224, 0.16);
		font-size: 0.86rem;
		align-items: baseline;
	}
	.answer .mark {
		color: #7ddc9a;
		font-weight: 700;
	}
	.answer.wrong .mark {
		color: var(--blood);
	}
	.answer .q {
		opacity: 0.9;
	}
	.answer .said {
		font-weight: 700;
	}
	.answer.wrong .said {
		text-decoration: line-through;
		text-decoration-color: var(--blood);
	}
	.answer .truth {
		font-size: 0.78rem;
		opacity: 0.7;
	}
	.answer .ms {
		text-align: right;
		font-size: 0.74rem;
		opacity: 0.55;
		font-variant-numeric: tabular-nums;
	}
	.qstats {
		margin-top: 30px;
	}
	.qstats h2 {
		font-size: 1.1rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		margin: 0 0 6px;
	}
	.qstats table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.84rem;
	}
	.qstats th,
	.qstats td {
		border-top: 2px solid rgba(241, 236, 224, 0.24);
		padding: 7px 8px;
		text-align: left;
		vertical-align: top;
	}
	.qstats th {
		font-size: 0.68rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		opacity: 0.66;
	}
	.qstats .n {
		text-align: right;
		font-variant-numeric: tabular-nums;
		white-space: nowrap;
	}
	.qstats .qp {
		max-width: 46ch;
	}
	code {
		font-size: 0.82em;
	}
	@media (max-width: 720px) {
		.run summary {
			grid-template-columns: minmax(0, 1fr) auto;
			gap: 2px 10px;
		}
		.answer {
			grid-template-columns: 1.2rem minmax(0, 1fr);
		}
		.answer .ms {
			text-align: left;
		}
	}
</style>
