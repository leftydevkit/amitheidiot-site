import pg from 'pg';
import { env } from '$env/dynamic/private';

// Server-only Postgres access. Everything here degrades gracefully when
// DATABASE_URL is unset (local dev, or a deploy missing the secret), so nothing
// throws at import time — callers check `dbConfigured()` first.
//
// Nothing personal is stored: no IP, no email, no user agent. The row id is the
// share capability, and the only user-supplied text is the optional alias.

const { Pool } = pg;

let pool: pg.Pool | null = null;

export function getPool(): pg.Pool | null {
	const url = env.DATABASE_URL;
	if (!url) return null;
	if (!pool) {
		pool = new Pool({
			connectionString: url,
			max: 5,
			ssl: /sslmode=require/.test(url) ? { rejectUnauthorized: false } : undefined
		});
	}
	return pool;
}

export function dbConfigured(): boolean {
	return Boolean(env.DATABASE_URL);
}

let schemaReady: Promise<void> | null = null;

/** Create the table once per process. No migration tooling for one table. */
export function ensureSchema(): Promise<void> {
	if (!schemaReady) {
		schemaReady = (async () => {
			const p = getPool();
			if (!p) throw new Error('DATABASE_URL is not set');
			await p.query(`
				create table if not exists runs (
					id         text primary key,
					created_at timestamptz not null default now(),
					level      smallint not null,
					score      smallint not null,
					total      smallint not null,
					tier       text not null,
					alias      text,
					total_ms   integer not null,
					answers    jsonb not null
				);
			`);
			await p.query(`create index if not exists runs_rank on runs (level, score, total_ms);`);
		})().catch((e) => {
			schemaReady = null; // let the next request retry
			throw e;
		});
	}
	return schemaReady;
}

export async function query<T extends pg.QueryResultRow = pg.QueryResultRow>(
	text: string,
	params: unknown[] = []
): Promise<T[]> {
	const p = getPool();
	if (!p) throw new Error('DATABASE_URL is not set');
	const res = await p.query<T>(text, params as never[]);
	return res.rows;
}
