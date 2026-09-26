// Temporary: verify rotation + blocklist + report link against production.
const BASE = 'https://amitheidiot.com';

const good = [
	{ questionId: 'q01-supreme-law', choice: 'the Constitution', timeMs: 1200 },
	{ questionId: 'q02-constitution-purpose', choice: 'sets up the government', timeMs: 900 },
	{ questionId: 'q03-self-government', choice: 'We the People', timeMs: 1500 },
	{ questionId: 'q05-bill-of-rights', choice: 'the Bill of Rights', timeMs: 800 },
	{ questionId: 'q06-first-amendment', choice: 'speech', timeMs: 700 }
];

const post = async (alias) => {
	const res = await fetch(BASE + '/api/runs', {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify({ alias, result: { level: 1, answers: good } })
	});
	return { status: res.status, body: await res.json().catch(() => null) };
};

console.log('banned, plain:        ', JSON.stringify(await post('nazi')));
console.log('banned, repeated:     ', JSON.stringify(await post('naaazi')));
console.log('banned, spaced:       ', JSON.stringify(await post('n a z i')));
console.log('banned, leetspeak:    ', JSON.stringify(await post('h1tler')));

const ok = await post('zed-test-3');
console.log('normal alias:         ', ok.status, ok.body?.id);
const id = ok.body?.id;
if (!id) process.exit(1);

const html = await (await fetch(`${BASE}/r/${id}`)).text();
console.log('report link present:  ', /report this result/.test(html), '| mailto target:', (html.match(/mailto:[^"?]+/) || [])[0]);

const del = await fetch(`${BASE}/api/runs/${id}/delete`, {
	method: 'POST',
	headers: { 'content-type': 'application/json' },
	body: JSON.stringify({ token: ok.body.deleteToken })
});
console.log('delete:               ', del.status);
console.log('r after delete:       ', (await fetch(`${BASE}/r/${id}`)).status, '(want 404)');
console.log('board clean:          ', !(await (await fetch(`${BASE}/board?level=1`)).text()).includes('zed-test-3'));
