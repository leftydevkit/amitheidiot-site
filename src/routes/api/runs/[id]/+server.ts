import { json } from '@sveltejs/kit';
import { dbConfigured } from '$lib/server/db';
import { getRun, type PublishAnswer } from '$lib/server/runs';
import { QUESTIONS } from '$lib/data';
import type { RequestHandler } from './$types';

export const prerender = false;

const QUESTION_BY_ID: Record<string, (typeof QUESTIONS)[number]> = Object.fromEntries(
	QUESTIONS.map((q) => [q.id, q])
);

/**
 * Public JSON for one published run — the same data `/r/[id]` renders.
 *
 * The extra per-answer fields (`prompt`, `correct`) exist so a consumer that
 * is not this site (the stream's key alert) does not have to vendor the
 * question bank to say what someone got wrong. The run id is the capability:
 * it is unguessable and already public wherever it was shared.
 */
export const GET: RequestHandler = async ({ params, setHeaders }) => {
	if (!dbConfigured()) {
		return json({ error: 'sharing is not configured on this server' }, { status: 503 });
	}

	let run;
	try {
		run = await getRun(params.id);
	} catch (e) {
		console.error('[api/runs/:id] query failed:', e);
		return json({ error: 'could not load that run' }, { status: 503 });
	}
	if (!run) return json({ error: 'no such run' }, { status: 404 });

	const answers = (run.answers as PublishAnswer[]).map((a) => {
		const q = QUESTION_BY_ID[a.questionId];
		return {
			...a,
			prompt: q?.prompt ?? '',
			correct: Boolean(q && a.choice !== null && a.choice === q.choices[q.answerIndex])
		};
	});

	// A published run is immutable — the only thing that changes it is deletion.
	setHeaders({ 'cache-control': 'public, max-age=300' });
	return json({ ...run, answers });
};
