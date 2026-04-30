/* eslint-disable no-restricted-globals */
const VERSION = 'v5';
const PRECACHE = `pc-precache-${VERSION}`;
const RUNTIME = `pc-runtime-${VERSION}`;

const PRECACHE_URLS = [
	'/',
	'/index.html',
	'/manifest.json',
	'/favicon.svg',
	'/fonts/dela-gothic-one-latin.woff2',
];

const HASHED_ASSET = /\.[a-f0-9]{8,}\.(?:js|css|svg|png|jpg|jpeg|woff2)$/;

self.addEventListener('install', event => {
	event.waitUntil(
		caches
			.open(PRECACHE)
			.then(cache =>
				Promise.all(
					PRECACHE_URLS.map(url =>
						fetch(url, { cache: 'reload' })
							.then(res => (res.ok ? cache.put(url, res) : null))
							.catch(() => null),
					),
				),
			)
			.then(() => self.skipWaiting()),
	);
});

self.addEventListener('activate', event => {
	const valid = new Set([PRECACHE, RUNTIME]);
	event.waitUntil(
		caches
			.keys()
			.then(keys =>
				Promise.all(keys.filter(k => !valid.has(k)).map(k => caches.delete(k))),
			)
			.then(() => self.clients.claim()),
	);
});

self.addEventListener('message', event => {
	if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

const networkFirst = async request => {
	try {
		const response = await fetch(request);
		const cache = await caches.open(RUNTIME);
		cache.put(request, response.clone());
		return response;
	} catch (err) {
		const cached = await caches.match(request);
		if (cached) return cached;
		const fallback = await caches.match('/');
		if (fallback) return fallback;
		throw err;
	}
};

const cacheFirst = async request => {
	const cached = await caches.match(request);
	if (cached) return cached;
	const response = await fetch(request);
	const cache = await caches.open(RUNTIME);
	cache.put(request, response.clone());
	return response;
};

const staleWhileRevalidate = async request => {
	const cache = await caches.open(RUNTIME);
	const cached = await cache.match(request);
	const network = fetch(request)
		.then(response => {
			if (response.ok) cache.put(request, response.clone());
			return response;
		})
		.catch(() => cached);
	return cached || network;
};

self.addEventListener('fetch', event => {
	const { request } = event;
	if (request.method !== 'GET') return;
	const url = new URL(request.url);
	if (url.origin !== self.location.origin) return;

	const accept = request.headers.get('accept') || '';
	const isNavigation =
		request.mode === 'navigate' || accept.includes('text/html');

	if (isNavigation) {
		event.respondWith(networkFirst(request));
		return;
	}

	if (HASHED_ASSET.test(url.pathname)) {
		event.respondWith(cacheFirst(request));
		return;
	}

	event.respondWith(staleWhileRevalidate(request));
});
