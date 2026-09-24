import { json } from '@sveltejs/kit';
import { dbConfigured } from '$lib/server/db';
import { publishRun } from '$lib/server/runs';
import { deviceId, rateLimited } from '$lib/server/device';
import type { RequestHandler } from './$types';

export const prerender = false;

/**
 * Publish a completed run. Body: { result: { level, answers:[{questionId,choice,timeMs}] }, alias?: string }.
 * The score is recomputed server-side (see verifyPayload), so nothing the client
 * says about its own score is trusted.
 */
export const POST: RequestHandler = async ({ request, cookies }) => {
	if (!dbConfigured()) {
		return json({ error: 'sharing is not configured on this server' }, { status: 503 });
	}

	const dev = deviceId(cookies);
	if (rateLimited(dev)) {
		return json({ error: 'too many publishes — give it a minute' }, { status: 429 });
	}

	let body: { result?: unknown; alias?: unknown };
	try {
		body = (await request.json()) as typeof body;
	} catch {
		return json({ error: 'bad request' }, { status: 400 });
	}

	try {
		const res = await publishRun(body?.result, body?.alias);
		if ('error' in res) return json(res, { status: 400 });
		return json(res, { status: 201 });
	} catch (e) {
		console.error('[api/runs] publish failed:', e);
		return json({ error: 'could not save that' }, { status: 500 });
	}
};
