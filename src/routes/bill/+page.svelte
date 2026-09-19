<script lang="ts">
	// ---------------------------------------------------------------------------
	// /bill — the Public Affiliation and Uniformity Disclosure Act.
	//
	// Deliberately NOT linked from anywhere on the site. It is reached only by
	// direct URL, so it never appears in the site's own navigation, sitemap or
	// link graph; the only way in is a link somebody shares on purpose.
	//
	// The whole page is one scroll document, which is the one departure from the
	// app shell (every other route is a fixed viewport with an internal scroll
	// region — see .screen / .screen-body in app.css). That is intentional here:
	// a bill is a long piece of paper and should read as one continuous object
	// rather than a paged screen. The chrome (wordmark bar) stays fixed.
	// ---------------------------------------------------------------------------
</script>

<svelte:head>
	<title>H.R. 1 — Public Affiliation and Uniformity Disclosure Act</title>
	<meta name="description" content="H.R. 1 — a bill before the 120th Congress requiring anyone who voted for Trump three times to wear a MAGA hat in public." />
	<!-- Deliberately unindexed: this page is share-by-link only. -->
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<main class="screen bill-screen">
	<header class="app-bar wrap">
		<a class="wordmark" href="/">am<span class="accent">i</span>the<span class="blood">idiot</span></a>
	</header>

	<div class="screen-body bill-scroll">
		<div class="bill-paper">
			<article class="bill-doc">
				<p class="cong">120TH CONGRESS</p>
				<p class="cong">1ST SESSION</p>
								<!-- H.R. 1 is the number a Congress RESERVES for the first bill
				     introduced and the majority leadership's top priority — it is not
				     a placeholder, it is the most prominent slot on the calendar. Left
				     as the real designation so the page reads as the flagship, not as
				     a draft waiting for a number. -->
				<p class="hr">H. R. 1</p>

				<p class="purpose">
					To require anyone who voted for Trump three times to wear a MAGA hat in
					public, and to punish them if they do not.
				</p>

				<hr class="rule-thin" />

				<p class="center bold">IN THE HOUSE OF REPRESENTATIVES</p>
				<p class="center date">_____________</p>
				<p class="center bold">A BILL</p>

				<p class="enacting">
					Be it enacted by the Senate and House of Representatives of the United
					States of America in Congress assembled,
				</p>

				<h2 class="sec">SECTION 1. SHORT TITLE.</h2>
				<p>
					This Act may be cited as the <em>&ldquo;Public Affiliation and Uniformity
					Disclosure Act&rdquo;</em>.
				</p>

				<h2 class="sec">SECTION 2. WHO IS A &ldquo;TRIPLE TRUMPER&rdquo;.</h2>
				<p>
					<strong>(a) The definition.</strong>&mdash;A &ldquo;triple trumper&rdquo; is
					anyone who voted for Donald J. Trump three times.
				</p>
				<p>
					<strong>(b) The three votes.</strong>&mdash;Those votes are the 2016, 2020,
					and 2024 presidential elections. If you voted for him in all three, you are
					a triple trumper.
				</p>
				<p>
					<strong>(c) No arguing about it.</strong>&mdash;There is no hearing, no
					appeal, and no way to opt out. Either you voted for him all three times, or
					you did not.
				</p>

				<h2 class="sec">SECTION 3. WHY THIS BILL.</h2>
				<p>The Congress finds the following:</p>
				<ol class="findings">
					<li>
						Some people are born with a face, a skin colour, or a body they cannot
						hide when they go out in public.
					</li>
					<li>
						People who voted for Trump three times can hide that fact any time they
						want.
					</li>
					<li>
						So a triple trumper can be hired, served, and befriended without anyone
						knowing what they are &mdash; while everyone else is stuck showing who they
						are.
					</li>
					<li>
						That is not fair. Triple trumpers should have to show it too.
					</li>
				</ol>

				<h2 class="sec">SECTION 4. WHAT A TRIPLE TRUMPER MUST DO.</h2>
				<p>
					<strong>(a) The rule.</strong>&mdash;A triple trumper must wear an official
					Make America Great Again (MAGA) hat on their head, clearly visible, at all
					times in public.
				</p>
				<p>
					<strong>(b) What counts as public.</strong>&mdash;Roads, sidewalks, parks,
					government buildings, buses and trains, stores, churches, schools, polling
					places, and anywhere else the general public is allowed.
				</p>
				<p>
					<strong>(c) The yard sign.</strong>&mdash;A triple trumper must also display a
					sign on the front lawn, or at the public entrance of their home, facing the
					street and large enough to be read from the sidewalk. The sign must identify
					them as a triple trumper and must stay up at all times.
				</p>
				<p>
					<strong>(d) No exceptions.</strong>&mdash;Not for weather. Not for work. Not
					for a medical condition. Not for religious reasons. Not even when their own
					children are with them.
				</p>

				<h2 class="sec">SECTION 5. PENALTIES AND ENFORCEMENT.</h2>
				<p>
					<strong>(a) First time.</strong>&mdash;A $1,776 fine.
				</p>
				<p>
					<strong>(b) Second time.</strong>&mdash;A criminal misdemeanour charge, a
					court date, and whatever fine or jail time the court decides.
				</p>
				<p>
					<strong>(c) Third time and after.</strong>&mdash;A felony, and up to five
					years in prison.
				</p>
				<p>
					<strong>(d) If you deny it.</strong>&mdash;If an officer suspects you are a
					triple trumper and you say you are not, you must authorise the release of
					your voter records so they can be checked. Refusing to authorise that
					release is itself a criminal offence, and you may be charged.
				</p>
				<p>
					<strong>(e) Who enforces this.</strong>&mdash;The Attorney General appoints
					officers who can decide on sight whether someone is breaking this law, and
					who can demand ID to check.
				</p>
				<p>
					<strong>(f) The PATRIOT Registry.</strong>&mdash;The Secretary maintains a
					public registry called the PATRIOT Registry &mdash; the <strong>P</strong>ublic
					<strong>A</strong>ffiliation <strong>T</strong>racking,
					<strong>R</strong>egistration, and <strong>I</strong>dentification
					<strong>O</strong>f <strong>T</strong>rumpers. It lists everyone found
					breaking this law, and the Secretary publishes it every three months.
				</p>

				<h2 class="sec">SECTION 6. SEVERABILITY.</h2>
				<p>
					If any part of this Act is struck down as invalid or unconstitutional, the
					rest of it stays in force.
				</p>

				<hr class="rule-thin" />
				<p class="center stamp">INTRODUCED</p>

				<p class="satire">
					This is satire. It is not a real bill, and it is not law.
				</p>
			</article>
		</div>
	</div>
</main>

<style>
	/* ---- the paper ------------------------------------------------------- */
	.bill-screen {
		background: #0b0a08;
	}

	.bill-paper {
		width: min(920px, 100% - 32px);
		margin-block: 40px 72px;
		margin-inline: auto;
		--s: 0.55;

		/* BORDER-IMAGE, not background. That is what keeps the rollers round:
		   this page is ~2900px tall against artwork that is 1056px, and a
		   background-size:100% 100% would stretch the rollers 2.7x vertically
		   into ellipses. border-image draws the roller slices at a fixed size
		   and stretches only the middle.

		   Slice values are measured from the artwork (828x1056): the top roller
		   ends and the parchment starts at y=175; the parchment ends at y=885
		   and the bottom roller follows; the parchment body spans x=200..628. */
		border-style: solid;
		border-width: calc(175px * var(--s)) calc(200px * var(--s))
		              calc(171px * var(--s)) calc(200px * var(--s));
		border-image-source: url('/images/bill/scroll-bg.webp');
		border-image-slice: 175 200 171 200 fill;
		border-image-width: calc(175px * var(--s)) calc(200px * var(--s))
		                    calc(171px * var(--s)) calc(200px * var(--s));
		/* stretch, not round: the middle slice has been smoothed in the source
		   (see the note in the image itself) so stretching it is invisible,
		   whereas repeating it would tile the same wash down a long page. */
		border-image-repeat: stretch;
		position: relative;
	}

	/* Reserve the scrollbar strip on both edges so centring is honest. */
	.bill-scroll {
		scrollbar-gutter: stable both-edges;
		scrollbar-color: rgba(36, 23, 8, 0.45) transparent;
	}
	.bill-scroll::-webkit-scrollbar-thumb { background: rgba(36, 23, 8, 0.45); }

	@media (max-width: 620px) {
		.bill-paper { width: calc(100% - 16px); --s: 0.30; margin-block: 24px 48px; }
	}

	/* ---- the document ---------------------------------------------------- */
	.bill-doc {
		position: relative;
		/* The torn parchment edge and the rollers are drawn by the border now,
		   so this is only the breathing room BETWEEN the ink and that edge —
		   not the page margin, which is what the old 88px side padding was
		   standing in for. Kept small on purpose so the text stays large. */
		padding: clamp(10px, 2vw, 26px) clamp(6px, 1.5vw, 18px) clamp(24px, 4vw, 52px);
		color: #241708;
		font-family: 'Times New Roman', Times, Georgia, serif;
		font-size: clamp(1.12rem, 1.9vw, 1.34rem);
		line-height: 1.68;
	}

	.cong,
	.hr,
	.center { text-align: center; }

	.cong {
		margin: 0;
		font-weight: 700;
		font-size: clamp(1.2rem, 2vw, 1.42rem);
		letter-spacing: 0.07em;
	}

	.hr {
		margin: 14px 0 22px;
		font-weight: 700;
		font-size: clamp(1.25rem, 2.2vw, 1.5rem);
		letter-spacing: 0.16em;
	}

	.purpose {
		margin: 0 0 26px;
		text-align: justify;
		text-indent: 2.2em;
	}

	.rule-thin {
		border: 0;
		border-top: 1px solid rgba(58, 40, 18, 0.5);
		margin: 26px 0;
	}

	.bold { font-weight: 700; }
	.date { margin: 8px 0; letter-spacing: 0.2em; opacity: 0.6; }

	.enacting {
		margin: 26px 0 30px;
		text-align: justify;
		text-indent: 2.2em;
	}

	.sec {
		margin: 36px 0 15px;
		font-size: clamp(1.18rem, 2vw, 1.4rem);
		font-weight: 700;
		letter-spacing: 0.02em;
		/* Section headings are set flush-left in a bill, not centred — the
		   centred headings are the Congress/session block at the top only. */
		text-align: left;
	}

	.bill-doc p { margin: 0 0 13px; }

	/* Numbered findings, indented the way a printed bill sets them. */
	.findings {
		margin: 12px 0 0;
		padding-left: 1.9em;
	}
	.findings li { margin-bottom: 11px; text-align: justify; }

	.stamp {
		margin-top: 34px;
		font-size: 0.94rem;
		font-weight: 700;
		letter-spacing: 0.42em;
		color: rgba(140, 30, 30, 0.72);
		border: 2px solid rgba(140, 30, 30, 0.5);
		display: inline-block;
		padding: 8px 18px 8px 22px;
		transform: rotate(-4deg);
	}
	.bill-doc > p.stamp { display: block; width: fit-content; margin-inline: auto; }

	/* The satire note, kept small and quiet on purpose: it has to be present
	   without turning the document into a joke at its own expense. Anyone who
	   screenshots this and crops it out was always going to. */
	.satire {
		margin: 30px 0 0;
		text-align: center;
		font-family: 'Space Grotesk', system-ui, sans-serif;
		font-size: 0.72rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: rgba(60, 40, 18, 0.55);
	}

</style>
