/* This code simulates how a backend may respond to requests */

// Load SQL.js
self.importScripts('assets/vendor/sqljs/sql.js');

// Load Database
var SQL = null;
var db = null;

fetch('assets/database.encrypted.db' + '?t=' + new Date().getTime()).then(function(response) {
	return response.arrayBuffer();
}).then(async function(encrypted) {
	encrypted = new Uint8Array(encrypted);
	let iv = encrypted.slice(0, 16);
	let tag = encrypted.slice(16, 32);
	let data = encrypted.slice(32);

	cipher = new Uint8Array(data.length + tag.length);
	cipher.set(data);
	cipher.set(tag, data.length);

	let key = await crypto.subtle.importKey("raw",
		new Uint8Array(('10f441ddb06101e01ed44677f0f14d2994af049d7854b34ff26258a2a084688c').match(/.{1,2}/g).map(byte => parseInt(byte, 16))),
		{name: "AES-GCM", length: 256},
		false,
		["encrypt","decrypt"]
	);
	try{
		decrypted = await crypto.subtle.decrypt({
			"name" : "AES-GCM",
			"iv": iv
		}, key, cipher);

		SQL = await initSqlJs();
		db = new SQL.Database(new Uint8Array(decrypted));
	} catch(e) {
		console.log('Failed to load database.');
	}
});

const prepResponse = async (object) => {
	return new Response(JSON.stringify(object), {
		headers: {
			"Server" : "Fake-Server-v0.1",
			"Content-Type" : "application/json"
		}
	});
};

const getParameters = function(url){
	let array = url.match(/\?([^#]*)#*.*$/i);
	if (!array) return {};
	array = array[1].split('&');
	let params = {};
	for (let i = 0; i < array.length; i++) {
		let p = array[i].split('=');
		params[p[0]] = p.length > 1 ? decodeURIComponent(p[1]) : null;
	}
	return params;
};

// Fake Endpoints
const endpoints = {
	'/signin' : function(request, url) {
		if (!db) return this.respondWith(prepResponse({error : 'Failed to connect to the database.'}));

		let params = getParameters(url.search);
		let user = null;
		let notes = null;
		
		let query = `SELECT username FROM users WHERE username = '${params['username']}' AND password = '${params['password']}';`;
		try {
			user = db.exec(query);
		} catch (e) {
			return this.respondWith(prepResponse({
				query : query,
				error : e.message
			}));
		}
		if (!user || !user[0] || !user[0].values || user[0].values.length == 0) {
			return this.respondWith(prepResponse({
				//query : query,
				error : 'Authentication Failed'
			}));
		}
		username = user[0].values[0][0];

		query = `SELECT note FROM notes WHERE username = '${username}';`;
		try {
			notes = db.exec(query);
		} catch (e) {
			return this.respondWith(prepResponse({
				query : query,
				error : e.message
			}));
		}
		notes = notes[0].values[0];

		return this.respondWith(prepResponse({
			user : username,
			notes : notes
		}));
	}
}

// Handle requests
self.addEventListener('fetch', function(event) {
	if (event.request.method != "POST") return;

	console.log('handled by fakebackend', event.request);

	// Analyse URL
	let url = new URL(event.request.url);
	// If endpoint exists, call it
	if (endpoints.hasOwnProperty(url.pathname))
		endpoints[url.pathname].call(event, event.request, url);
});
