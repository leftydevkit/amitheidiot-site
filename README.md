# amitheidiot — sonnet

Five questions. Three seconds each. The word had a different meaning once.

A civic-knowledge quiz wrapped in a story about what "idiot" used to mean. Zero accounts, zero PII, zero analytics. Everything runs client-side; two localStorage gates (lesson seen, stats unlocked) are the only persistence.

## Routes

- `/` — the word, the thesis, one state-dependent CTA
- `/origin` — the story of the word, seven beats
- `/quiz` — five questions, three seconds each, chromeless
- `/results` — score, tier, pep talk, reveal, share
- `/stats` — the wall, locked until a run completes
- `/learn` — re-teach the questions you missed
- `/about` — sources, method, last-reviewed date, disclaimer

## Develop

```bash
npm install
npm run dev
```

## Build & run

```bash
npm run build
node build
```

Docker:

```bash
docker build -t amitheidiot-sonnet .
docker run -p 80:80 amitheidiot-sonnet
```

## Content provenance

All 24 quiz questions derive from the public-domain USCIS 2008 Civics Test. All 24 stats are cited to their live publishers; the full source list and methodology are on `/about`.
