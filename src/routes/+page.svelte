<svelte:head>
	<title>amitheidiot</title>
	<meta name="description" content="amitheidiot — are you smarter than an idiot? find out soon." />
	<meta name="theme-color" content="#16130E" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@400;500;700&family=GFS+Didot&display=swap"
		rel="stylesheet"
	/>
	<style>
		:root {
			--bg: #16130e;
			--ink: #f1ece0;
			--blood: #ff5a5f;
			--gold: #e5c158;
			--aegean: #6c8cff;
			--muted: rgba(241, 236, 224, 0.55);
		}

		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}

		html,
		body {
			height: 100%;
		}

		body {
			background: var(--bg);
			color: var(--ink);
			font-family: 'Space Grotesk', sans-serif;
			overflow: hidden;
		}

		/* paper-grain noise */
		body::before {
			content: '';
			position: fixed;
			inset: 0;
			z-index: 0;
			pointer-events: none;
			opacity: 0.5;
			background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.35 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");
		}

		.teaser {
			position: relative;
			z-index: 1;
			height: 100vh;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			gap: 1.4rem;
			padding: 1.25rem;
			text-align: center;
		}

		/* floating greek letters */
		.float {
			position: absolute;
			font-family: 'GFS Didot', serif;
			color: var(--aegean);
			opacity: 0.07;
			user-select: none;
			pointer-events: none;
			animation: floaty 14s ease-in-out infinite;
		}

		@keyframes floaty {
			0%,
			100% {
				transform: translateY(0) rotate(0deg);
			}
			50% {
				transform: translateY(-26px) rotate(4deg);
			}
		}

		.mark {
			font-family: 'Anton', sans-serif;
			line-height: 0.95;
			letter-spacing: -0.01em;
			font-size: clamp(3.2rem, 15vw, 11rem);
			color: var(--ink);
			text-shadow: 0.055em 0.055em 0 rgba(0, 0, 0, 0.5);
			animation: rise 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) both;
		}

		.mark .idiot {
			color: var(--blood);
		}

		.question {
			font-family: 'Space Grotesk', sans-serif;
			font-size: clamp(1.05rem, 3.4vw, 2rem);
			font-weight: 500;
			letter-spacing: 0.02em;
			color: var(--ink);
			animation: rise 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s both;
		}

		.question .idiot {
			color: var(--blood);
		}

		.soon {
			font-family: 'Space Grotesk', sans-serif;
			font-size: clamp(1rem, 3vw, 1.6rem);
			font-weight: 500;
			letter-spacing: 0.32em;
			text-transform: lowercase;
			color: var(--gold);
			animation: rise 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.55s both;
		}

		.soon i {
			display: inline-block;
			animation: blink 2.6s ease-in-out infinite;
			font-style: normal;
		}

		@keyframes blink {
			0%,
			100% {
				opacity: 1;
			}
			50% {
				opacity: 0.2;
			}
		}

		.hint {
			font-family: 'GFS Didot', serif;
			font-size: clamp(0.7rem, 1.8vw, 0.95rem);
			color: var(--muted);
			letter-spacing: 0.18em;
			animation: rise 1.1s ease 0.7s both;
		}

		@keyframes rise {
			from {
				opacity: 0;
				transform: translateY(18px);
			}
			to {
				opacity: 1;
				transform: none;
			}
		}

		/* discreet warm-up link so the quiz isn't orphaned */
		.warmup {
			position: fixed;
			bottom: 1.1rem;
			right: 1.3rem;
			font-size: 0.72rem;
			font-weight: 500;
			letter-spacing: 0.08em;
			text-transform: uppercase;
			color: var(--muted);
			opacity: 0.5;
			text-decoration: none;
			transition: opacity 0.2s, color 0.2s;
		}

		.warmup:hover {
			opacity: 1;
			color: var(--ink);
		}

		@media (prefers-reduced-motion: reduce) {
			.float,
			.soon i {
				animation: none;
			}
			.mark,
			.question,
			.soon,
			.hint {
				animation: none;
			}
		}
	</style>
</svelte:head>

<main class="teaser">
	<span class="float" style="top:12%; left:10%; font-size:5rem; animation-delay:0s">ἰ</span>
	<span class="float" style="top:70%; left:16%; font-size:3rem; animation-delay:1.8s">δ</span>
	<span class="float" style="top:20%; right:14%; font-size:4rem; animation-delay:0.9s">ι</span>
	<span class="float" style="top:74%; right:9%; font-size:5.5rem; animation-delay:2.6s">ώ</span>
	<span class="float" style="top:44%; left:44%; font-size:2.8rem; animation-delay:1.2s">τ</span>
	<span class="float" style="top:84%; left:40%; font-size:3.4rem; animation-delay:2s">η</span>

	<h1 class="mark">am<span style="color: #3C3B6E">i</span>the<span class="idiot">idiot</span></h1>

	<p class="question">are you smarter than an <span class="idiot">idiot?</span></p>

	<p class="soon">find out soon<i>.</i></p>

	<p class="hint">ἰδιώτης &nbsp;·&nbsp; Constitution Day &nbsp;·&nbsp; Sept 17, 2026</p>
</main>
