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
	<meta name="description" content="H.R. 1 — a bill before the 120th Congress." />
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
					To establish public identification requirements for designated political
					affiliations, to provide for the enforcement of those requirements, and for
					other purposes.
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

				<h2 class="sec">SECTION 2. FINDINGS AND RATIONALE.</h2>
				<p>The Congress finds the following:</p>
				<ol class="findings">
					<li>
						Members of various demographic and minority populations possess innate
						physical characteristics and visual identifiers that cannot be altered,
						concealed, or removed when present in public spaces.
					</li>
					<li>
						Individuals holding specific, distinct political affiliations retain the
						ability to conceal their ideological alignment at will in public settings,
						and to move through the country unrecognised by those around them.
					</li>
					<li>
						This asymmetry permits a member of a designated political affiliation to
						be addressed, employed, served, and befriended without the person opposite
						them knowing what they are.
					</li>
					<li>
						To establish visual parity regarding public identity and disclosure, and to
						ensure that no person may conceal an affiliation of public consequence,
						public identification measures are warranted for designated political
						groups.
					</li>
				</ol>

				<h2 class="sec">SECTION 3. MANDATORY IDENTIFICATION REQUIREMENT.</h2>
				<p>
					<strong>(a) In General.</strong>&mdash;Any individual categorised as a
					&ldquo;triple trumper&rdquo; shall prominently wear an official Make America
					Great Again (MAGA) hat on their head at all times while present in any
					public space.
				</p>
				<!-- "three separate Presidential elections" is the real-world basis for
				     the term: Trump appeared on the general-election ballot in 2016,
				     2020 and 2024, so a "triple trumper" is someone who voted for him
				     in all three. Stated as a definition rather than a list so the bill
				     reads as legislation and not as a comment. -->
				<p>
					<strong>(b) Definition of Triple Trumper.</strong>&mdash;The term
					&ldquo;triple trumper&rdquo; means any individual who has voted for Donald
					J. Trump in three separate Presidential elections.
				</p>
				<p>
					<strong>(c) Public Space Defined.</strong>&mdash;In this section, the term
					&ldquo;public space&rdquo; includes public roads, sidewalks, parks,
					government buildings, transit systems, places of worship, schools, polling
					places, and commercial establishments open to the general public.
				</p>
				<p>
					<strong>(d) No Exception.</strong>&mdash;The requirement under subsection (a)
					applies without regard to weather, occupation, medical condition, religious
					observance, or the presence of a person&rsquo;s own children.
				</p>

				<h2 class="sec">SECTION 4. PENALTIES AND ENFORCEMENT.</h2>
				<p>
					<strong>(a) First Offense.</strong>&mdash;An individual who violates Section
					3(a) for the first time shall be subject to a civil fine of $1,776.
				</p>
				<p>
					<strong>(b) Second Offense.</strong>&mdash;An individual who commits a second
					violation of Section 3(a) shall be charged with a criminal misdemeanour,
					subject to formal court proceedings, applicable criminal fines, or terms of
					detention as determined by law.
				</p>
				<p>
					<strong>(c) Subsequent Offenses.</strong>&mdash;An individual who commits a
					third or subsequent violation of Section 3(a) shall be charged with a felony
					and may be subject to imprisonment for not more than five years.
				</p>
				<p>
					<strong>(d) Enforcement.</strong>&mdash;The Attorney General shall designate
					officers authorised to determine, on sight, whether an individual is in
					compliance, and to demand identification supporting that determination.
				</p>
				<p>
					<strong>(e) Public Reporting.</strong>&mdash;The Secretary shall publish,
					quarterly, a list of individuals determined to be in violation of this
					section.
				</p>

				<h2 class="sec">SECTION 5. SEVERABILITY.</h2>
				<p>
					If any provision of this Act is held invalid or unconstitutional, the
					remainder of the Act shall remain in full force and effect.
				</p>

				<hr class="rule-thin" />
				<p class="center stamp">INTRODUCED</p>
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

		/* BORDER-IMAGE, not background: that is what lets the rollers stay
		   their real size while the parchment stretches to whatever height the
		   bill runs to. A plain background-size:100% 100% would squash the
		   rollers vertically into ellipses as the text grew.
		   Slice values are measured from the artwork (828x1056): the top roller
		   ends at y=132, the bottom roller starts at y=922, and the parchment
		   body runs x=145..680. `fill` is required or the middle is left empty. */
		border-style: solid;
		border-width: calc(132px * var(--s)) calc(148px * var(--s))
		              calc(134px * var(--s)) calc(145px * var(--s));
		border-image-source: url('/images/bill/scroll-bg.webp');
		/* NO `fill`: the middle region is left empty so it takes this element's
		   own background instead of the image's middle slice. With `fill` the
		   790px-tall parchment slice was stretched over ~2900px (3.7x) and the
		   artwork's staining smeared into long vertical streaks — very visible.
		   Tiling it instead would repeat the same stains down the page. A flat
		   wash does neither, and the two tones here are sampled straight from
		   the artwork (upper region srgb(229,186,129), lower srgb(234,197,142))
		   so the fill meets the image's torn edge without a seam. */
		border-image-slice: 132 148 134 145;
		background: linear-gradient(180deg, #e5ba81 0%, #eac48e 60%, #eecb96 100%);
		border-image-width: calc(132px * var(--s)) calc(148px * var(--s))
		                    calc(134px * var(--s)) calc(145px * var(--s));
		/* stretch, not round: the parchment body is a mostly-flat wash with a
		   little staining, so stretching it is invisible, whereas repeating it
		   would tile the stains into an obvious pattern down a long page. */
		border-image-repeat: stretch;
		/* Softens the junction where the flat wash meets the image's torn edge.
		   Without it there is a faint vertical seam: the artwork's parchment
		   carries a little edge shading that a flat fill cannot reproduce. These
		   are insets, so they darken the FILL side of the join and the two read
		   as one surface. */
		box-shadow:
			inset 16px 0 20px -16px rgba(120, 80, 30, 0.30),
			inset -16px 0 20px -16px rgba(120, 80, 30, 0.30);
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

</style>
