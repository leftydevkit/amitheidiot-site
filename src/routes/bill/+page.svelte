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
			<span class="bill-cap bill-cap--tl" aria-hidden="true"></span>
			<span class="bill-cap bill-cap--tr" aria-hidden="true"></span>
			<span class="bill-cap bill-cap--bl" aria-hidden="true"></span>
			<span class="bill-cap bill-cap--br" aria-hidden="true"></span>
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
	/* The texture is one page-sized non-repeating image (see
	   scripts/make-parchment.sh for why it is generated rather than found and
	   why it does not tile). `100% 100%` stretches it to whatever height the
	   document ends up, so the grain never repeats no matter how long the text
	   runs. */
	.bill-screen {
		background: #0b0a08;
	}

	.bill-paper {
		width: min(880px, 100% - 32px);
		/* margin-inline:auto centres within the PADDING BOX of .bill-scroll,
		   which includes the width the scrollbar is about to occupy — so the
		   sheet landed half a scrollbar to the left of true centre (measured:
		   off by 5px at a 10px scrollbar, and it scales with the scrollbar).
		   `scrollbar-gutter: stable both-edges` reserves that strip on BOTH
		   sides, so the centring box and the visible box agree and the sheet is
		   centred on the glass. It also stops the whole page shifting sideways
		   when the content grows past the fold. */
		margin-block: 34px 76px;
		margin-inline: auto;
		position: relative;
		background-color: #e7dcc0;
		background-image: url('/images/bill/parchment.webp');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		box-shadow:
			inset 26px 0 34px -26px rgba(74, 55, 28, 0.5),
			inset -26px 0 34px -26px rgba(74, 55, 28, 0.5),
			inset 0 42px 46px -40px rgba(74, 55, 28, 0.45),
			inset 0 -42px 46px -40px rgba(74, 55, 28, 0.45),
			0 18px 48px rgba(0, 0, 0, 0.72);
	}

	/* Reserve the scrollbar strip on both edges so centring is honest. */
	.bill-scroll {
		scrollbar-gutter: stable both-edges;
	}

	/* ---- the wooden rollers ------------------------------------------------
	   SCALE IS THE THING THAT WAS WRONG. The first version was 28px tall on an
	   880px sheet — a 1:31 ratio. A real dowel on a document this wide is about
	   1:11, so at 28px it read as a cocktail stick with two beads glued on, which
	   is why it looked wrong no matter how the gradient was tuned. Now 46px and
	   overhanging 34px a side, so it reads as a rod the paper hangs from rather
	   than a rail the paper sits inside.

	   The overhang is a fixed px on each side (negative left/right), NOT a
	   percentage: a percentage grows absurdly wide on a large monitor and
	   collapses to nothing on a phone, so the roller would be proportional to
	   the screen instead of to the document.

	   CAP ALIGNMENT: a cap must sit on the shaft's CENTRE-LINE, not beside it.
	   The shaft is top:-23px with height:46px, so its centre-line is exactly at
	   the paper's top edge (0). A 54px cap therefore needs top:-27px (half its
	   own height), NOT -23 — using the shaft's own offset put the caps 11px high
	   and they floated above the rod like beads on a wire. Horizontally the cap
	   centre sits at -(overhang + C/2 - C/2 + 4) = -65px: at -61 the cap's inner
	   edge lands exactly flush with the shaft's end and reads as a separate disc
	   abutting it, so it is pushed 4px further out to actually cap the rod. */
	.bill-paper::before,
	.bill-paper::after {
		content: '';
		position: absolute;
		left: -34px;
		right: -34px;
		height: 46px;
		border-radius: 23px;
		background-image:
			/* lighting: dark top edge, specular above centre, long falloff */
			linear-gradient(
				180deg,
				rgba(24, 13, 6, 0.85) 0%,
				rgba(58, 34, 15, 0.55) 9%,
				rgba(122, 80, 40, 0.2) 20%,
				rgba(238, 202, 148, 0.5) 33%,
				rgba(212, 168, 110, 0.34) 44%,
				rgba(150, 104, 56, 0.3) 60%,
				rgba(74, 46, 20, 0.55) 80%,
				rgba(26, 14, 6, 0.85) 100%
			),
			/* grain along the shaft, fine and irregular */
			repeating-linear-gradient(
				90deg,
				rgba(255, 226, 178, 0.055) 0px,
				rgba(46, 26, 11, 0.06) 2px,
				rgba(255, 226, 178, 0.03) 5px,
				rgba(46, 26, 11, 0.05) 8px,
				rgba(255, 226, 178, 0.045) 11px
			),
			/* base wood tone across the length */
			linear-gradient(90deg, #4a2d14 0%, #8a5c2e 8%, #7a5128 26%, #9c6b38 50%, #7a5128 74%, #8a5c2e 92%, #4a2d14 100%);
		box-shadow:
			inset 0 2px 2px rgba(255, 236, 200, 0.16),
			inset 0 -3px 5px rgba(0, 0, 0, 0.5),
			0 10px 22px rgba(0, 0, 0, 0.8);
		z-index: 2;
	}
	.bill-paper::before { top: -23px; }
	.bill-paper::after { bottom: -23px; }

	/* Cut end grain. Centred on the shaft's end (see the alignment note above),
	   and shaded from the same warm mid-tone so the two join rather than
	   looking assembled: 54px across against a 46px shaft, so the cap slightly
	   foreshortens the rod exactly as a turned dowel's face does. */
	.bill-cap {
		position: absolute;
		width: 54px;
		height: 54px;
		border-radius: 50%;
		z-index: 3;
		pointer-events: none;
		background:
			radial-gradient(
				circle at 36% 30%,
				#e2bd8a 0%,
				#c1914f 22%,
				#9a6c34 46%,
				#6b4622 70%,
				#3b2310 100%
			);
		box-shadow:
			inset 0 0 0 1px rgba(255, 228, 184, 0.16),
			inset 0 -3px 6px rgba(0, 0, 0, 0.45),
			0 8px 18px rgba(0, 0, 0, 0.75);
	}
	.bill-cap--tl { top: -27px; left: -65px; }
	.bill-cap--tr { top: -27px; right: -65px; }
	.bill-cap--bl { bottom: -27px; left: -65px; }
	.bill-cap--br { bottom: -27px; right: -65px; }

	@media (max-width: 620px) {
		.bill-paper::before,
		.bill-paper::after { height: 30px; border-radius: 15px; left: -20px; right: -20px; }
		.bill-paper::before { top: -15px; }
		.bill-paper::after { bottom: -15px; }
		.bill-cap { width: 36px; height: 36px; }
		.bill-cap--tl { top: -18px; left: -38px; }
		.bill-cap--tr { top: -18px; right: -38px; }
		.bill-cap--bl { bottom: -18px; left: -38px; }
		.bill-cap--br { bottom: -18px; right: -38px; }
	}

	/* ---- the document ---------------------------------------------------- */
	.bill-doc {
		position: relative;
		padding: clamp(46px, 7vw, 84px) clamp(28px, 8vw, 88px) clamp(56px, 8vw, 96px);
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

	@media (max-width: 620px) {
		.bill-paper { width: calc(100% - 20px); margin: 20px auto 44px; }
		.bill-doc { font-size: 1.1rem; }
	}

	/* The paper is a fixed light colour while the rest of the site is dark, so
	   the scrollbar needs to stay visible against it. */
	.bill-scroll { scrollbar-color: rgba(36, 23, 8, 0.45) transparent; }
	.bill-scroll::-webkit-scrollbar-thumb { background: rgba(36, 23, 8, 0.45); }
</style>
