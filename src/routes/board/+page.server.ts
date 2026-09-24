import { dbConfigured } from '$lib/server/db';
import { getBoard } from '$lib/server/runs';
import type { PageServerLoad } from './$types';

export const prerender = false;

export type BoardLevel = 1 | 2 | 3 | 'all';

export const load: PageServerLoad = async ({ url }) => {
	const raw = url.searchParams.get('level');
	const level: BoardLevel =
		raw === '1' || raw === '2' || raw === '3' ? (Number(raw) as 1 | 2 | 3) : 'all';

	if (!dbConfigured()) return { configured: false, level, rows: [] };

	try {
		const rows = (await getBoard(level)).map((r) => ({
			...r,
			when: new Date(r.created_at).toISOString().slice(0, 10)
		}));
		return { configured: true, level, rows };
	} catch (e) {
		// Unreachable/unmigrated database shouldn't 500 the page.
		console.error('[board] query failed:', e);
		return { configured: false, level, rows: [] };
	}
};
