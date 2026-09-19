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
	<title>H.R. ____ — Public Affiliation and Uniformity Disclosure Act</title>
	<meta name="description" content="A bill before the 120th Congress." />
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
				<p class="hr">H. R. ____</p>

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
		width: min(880px, calc(100% - 32px));
		margin: 28px auto 64px;
		position: relative;
		background-color: #e7dcc0;
		background-image: url('/images/bill/parchment.webp');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		box-shadow:
			/* inner shading down each long edge, so the sheet curves away */
			inset 26px 0 34px -26px rgba(74, 55, 28, 0.5),
			inset -26px 0 34px -26px rgba(74, 55, 28, 0.5),
			/* aged, slightly darker top and bottom margins */
			inset 0 42px 46px -40px rgba(74, 55, 28, 0.45),
			inset 0 -42px 46px -40px rgba(74, 55, 28, 0.45),
			/* separation from the black ground */
			0 18px 48px rgba(0, 0, 0, 0.72);
	}

	/* Wooden rollers.
	   A cylinder needs an ASYMMETRIC highlight: a narrow, bright specular band
	   ABOVE the vertical centre, a broad soft falloff below it, and dark edges
	   top and bottom. The first version put a symmetric three-stop ramp at 25/50/75
	   which produced a flat metallic stripe — a painted band, not a turned dowel.
	   These stops are placed off-centre (bright at 38%, mid-falloff at 52-70%) to
	   sell the curvature, and the grain runs along the shaft as a repeat-x
	   gradient so it does not read as injection-moulded plastic. */
	.bill-paper::before,
	.bill-paper::after {
		content: '';
		position: absolute;
		left: -3%;
		right: -3%;
		height: 28px;
		border-radius: 14px;
		background-image:
			/* the specular band */
			linear-gradient(
				180deg,
				rgba(0, 0, 0, 0.66) 0%,
				rgba(70, 42, 18, 0.35) 12%,
				rgba(150, 100, 52, 0.1) 26%,
				rgba(236, 196, 138, 0.42) 38%,
				rgba(176, 126, 70, 0.16) 50%,
				rgba(92, 58, 26, 0.34) 70%,
				rgba(28, 16, 8, 0.72) 100%
			),
			/* longitudinal grain */
			repeating-linear-gradient(
				90deg,
				rgba(255, 224, 176, 0.05) 0px,
				rgba(0, 0, 0, 0.05) 3px,
				rgba(255, 224, 176, 0.03) 6px,
				rgba(0, 0, 0, 0.04) 9px
			),
			linear-gradient(90deg, #3a2411 0%, #9a6a38 12%, #6d4722 34%, #a87a44 52%, #6d4722 72%, #9a6a38 88%, #3a2411 100%);
		box-shadow:
			inset 0 1px 0 rgba(255, 232, 190, 0.28),
			inset 0 -2px 3px rgba(0, 0, 0, 0.55),
			0 6px 16px rgba(0, 0, 0, 0.75);
		z-index: 2;
	}
	.bill-paper::before { top: -14px; }
	.bill-paper::after { bottom: -14px; }

	/* End caps: a small circle at each end of each roller, so the dowel reads as
	   having a cut face rather than being a floating rounded rectangle. */
	.bill-cap {
		position: absolute;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		z-index: 3;
		pointer-events: none;
		background: radial-gradient(
			circle at 38% 34%,
			#e8c48c 0%,
			#b8874e 34%,
			#7a5228 62%,
			#3d2612 100%
		);
		box-shadow:
			inset 0 0 0 1px rgba(255, 226, 178, 0.22),
			0 5px 12px rgba(0, 0, 0, 0.7);
	}
	.bill-cap--tl { top: -15px; left: -4.2%; }
	.bill-cap--tr { top: -15px; right: -4.2%; }
	.bill-cap--bl { bottom: -15px; left: -4.2%; }
	.bill-cap--br { bottom: -15px; right: -4.2%; }

	@media (max-width: 620px) {
		.bill-cap { width: 24px; height: 24px; }
		.bill-cap--tl, .bill-cap--tr { top: -12px; }
		.bill-cap--bl, .bill-cap--br { bottom: -12px; }
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
