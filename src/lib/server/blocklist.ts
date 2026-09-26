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

/** Flatten the usual evasions: case, accents, separators, leetspeak, repeats. */
const LEET: Record<string, string> = {
	'0': 'o',
	'1': 'i',
	'3': 'e',
	'4': 'a',
	'5': 's',
	'6': 'g',
	'7': 't',
	'8': 'b',
	'9': 'g',
	'@': 'a',
	'$': 's',
	'!': 'i',
	'|': 'i'
};

function normalize(s: string): string {
	return s
		.toLowerCase()
		.normalize('NFKD')
		.replace(/[^a-z0-9@$!|]/g, '') // strip separators and accents
		.replace(/[0-9@$!|]/g, (c) => LEET[c] ?? c) // h1tler -> hitler
		.replace(/(.)\1+/g, '$1'); // collapse runs
}

export function isBanned(alias: string): boolean {
	const n = normalize(alias);
	if (!n) return false;
	return BANNED.some((term) => n.includes(normalize(term)));
}
