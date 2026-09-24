import { createHmac, randomBytes } from 'node:crypto';
import { env } from '$env/dynamic/private';
import type { Cookies } from '@sveltejs/kit';

// Rate limiting without logging anyone. We key on a signed, random device
// cookie rather than an IP hash — the cookie identifies a browser, not a
// person, and nothing about it is stored server-side except in this process's
// memory (and it is forgotten on restart).

const COOKIE = 'amiti_dev';

function secret(): string {
	// Falls back to DATABASE_URL so a missing COOKIE_SECRET doesn't break the app;
	// set a dedicated one in production.
	return env.COOKIE_SECRET || env.DATABASE_URL || 'amitheidiot-dev-only-secret';
}

function sign(id: string): string {
	return createHmac('sha256', secret()).update(id).digest('base64url').slice(0, 24);
}

/** Read the device id from a valid signed cookie, or mint and set a new one. */
export function deviceId(cookies: Cookies): string {
	const raw = cookies.get(COOKIE);
	if (raw) {
		const [id, sig] = raw.split('.');
		if (id && sig && sign(id) === sig) return id;
	}
	const id = randomBytes(9).toString('base64url');
	cookies.set(COOKIE, `${id}.${sign(id)}`, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 60 * 60 * 24 * 365
	});
	return id;
}

const hits = new Map<string, number[]>();

/** Sliding-window limiter, keyed by device id. Returns true when over budget. */
export function rateLimited(id: string, max = 12, windowMs = 10 * 60 * 1000): boolean {
	const now = Date.now();
	const list = (hits.get(id) ?? []).filter((t) => now - t < windowMs);
	list.push(now);
	hits.set(id, list);
	return list.length > max;
}
