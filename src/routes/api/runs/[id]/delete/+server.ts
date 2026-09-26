import { json } from '@sveltejs/kit';
import { dbConfigured } from '$lib/server/db';
import { deleteRun } from '$lib/server/runs';
import type { RequestHandler } from './$types';

export const prerender = false;

/** Delete a published run. Body: { token }. The token is handed out once, at publish. */
export const POST: RequestHandler = async ({ params, request }) => {
	if (!dbConfigured()) return json({ error: 'not configured' }, { status: 503 });

	const body = (await request.json().catch(() => ({}))) as { token?: unknown };
	const token = typeof body?.token === 'string' ? body.token : '';

	try {
		const ok = await deleteRun(params.id, token);
		if (!ok) return json({ error: 'nothing to delete, or the token is wrong' }, { status: 403 });
		return json({ ok: true });
	} catch (e) {
		console.error('[api/runs/delete] failed:', e);
		return json({ error: 'could not delete that' }, { status: 500 });
	}
};
