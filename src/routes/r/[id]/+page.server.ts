import { error } from '@sveltejs/kit';
import { dbConfigured } from '$lib/server/db';
import { getRun } from '$lib/server/runs';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async ({ params, url }) => {
	if (!dbConfigured()) throw error(503, 'sharing is not configured on this server');

	let run;
	try {
		run = await getRun(params.id);
	} catch (e) {
		console.error('[r] query failed:', e);
		throw error(503, 'the shared result could not be loaded');
	}
	if (!run) throw error(404, 'no such result');
	return { run, shareUrl: url.href };
};
