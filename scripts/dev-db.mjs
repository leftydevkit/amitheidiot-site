#!/usr/bin/env node
/**
 * Local development database.
 *
 * PGlite is a real Postgres compiled to WASM; pglite-socket exposes it over the
 * ordinary Postgres wire protocol, so the site talks to it through its normal
 * `pg` client with no code path of its own. Nothing here ships: it is a dev
 * convenience so /board, /admin, /r/<id> and publishing can be exercised
 * without a hosted database.
 *
 *   npm run dev:db
 *   DATABASE_URL='postgresql://postgres:postgres@127.0.0.1:5433/postgres' npm run dev
 *
 * Dev only: PGlite is a single-connection engine behind a multiplexer, and it
 * does not check the password. Bind it to localhost and never expose it.
 */
import { mkdirSync } from 'node:fs';
import { PGlite } from '@electric-sql/pglite';
import { PGLiteSocketServer } from '@electric-sql/pglite-socket';

const PORT = Number(process.env.PGLITE_PORT || 5433);
const HOST = process.env.PGLITE_HOST || '127.0.0.1';
const DIR = process.env.PGLITE_DATA || '.pgdata';

mkdirSync(DIR, { recursive: true });

const db = await PGlite.create({ dataDir: DIR });
const server = new PGLiteSocketServer({ db, port: PORT, host: HOST });

await server.start();
console.log(`dev database: postgresql://postgres:postgres@${HOST}:${PORT}/postgres`);
console.log(`data:         ${DIR}`);

async function shutdown() {
	await server.stop();
	await db.close();
	process.exit(0);
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
