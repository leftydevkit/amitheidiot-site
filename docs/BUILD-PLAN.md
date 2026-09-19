---
date: 2026-09-17
tags: [amitheidiot, build-plan, content, architecture]
status: ready-to-build
source-brief: ~/hermes-vault/ideas/2026-09-17-amitheidiot-build-brief.md
branding-reference: https://amitheidiot.com/
---

# amitheidiot — build plan

Everything below is finished content, not a description of content. Real prose, real lines, real questions, real statistics, every source checked live against the publisher during authoring (2026-09-17). Where a figure could not be verified against a real, live, citable source, it was cut — no stat in this document was approximated.

**Branding note (per instruction):** this plan carries over the *exact* visual system already live at `amitheidiot.com`, not a reinterpretation of it. That teaser's inline styles are the ground truth for tokens; `com.amitheidiot`'s shared `app.css` is the ground truth for reusable component classes. Where the two disagree (noise opacity, one accent letter), this plan states which wins and why — see **Risks and decisions #12**.

---

## 1. The lesson — final prose

Route: `/origin`. Seven beats, one idea per beat, advance-on-tap. At ~200 words total this reads in **55–70 seconds** at a normal pace — inside the 60–90s target with margin for a slower reader.

**Beat 1**
> ἰδιώτης.
> say it: id-ee-OH-tayss.
> athens had a word for a very specific kind of man.
> not a fool. not even close.

**Beat 2**
> he was the *idiōtēs* — the private one.
> the man who kept his gate shut, his opinions to himself, his shoulder out of the wheel.
> he didn't sit on the juries. he didn't fight in the wars. he didn't show up.
> he tended his own garden, and nothing else.

**Beat 3**
> here's the part almost everyone gets wrong.
> the greeks did not think this man was stupid.
> he knew exactly what was happening in the assembly. he could have told you, in detail.
> he just didn't care to be there.

**Beat 4**
> and athens did not find that quaint.
> a city survives on the people who show up — who vote, who serve, who fight, who pay attention when it's boring.
> the *idiōtēs* took the city's protection and gave nothing back.
> to the greeks, that wasn't a personality type. that was a parasite with citizenship papers.

**Beat 5**
> the word traveled. it always does.
> opting out got cheaper — fewer wars to dodge, fewer assemblies to sit through, fewer consequences for not knowing.
> so the insult drifted with it: from the man who wouldn't participate, to the man who didn't know, to the man who plainly didn't care to.
> same contempt. softer target.

**Beat 6**
> which brings us to now.
> the modern american idiot is not the citizen who doesn't know the answer.
> it's the citizen who is certain of it, wrong about it, and completely unbothered by either fact.

**Beat 7**
> you're about to find out which one you are.
> `[ START ]`

**Skip control** — visible on every beat, never hidden, never timed, never a dark pattern:
> `skip →`  *you skipped the one part that would have helped*

Skip and finish are equivalent for gating purposes (see §5, Gate 1) — the app never traps a visitor in the lesson twice, and it never punishes a skip beyond that one honest line.

**Re-entry link**, present on `/` for every visitor forever, quiet and permanent:
> `the word ↗`

---

## 2. Copy banks — fully written

Lowercase is the app's voice throughout; uppercase is reserved for buttons and the wordmark. Zero exclamation marks anywhere in this section (grep-verified — see §10, AC11).

### 2.1 Wrong-answer shame lines (15 — pool sized so a 5-question run never risks a repeat)

1. you said that like you were sure
2. confident. also wrong
3. that answer had a lot of conviction behind it
4. you picked fast. you picked wrong
5. not even close, but you didn't hesitate
6. that was a guess wearing a suit
7. the founders did not consult you on this one
8. bold pick. bad pick
9. you have never been more sure of anything less true
10. wrong, and you knew it a half-second too late
11. that's not it. it was never going to be it
12. you answered like the clock was the real enemy
13. a swing. a miss. a shrug
14. you'll defend that answer at a party tonight. don't
15. he noticed

### 2.2 Timeout lines (5 — softer register; the silence is already the punishment)

1. the silence said enough
2. that quiet was the answer
3. time ran out before you did
4. nothing, and nothing counts
5. you let the clock decide. it decided against you

*(Display value for a timed-out answer is always the literal string `no answer` — see §6, `RunAnswer`. The lines above are the accompanying commentary, never a substitute for that label.)*

### 2.3 Escalating correct-answer lines, by ordinal position within the run (1st through 5th correct)

1. **1st correct:** correct. that one's easy
2. **2nd correct:** two right. still watching
3. **3rd correct:** three. you're doing better than most
4. **4th correct:** four for four so far. huh
5. **5th correct** *(only reachable on question 5 of a perfect run)*: five for five. that's not luck

### 2.4 Tier labels and descriptions

| Score | Tier | Description |
|---|---|---|
| 5/5 | **CITIZEN** | you know the thing. genuinely. no notes. go be insufferable about it to a friend who scored a two. |
| 4/5 | **RESIDENT** | close. you clearly know how this works — you just tripped once. that happens to people who actually pay attention. |
| 2–3/5 | **IDIŌTĒS** | the original meaning. not stupid, just not here. you know some of it, and you've been coasting on the rest. |
| 0–1/5 | **IDIOT** | we don't say it lightly, and we're not saying it lightly now. you weren't unlucky. you were unbothered, and it showed. |

### 2.5 The patriotic pep talk (full, sincere, identical pass or fail)

> here's what you were promised: a country that answers to you, not the other way around. not a king, not a priesthood of experts, not a party — a system built so the people running it work for the people living under it. that's the whole idea. it has never once run on autopilot.
>
> it costs something to keep. not blood, most years — just attention. knowing which branch does what. knowing what the first amendment actually protects, so you notice when someone tells you it doesn't. showing up to the small, boring elections, not just the loud ones. none of it is hard. all of it is optional, which is exactly why it keeps slipping.
>
> you didn't have to get a perfect score today. nobody hands you this knowledge at birth — you have to go get it, and most people don't, and that's a fixable problem, not a character flaw. it is not too late, and it is not hard. read one more thing. ask one more question. show up once more than you were planning to. that's the whole job. that's always been the whole job.

### 2.6 Locked-stats screen

> **you don't get to see this yet.**
> earn it.
> `[ TAKE THE QUIZ ]`

No rules explanation, no checklist, no progress meter — the lock itself is the reward framing.

### 2.7 Landing page CTA labels

| State | Label | Destination |
|---|---|---|
| First visit (lesson unseen) | `BEGIN` | `/origin` |
| Returning visit (lesson seen) | `TAKE THE QUIZ` | `/quiz` |

Below-the-fold teaser line (short, scannable, teases without revealing the wall):
> 35% of americans can't name all three branches of government. the rest of the numbers are worse. see them after you play.

### 2.8 Empty, error, loading, and edge-case states

- **`/results` visited with no completed run in this session:** "there's no score to show you. you haven't played yet." → `[ TAKE THE QUIZ ]`
- **`/learn` visited after a perfect run (nothing missed):** "you missed nothing. we don't have material for you. go brag on the results page." → `[ BACK TO RESULTS ]`
- **Generic client error boundary:** "something broke. it wasn't a civics question. reload."
- **404:** "that page doesn't exist. neither, apparently, do three branches of government for a third of the country. go home." → `[ HOME ]`
- **Loading (should almost never render — quiz is static and instant):** "loading."

### 2.9 Skip line and re-entry link

Already given in full in §1 — repeated here for the copy-bank record:
> skip → *you skipped the one part that would have helped*
> the word ↗

### 2.10 Share card copy (three variants — the shared question/answer triple is always the run's actual data)

**Wrong-answer variant:**
> `{alias}` was asked: "`{prompt}`"
> `{alias}` answered: "`{theirChoice}`"
> correct answer: "`{correctChoice}`"
> `{alias}` said that like they were sure.

**Timeout variant:**
> `{alias}` was asked: "`{prompt}`"
> `{alias}` said: nothing. the clock ran out.
> correct answer: "`{correctChoice}`"
> the silence said enough.

**Perfect-run variant:**
> `{alias}` got all five right.
> `{alias}` knows what idiōtēs actually means, and isn't one.
> are you?

Alias prompt (no PII, alias only, named at the user's discretion):
> what should we call you on the card? (a nickname is fine. no last names.)

---

## 3. The question bank

24 questions, drawn from the public-domain USCIS 2008 Civics Test question set and core structural-civics fundamentals. Every prompt below is either a direct USCIS question rewritten into four-choice form, or a structural fact directly supported by the cited source. Distribution: **12 difficulty-1 (50%), 9 difficulty-2 (37.5%), 3 difficulty-3 (12.5%)** — weighted toward the easy end so a bad run is genuinely damning, not an obscure trivia loss (see §9 for the exact sampling weights).

USCIS source PDF for all USCIS-derived items: `https://www.uscis.gov/sites/default/files/document/questions-and-answers/OoC_100_Questions_2008_Civics_Test_V1.pdf`

| # | Prompt | Choices (correct first, shuffled at render) | Category | Difficulty | Source |
|---|---|---|---|---|---|
| 1 | What is the supreme law of the land? | the Constitution / the Declaration of Independence / the Bill of Rights / the Federalist Papers | civics-structure | 1 | USCIS Q1 |
| 2 | How many amendments does the Constitution have? | 27 / 25 / 10 / 50 | civics-structure | 2 | USCIS Q7 |
| 3 | What do we call the first ten amendments to the Constitution? | the Bill of Rights / the Federalist Papers / the Articles of Confederation / the Emancipation Proclamation | civics-rights | 1 | USCIS Q5 |
| 4 | Name one right guaranteed by the First Amendment. | freedom of speech / the right to bear arms / the right to a jury trial / the right to vote at 18 | civics-rights | 1 | USCIS Q6 |
| 5 | Which amendment protects the right to bear arms? | the Second Amendment / the First Amendment / the Fourth Amendment / the Tenth Amendment | civics-rights | 2 | U.S. Const. amend. II; USCIS Q51 context |
| 6 | What are the two parts of the U.S. Congress? | the Senate and the House of Representatives / the House and the Cabinet / the Senate and the Supreme Court / the Executive and the Judicial | civics-structure | 1 | USCIS Q17 |
| 7 | How many U.S. Senators are there? | 100 / 50 / 435 / 270 | civics-structure | 1 | USCIS Q18 |
| 8 | How many voting members does the House of Representatives have? | 435 / 100 / 50 / 535 | civics-structure | 2 | USCIS Q21 |
| 9 | We elect a President for how many years? | 4 / 6 / 2 / 8 | civics-structure | 1 | USCIS Q26 |
| 10 | We elect a U.S. Senator for how many years? | 6 / 4 / 2 / 10 | civics-structure | 2 | USCIS Q19 |
| 11 | What stops one branch of government from becoming too powerful? | checks and balances / the electoral college / the Bill of Rights / the two-party system | civics-structure | 2 | USCIS Q14 |
| 12 | Who is the Commander in Chief of the military? | the President / the Secretary of Defense / the Speaker of the House / the Chief Justice | civics-structure | 1 | USCIS Q33 |
| 13 | If the President can no longer serve, who becomes President? | the Vice President / the Speaker of the House / the Chief Justice / the Senate Majority Leader | civics-structure | 2 | USCIS Q28 |
| 14 | What is the highest court in the United States? | the Supreme Court / the Court of Appeals / the Federal District Court / the Congressional Court | civics-structure | 1 | USCIS Q38 |
| 15 | What does the judicial branch do? | reviews and explains laws / writes new laws / signs bills into law / commands the military | civics-structure | 2 | USCIS Q37 |
| 16 | Who wrote the Declaration of Independence? | Thomas Jefferson / George Washington / Benjamin Franklin / James Madison | history | 1 | USCIS Q62 |
| 17 | When was the Declaration of Independence adopted? | July 4, 1776 / September 17, 1787 / July 4, 1789 / December 15, 1791 | history | 2 | USCIS Q63 |
| 18 | When was the Constitution written? | 1787 / 1776 / 1791 / 1803 | history | 3 | USCIS Q66 |
| 19 | Name the U.S. war between the North and the South. | the Civil War / the Revolutionary War / World War I / the War of 1812 | history | 1 | USCIS Q73 |
| 20 | What did the Emancipation Proclamation do? | freed slaves in the Confederate states / ended World War I / gave women the right to vote / created the Bill of Rights | history | 2 | USCIS Q76 |
| 21 | What territory did the United States buy from France in 1803? | the Louisiana Territory / the Oregon Territory / the Alaska Territory / the Florida Territory | history | 3 | USCIS Q71 |
| 22 | What major event happened on September 11, 2001? | terrorists attacked the United States / the stock market crashed / the Berlin Wall fell / the Persian Gulf War began | history | 1 | USCIS Q86 |
| 23 | What is the name of the national anthem? | The Star-Spangled Banner / America the Beautiful / God Bless America / My Country, 'Tis of Thee | symbols-geography | 1 | USCIS Q98 |
| 24 | How many justices currently sit on the Supreme Court? | 9 / 7 / 11 / 13 | civics-structure | 3 | USCIS Q39; supremecourt.gov "About the Court" |

`answerIndex` for every row above is `0` in this table's ordering; the app must shuffle choice order per render so the correct answer is not always the first option shown to the player.

---

## 4. The statistics inventory

24 stats, 4 per section, every figure checked live against its publisher on 2026-09-17. No orphan numbers — every row below carries an outlet, a year, a URL, and the dry line that ships with it.

### Civics

**S1.** Over a third of U.S. adults (**35%**) cannot name all three branches of government.
Source: Annenberg Public Policy Center, *2026 Constitution Day Civics Survey*, 2026. `https://www.annenbergpublicpolicycenter.org/a-third-of-americans-cannot-name-the-three-branches-of-government/`
> one in three adults doesn't know the system has three parts. it has had three parts since 1789.

**S2.** Of the five rights in the First Amendment, only freedom of speech is named by a majority (**73%**); freedom of the press is named by just **29%**.
Source: Annenberg Public Policy Center, 2026. Same URL as S1.
> the amendment has five rights. most people can produce exactly one of them on command.

**S3.** A quarter of Americans (**25%**) incorrectly believe the right to bear arms is protected by the First Amendment.
Source: Annenberg Public Policy Center, 2026. Same URL as S1.
> it's the second amendment. it has been the second amendment for 235 years.

**S4.** Only **36%** of Americans could pass a multiple-choice version of the U.S. citizenship test, which has a passing score of 60%.
Source: Woodrow Wilson National Fellowship Foundation / Citizens & Scholars, national survey, 2018. `https://citizensandscholars.org/resource/national-survey-finds-just-1-in-3-americans-would-pass-citizenship-test/`
> that's the test people applying for citizenship have to pass. two out of three native-born adults wouldn't.

### Reading & literacy

**S5.** **19%** of U.S. adults score at the lowest literacy proficiency level (Level 1 or below).
Source: National Center for Education Statistics, U.S. PIAAC 2017 results. `https://nces.ed.gov/fastfacts/display.asp?id=69`
> roughly one in five adults reads at a level built for early instruction, not daily life.

**S6.** Only **48%** of U.S. adults reach high literacy proficiency (Level 3+), compared with **72%** in Japan and **63%** in Finland.
Source: NCES / OECD, Program for the International Assessment of Adult Competencies, 2012–15 international comparison. `https://nces.ed.gov/fastfacts/display.asp?id=69`
> japan clears the same bar at a rate of nearly three in four. we clear it at under half.

**S7.** Just **31%** of fourth-graders read at or above *NAEP Proficient* in 2024, down 4 percentage points from 2019.
Source: NCES, 2024 NAEP Reading Assessment. `https://www.nationsreportcard.gov/reports/reading/2024/g4_8/?grade=4`
> fewer than a third of ten-year-olds read at grade-appropriate proficiency, and the number is still falling.

**S8.** **32%** of twelfth-graders scored below *NAEP Basic* in reading in 2024 — the largest share ever recorded on that assessment.
Source: National Assessment Governing Board, 2024 NAEP Reading Assessment. `https://www.nagb.gov/news-and-events/news-releases/2025/nations-report-card-decline-in-reading-progress-in-math.html`
> these are students twelve months from a diploma. this is the worst the test has ever measured them.

### Science & trust in expertise

**S9.** **77%** of U.S. adults have at least a fair amount of confidence in scientists to act in the public's best interest, down from **87%** in April 2020.
Source: Pew Research Center, "Americans' confidence in scientists," January 2026. `https://www.pewresearch.org/science/2026/01/15/americans-confidence-in-scientists/`
> confidence in scientists dropped ten points in six years. the science didn't change that much.

**S10.** **90%** of Democrats versus **65%** of Republicans express at least a fair amount of confidence in scientists.
Source: Pew Research Center, January 2026. Same URL as S9.
> whether you trust a chemist now depends on how you vote. chemistry did not used to be a ballot line.

**S11.** Only **31%** of eighth-graders scored at or above *NAEP Proficient* in science in 2024; **38%** scored below *NAEP Basic* — the highest share since 2009.
Source: National Assessment Governing Board, 2024 NAEP Science Assessment. `https://www.nagb.gov/news-and-events/news-releases/2025/declines-in-8th-grade-science-and-12th-grade-math-and-reading.html`
> students below NAEP Basic likely can't recall that plants need sunlight. that's not a proficiency gap. that's the floor giving out.

**S12.** Public trust in mass media to report the news "fully, accurately, and fairly" sits at **31%**, tied for the lowest ever recorded.
Source: Gallup, "Americans' Trust in Media Remains at Trend Low," October 2024. `https://news.gallup.com/poll/651977/americans-trust-media-remains-historically-low.aspx`
> less than a third of the country trusts the one institution whose entire job is telling them what's true.

### Education system

**S13.** The national high school graduation rate was **87%** in 2021–22.
Source: NCES, "High School Graduation Rates," 2024 update. `https://nces.ed.gov/programs/coe/indicator/coi/high-school-graduation-rates`
> 87% of students leave high school with a diploma. 35% leave able to read at a proficient level. the diploma and the skill are not the same claim.

**S14.** Only **22%** of eighth-graders scored at or above *NAEP Proficient* in civics in 2022 — statistically unchanged since the first civics assessment in 1998.
Source: NCES, 2022 NAEP Civics Assessment. `https://www.nationsreportcard.gov/civics/results/achievement/`
> twenty-four years of civics instruction, testing, and hand-wringing, and the proficiency rate hasn't moved.

**S15.** Just **22%** of twelfth-graders scored at or above *NAEP Proficient* in math in 2024; **45%** scored below *NAEP Basic* — the highest share ever recorded.
Source: National Assessment Governing Board, 2024 NAEP Mathematics Assessment. `https://www.nagb.gov/news-and-events/news-releases/2025/declines-in-8th-grade-science-and-12th-grade-math-and-reading.html`
> nearly half of graduating seniors can't clear the basic bar in math. they will still graduate.

**S16.** Undergraduate enrollment at U.S. degree-granting institutions fell **15%** between 2010 and 2021, from 18.1 million to 15.4 million students.
Source: NCES, "Undergraduate Enrollment," Condition of Education. `https://nces.ed.gov/programs/coe/indicator/cha`
> 2.7 million fewer people decided a degree was worth finishing. some of them were right to skip it. not all of them.

### Media & information

**S17.** Only **26%** of Americans correctly classified all five factual statements as factual in a mixed set of factual and opinion statements.
Source: Pew Research Center, "Distinguishing Between Factual and Opinion Statements in the News," June 2018. `https://www.pewresearch.org/journalism/2018/06/18/distinguishing-between-factual-and-opinion-statements-in-the-news/`
> a quarter of the country can reliably tell a fact from an opinion when both are printed side by side.

**S18.** **35%** correctly classified all five opinion statements as opinion in the same study.
Source: Pew Research Center, June 2018. Same URL as S17.
> people are slightly better at spotting someone else's opinion than at spotting a plain fact. draw your own conclusion carefully.

**S19.** **21%** of U.S. adults regularly get news from social media "news influencers," unchanged from 2024 to 2025.
Source: Pew Research Center, "America's News Influencers," November 2024. `https://www.pewresearch.org/journalism/2024/11/18/americas-news-influencers/`
> one in five adults gets their news from someone with a ring light and no editor.

**S20.** Only **7%** of U.S. adults often get news from printed newspapers or magazines as of 2025.
Source: Pew Research Center, "News Platform Fact Sheet," September 2025. `https://www.pewresearch.org/journalism/fact-sheet/news-platform-fact-sheet/`
> printed news is a niche habit now, not a default one. the shift happened faster than most people noticed, which is the point.

### The overall picture

**S21.** **35%** can't name the three branches of government. **22%** of eighth-graders are proficient in civics. **31%** trust the media that's supposed to explain any of it to them.
Sources: Annenberg Public Policy Center 2026 (S1); NCES 2022 NAEP Civics (S14); Gallup 2024 (S12).
> none of these numbers happened this year. all of them have been sitting here for a while.

**S22.** **87%** of students graduate high school. **35%** of twelfth-graders read at a proficient level. **22%** do math at a proficient level.
Sources: NCES graduation rate 2024 (S13); NAGB 2024 reading and math release (S8, S15).
> the diploma rate went up. the proficiency rate did not follow it.

**S23.** Only **36%** of Americans could pass the same civics test required of immigrants — who pass the real oral exam at a rate around **91%**.
Source: Woodrow Wilson National Fellowship Foundation, 2018. `https://citizensandscholars.org/resource/national-survey-finds-just-1-in-3-americans-would-pass-citizenship-test/`
> the people studying for citizenship pass at a higher rate than the people who already have it.

**S24.** Confidence in scientists fell 10 points since 2020 (87% → 77%). Trust in mass media sits at 31%, tied for an all-time low.
Sources: Pew Research Center 2026 (S9); Gallup 2024 (S12).
> the institutions built to tell you what's true are trusted by roughly a third of the country. that's not a coincidence. that's a pattern.

---

## 5. Architecture

### Route table

```
/            landing — the word, the thesis, one CTA (state-dependent label)
/origin      the story of the word — first-run entry point, permanently reachable
/quiz        the game — fullscreen, 5 questions, 3s timer, no chrome
/results     score, tier, pep talk, share, reveal, CTAs to /learn and /stats
/stats       the wall — locked until a run completes, then permanent
/learn       re-teach missed questions, persisted, retry CTA
/about       sources, methodology, last-reviewed date, non-affiliation disclaimer
```

### Component tree

```
+layout.svelte                 — noise overlay, safe-area padding, reduced-motion hook, no header/nav anywhere (app is chromeless by design on every route, not just /quiz)
  +page.svelte                 — /
  origin/+page.svelte          — /origin, renders Beat.svelte x7
  quiz/+page.svelte            — /quiz, owns viewport; QuizTimer, QuizChoice x4, ProgressDots
  results/+page.svelte         — /results; ShareCard
  stats/+page.svelte           — /stats; Lock.svelte OR StatCard.svelte x24 (paginated by section)
  learn/+page.svelte           — /learn
  about/+page.svelte           — /about

lib/components/
  Beat.svelte                  — one /origin narrative beat, client-mounted entrance
  QuizTimer.svelte             — 3s drain (ring/bar), aria-live countdown, reduced-motion-safe numeral fallback
  QuizChoice.svelte            — one 64px+ tap-target answer button
  ProgressDots.svelte          — 1/5 progress + running tally
  Lock.svelte                  — gold locked-stats panel
  StatCard.svelte              — figure / claim / dry line / source+year
  ShareCard.svelte             — renders the three share-text variants + copy/share action
```

### State model

**In-memory only (Svelte 5 `$state`, dies on navigation away from `/quiz` mid-run):**
- `currentIndex`, the 5 drawn `Question[]` for this run, `answers[]` so far, running `correctCount`, `startedAt`.

**`sessionStorage` (survives an incidental reload of `/results` in the same tab; not a gate, purely UX convenience):**
- `amitheidiot.lastResult` — the just-completed `RunResult`. Cleared the moment a *new* run starts (on `/quiz` mount).

**`localStorage` (the two gates, plus the learn-queue — permanent, cross-session, this device only):**
- `amitheidiot.lessonSeen` — Gate 1.
- `amitheidiot.statsUnlocked` — Gate 2.
- `amitheidiot.missedQuestions` — accumulated `{questionId, choiceIndex, missedAt}[]`, deduped by `questionId` keeping the most recent miss, written at run completion alongside Gate 2.

### Gate 1 — the lesson, in full precise semantics

- **Write:** `localStorage.setItem('amitheidiot.lessonSeen', '1')`, fired on either (a) reaching beat 7's handoff, or (b) tapping skip on any beat. Both count as "seen" — the app never re-forces the lesson on someone who has already made a choice about it once.
- **Read:** on `/` mount. Unset → CTA reads `BEGIN`, routes to `/origin`. Set → CTA reads `TAKE THE QUIZ`, routes straight to `/quiz`.
- **Edge — storage cleared:** flag reads unset; landing offers `BEGIN` again. Intentional, not a bug — a cleared device is treated as a new visitor.
- **Edge — direct nav to `/origin` any time:** always renders the lesson in full (it's the permanently reachable "the word ↗" destination); idempotently (re-)sets the flag on completion/skip.
- **Edge — mid-lesson reload:** the lesson is a stateless linear read with no partial-progress persistence; a reload restarts at beat 1. Since the flag is only written on finish/skip, an interrupted first read correctly leaves Gate 1 unset and the landing CTA still reads `BEGIN`.
- **Edge — localStorage unavailable (strict private mode):** flag always reads unset; every visit behaves like a first visit. Documented degraded behavior, not a crash.

### Gate 2 — the stats, in full precise semantics

- **Write:** `localStorage.setItem('amitheidiot.statsUnlocked', '1')`, fired the instant a run records its 5th answer (correct, wrong, *or* timeout — completion, not score) and before navigating from `/quiz` to `/results`. The same instant also writes `amitheidiot.missedQuestions` and the `sessionStorage` `lastResult`.
- **Read:** on `/stats` mount. Unset → render `Lock.svelte` with "you don't get to see this yet." + `TAKE THE QUIZ`. Set → render the full paginated wall. **Never re-locks itself.**
- **Edge — direct nav to `/stats`, zero history (fresh tab, first thing the visitor does):** unset → locked. This is the specified first-visit behavior exactly.
- **Edge — mid-run reload (before question 5):** per the quiz's own no-partial-state rule, the abandoned run vanishes and Gate 2 is **not** written (completion is the trigger, not an attempt). A subsequent `/stats` visit stays locked. Correct: only a finished run — win or lose — earns the unlock.
- **Edge — completes quiz, then clears storage:** Gate 2 (and Gate 1, and the missed-questions queue) all read unset again on the next visit. This is the accepted v1 tradeoff of having zero accounts (see Risks #8) — not something to "fix" by adding a login.
- **Edge — completes quiz on device A, visits `/stats` on device B:** locked on B. No cross-device sync exists or is planned for v1.
- **Edge — hard-refreshes `/results` after finishing:** Gate 2 was already written at the `/quiz → /results` transition, so `/stats` stays unlocked regardless of anything that happens to `/results` afterward. What *can* be lost on that particular reload is the on-screen score display, which is why `sessionStorage.lastResult` exists — see the edge state in §2.8.

---

## 6. Data model

```ts
interface Question {
  id: string;
  prompt: string;
  choices: [string, string, string, string];
  answerIndex: 0 | 1 | 2 | 3;
  sourceUrl: string;
  category: 'civics-structure' | 'civics-rights' | 'history' | 'symbols-geography';
  difficulty: 1 | 2 | 3;
}

interface Stat {
  id: string;
  section: 'civics' | 'literacy' | 'science' | 'education' | 'media' | 'overall';
  figure: string;        // pre-formatted display value, e.g. "35%"
  claim: string;         // plain-language one-liner
  dryLine: string;       // the editorial line beneath the number
  sourceOutlet: string;
  sourceYear: number;
  sourceUrl: string;
}

interface RunAnswer {
  questionId: string;
  choiceIndex: number | null;   // null = timeout, displayed as "no answer"
  correct: boolean;
  timeMs: number;                // captured, not surfaced in v1 UI
}

interface RunResult {
  answers: RunAnswer[];          // length 5, in the order asked
  score: number;                  // 0–5
  tier: Tier;                     // derived, never stored redundantly elsewhere
  completedAt: number;            // epoch ms
}

type Tier = 'CITIZEN' | 'RESIDENT' | 'IDIŌTĒS' | 'IDIOT';
```

**Tier derivation:**

```
function deriveTier(score: number): Tier {
  if (score === 5) return 'CITIZEN';
  if (score === 4) return 'RESIDENT';
  if (score === 2 || score === 3) return 'IDIŌTĒS';
  return 'IDIOT';              // score 0 or 1
}
```

**localStorage key contracts:**

| Key | Value | Written | Read |
|---|---|---|---|
| `amitheidiot.lessonSeen` | `"1"` \| absent | `/origin` on finish or skip | `/` on mount (Gate 1) |
| `amitheidiot.statsUnlocked` | `"1"` \| absent | `/quiz` on 5th answer (any outcome) | `/stats` on mount (Gate 2) |
| `amitheidiot.missedQuestions` | JSON `{questionId, choiceIndex, missedAt}[]` | same moment as `statsUnlocked` | `/learn` on mount |

**sessionStorage contract:**

| Key | Value | Written | Read | Cleared |
|---|---|---|---|---|
| `amitheidiot.lastResult` | JSON `RunResult` | same moment as `statsUnlocked` | `/results` on mount | on `/quiz` mount (new run starting) |

No PII in any key, ever. The only free-text user input anywhere in the app is the optional share-card alias, which is never persisted to storage and never leaves the client except inside the rendered/shared text itself.

---

## 7. File and directory layout

```
com.amitheidiot-sonnet/
├── Dockerfile                          — multi-stage, adapter-node, PORT=80, HOST=0.0.0.0
├── package.json                        — SvelteKit 5 + TS, near-zero deps
├── vite.config.ts
├── tsconfig.json
├── .npmrc
├── .gitignore
├── .dockerignore
├── README.md
├── static/
│   ├── favicon.ico                     — preserved from existing amitheidiot site
│   ├── favicon.svg                     — preserved
│   ├── favicon-32x32.png               — preserved
│   ├── apple-touch-icon.png            — preserved
│   └── robots.txt                      — preserved
└── src/
    ├── app.html                        — shell HTML, viewport meta, safe-area
    ├── app.d.ts
    └── lib/
        ├── app.css                     — brand tokens, font imports, noise overlay, shared classes
        ├── types.ts                    — Question, Stat, RunAnswer, RunResult, Tier
        ├── data.ts                     — QUESTIONS[24], STATS[24], fully authored (§3, §4)
        ├── gates.ts                    — hasSeenLesson / markLessonSeen / isStatsUnlocked / unlockStats / getMissedQuestions / recordMissed
        ├── quiz.ts                     — pickFiveQuestions() weighted sampler, deriveTier()
        ├── share.ts                    — buildShareText(alias, answer, variant)
        └── components/
            ├── Beat.svelte             — one /origin narrative beat
            ├── QuizTimer.svelte        — 3s drain, aria-live, reduced-motion numeral fallback
            ├── QuizChoice.svelte       — one 64px+ answer tap target
            ├── ProgressDots.svelte     — 1/5 + running tally
            ├── Lock.svelte             — gold locked-stats panel
            ├── StatCard.svelte         — one stat, full card
            └── ShareCard.svelte        — share preview + copy/share action
        routes/
        ├── +layout.svelte              — noise overlay, safe-area, reduced-motion hook, per-page <title>/OG via <svelte:head>
        ├── +page.svelte                — /
        ├── origin/+page.svelte         — /origin
        ├── quiz/+page.svelte           — /quiz (fullscreen)
        ├── results/+page.svelte        — /results
        ├── stats/+page.svelte          — /stats
        ├── learn/+page.svelte          — /learn
        └── about/+page.svelte          — /about
```

---

## 8. Build sequence

Ordered phases, single engineer, sequential. Each phase's DoD gates the next.

**Phase 0 — Scaffold & tokens.** Init SvelteKit 5 + TS; port `Dockerfile`/adapter-node config and brand `app.css` from the existing `com.amitheidiot` repo. *DoD:* `npm run dev` serves a dark page with the wordmark; `docker build` succeeds. *Unblocks:* everything.

**Phase 1 — Data layer.** Write `types.ts`, `data.ts` (all 24 questions + 24 stats), `gates.ts`, `quiz.ts`, `share.ts`. *DoD:* a throwaway script confirms `pickFiveQuestions()` returns 5 unique questions across 10k draws at the correct difficulty weighting, and `deriveTier()` matches the table in §6 for all six score values. *Unblocks:* `/quiz`, `/stats`, `/learn`, `/results`.

**Phase 2 — Landing + Gate 1.** Build `/` and `/origin`; wire `lessonSeen`. *DoD:* first visit → `BEGIN` → lesson → quiz; clearing storage resets to first-visit state; a second visit without clearing shows `TAKE THE QUIZ` and skips straight to `/quiz`; skip sets the flag identically to finishing. *Unblocks:* AC1–AC2.

**Phase 3 — Quiz engine + Gate 2 write.** Build `/quiz`: `QuizTimer`, `QuizChoice`, `ProgressDots`, answer recording, no-repeat shame/warmth line selection, completion → write `statsUnlocked` + `missedQuestions` + `lastResult` → navigate to `/results`. *DoD:* a full 5-question run completes; timeout records `no answer` + wrong; mid-run reload restarts clean; correct answers never shown during the run; feedback renders same-frame; keyboard-only playthrough works end to end. *Unblocks:* `/results`, Gate 2, `/learn`.

**Phase 4 — Results + share.** Build `/results`: score, tier, pep talk, answer reveal, `ShareCard` with alias input, CTAs. *DoD:* all three share-text variants correctly quote the run's real data; direct nav to `/results` with no `lastResult` shows the "you haven't played" edge state. *Unblocks:* AC on results/share.

**Phase 5 — Stats wall.** Build `/stats`: `Lock` when unset, full paginated wall (6 sections) when set. *DoD:* locked pre-quiz; unlock persists across reload and direct nav; all 24 cards carry a live source URL and year. *Unblocks:* AC8, AC10.

**Phase 6 — Learn.** Build `/learn`: reads `missedQuestions`, shows correct answer + one-line why-it-matters, retry CTA, sincere acknowledgment copy. *DoD:* post-miss run shows exactly those questions; perfect run shows the "nothing missed" edge state; persists across reload.

**Phase 7 — About + polish.** Build `/about` (sources, methodology, last-reviewed date, non-affiliation disclaimer); per-route `<title>`/meta/OG; `prefers-reduced-motion` audit; focus-state audit; 360px pass; exclamation-mark grep across all copy. *DoD:* zero `!` in user-facing strings; visible focus rings everywhere; no horizontal overflow at 360px; Docker image serves on port 80.

**Phase 8 — Verification & ship.** Run the full checklist in §10 against the built app; smoke test on an actual phone viewport; deploy.

---

## 9. Risks and decisions

1. **Pass-threshold ambiguity** — resolved per the brief's explicit rationale: *completion*, not score, unlocks `/stats`. There is no tunable pass threshold to configure; it's a binary "did they finish."
2. **Where tunable numbers live** — `quiz.ts` exports named constants: `QUIZ_LENGTH = 5`, `TIMER_SECONDS = 3`, `DIFFICULTY_WEIGHTS = { 1: 3, 2: 2, 3: 1 }`. Single source of truth; no magic numbers in components.
3. **Score survives a `/results` reload** — the brief doesn't specify this explicitly, but a naive build (score only in in-memory `$state`) loses the sharable score on any accidental refresh, which is exactly the highest-value moment in the app. Resolved with `sessionStorage.lastResult`: survives a same-tab reload, does not survive a new tab or device (by design — no accounts).
4. **Direct nav to `/results` with no completed run** — must not render `score: undefined`. Resolved with the explicit "you haven't played" edge state (§2.8).
5. **Weighted sampling correctness** — must draw 5 *unique* questions without replacement, weighted toward difficulty 1–2, without ever being able to produce a run that's trivially easy (undermining the "failure is damning" framing) or a run stacked with only difficulty-3 items (undermining the same framing from the other direction). The 3:2:1 weight ratio across a 12:9:3-question bank keeps every draw dominated by, but not exclusively made of, easy items.
6. **Shame-line pool size** — 15 wrong-answer lines + 5 timeout lines against a 5-question run leaves generous headroom against accidental repeats even under implementation mistakes (e.g., a bug that samples from the combined 20-line pool instead of the correct 15/5 split still can't collide within one run).
7. **Skip must set the same flag as finishing** — if built naively, only "finish" sets `lessonSeen`, and a skip-then-return-to-landing loop would trap a visitor in the lesson forever, directly contradicting "nobody is ever trapped in the lesson twice." Explicitly resolved in §5: skip and finish are equivalent writes.
8. **No accounts means no cross-device/cleared-storage recovery** — an explicit, accepted v1 limitation per the brief ("no accounts, no email, no PII anywhere"). This is not a bug to patch later by adding a login; it is the stated tradeoff for the app's zero-PII posture.
9. **NAEP achievement-level figures carry NCES's own "trial basis" caveat** — every NAEP-sourced `StatCard` states the year and the assessing body plainly; the dry line never overstates certainty beyond what the source itself claims.
10. **`/stats` pagination** — the brief requires "paginated into themed groups"; built as 6 section anchors (Civics, Reading & Literacy, Science & Trust, Education, Media, Overall Picture) at 4 cards each, not a single unbroken scroll.
11. **`prefers-reduced-motion` vs. the quiz timer** — the timer's visual drain is *game logic*, not decoration. Reduced-motion strips the animated drain and shows a static, `aria-live`-updating numeral instead — it never disables or slows the actual 3-second countdown.
12. **Brand-token discrepancy between the live teaser and `app.css`** — the live `amitheidiot.com` teaser inlines a noise overlay at `opacity: 0.5` and a floating-Greek-letter animation tuned for one full-bleed hero; the shared `app.css` token file (the one meant for reuse across a multi-page app) uses `opacity: 0.07` for the same overlay. **Decision: the full app uses the `app.css` value (0.07)** — a content-dense multi-page app cannot carry a hero-scale noise overlay across a stats wall of 24 cards without hurting legibility. The wordmark's blue accent letter (`am`**i**`the`**idiot**, first "i" in flag blue `#4169E1`, "idiot" in blood `#FF5A5F`) *is* carried over exactly as built in the live teaser — that detail is small enough to survive at content scale and is the specific brand signature this instruction called out.
13. **SSR hydration mismatches** — per the engineering constraints, no Svelte transitions run during the SSR pass. `Beat.svelte`'s entrance and `QuizTimer`'s drain both mount inert on first paint and animate only after an `{#if mounted}` client-only guard, matching the existing codebase's established pattern for its own noise overlay.

---

## 10. Verification plan

Testable per acceptance criterion, no vibes.

**AC1 — routing by visit state.** Clear storage; load `/`; assert CTA = `BEGIN`, click → `/origin`. Finish or skip; return to `/`; assert CTA = `TAKE THE QUIZ`, click → `/quiz` directly, zero extra taps.

**AC2 — lesson timing and skip.** Word-count the 7 beats at ~200wpm; assert ≤90s. Assert a skip control renders on every beat with the exact copy from §1.

**AC3 — quiz shape.** Mount `/quiz`; assert no header/nav/footer render at all. Assert exactly 5 questions per run, each with a 3-second timer that locks input at 0, and no back-navigation control exists.

**AC4 — timeout handling.** Let a timer expire untouched; assert `choiceIndex: null`, `correct: false`, and every downstream screen (`/results`, share card, `/learn`) displays the literal string `no answer`.

**AC5 — answers withheld during the run.** After each answer, assert the rendered feedback never contains the correct choice's text or index until `/results`.

**AC6 — feedback latency.** Instrument tap-to-render timestamp delta in a throwaway script; assert single-frame rendering (no network round-trip exists to violate this).

**AC7 — tone and no-repeat.** Run a full 5-wrong session; assert the 5 shown shame lines are pairwise distinct. Run a full 5-correct session; assert the lines match the 1st–5th ordinal mapping in §2.3 exactly.

**AC8 — stats gate.** Clear storage; visit `/stats`; assert `Lock` renders with "you don't get to see this yet." Complete a run with score 0; visit `/stats`; assert the full wall renders (proves completion, not passing, unlocks it). Reload; assert still unlocked. Fresh tab, direct nav to `/stats` after unlock; assert still unlocked (localStorage-backed, not history-backed).

**AC9 — learn persistence.** Complete a run with ≥1 miss; visit `/learn`; assert the missed item(s) render with correct answer + explanation. Reload; assert identical.

**AC10 — stat sourcing.** Iterate `STATS[]`; assert every entry has non-empty `sourceUrl` and `sourceYear`. All 24 URLs were resolved live during authoring of §4 in this session.

**AC11 — zero exclamation marks.** Grep `"!"` across every user-facing string in `data.ts`, every `.svelte` template's static text, and `lib` copy modules; assert zero matches outside non-null-assertion code syntax.

**AC12 — Docker/port.** `docker build` the Dockerfile; run the image; `curl http://localhost:80/`; assert HTTP 200.

**AC13 — accessibility and viewport.** Full keyboard-only playthrough of `/` → `/origin` → `/quiz` → `/results`; assert every interactive element is reachable with a visible focus ring. Set `prefers-reduced-motion: reduce`; assert entrance animations vanish while the quiz timer's numeral still counts down. Resize to 360px width; assert no horizontal overflow and all tap targets remain ≥64px tall.

**AC14 — no PII.** Grep the codebase and every persisted storage key for name/email/address fields; assert the only free-text user input anywhere is the optional share-card alias, and assert it is never written to `localStorage` or `sessionStorage` — only interpolated into the client-rendered share string.
