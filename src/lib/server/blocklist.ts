// The only user-authored text this app publishes is the optional alias, so this
// is the whole moderation surface. Keyword lists are weak by nature — this
// catches the obvious and nothing more; the report link on /r/[id] is the real
// backstop. Add terms here.
const BANNED = [
	'nigger',
	'nigga',
	'faggot',
	'retard',
	'spic',
	'chink',
	'kike',
	'tranny',
	'nazi',
	'hitler',
	'kkk',
	'rape',
	'rapist',
	'pedo',
	'paedo',
	'molest'
];

/** Flatten the usual evasions: case, accents, separators, repeated letters. */
function normalize(s: string): string {
	return s
		.toLowerCase()
		.normalize('NFKD')
		.replace(/[^a-z0-9]/g, '')
		.replace(/(.)\1+/g, '$1');
}

export function isBanned(alias: string): boolean {
	const n = normalize(alias);
	if (!n) return false;
	return BANNED.some((term) => n.includes(normalize(term)));
}
