const WebSocket = require("ws");
const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");


const getContentType = function(filePath) {
	let extname = path.extname(filePath);
	switch (extname) {
		case ".js":
			return "text/javascript";
		case ".css":
			return "text/css";
		case ".json":
			return "application/json";
		case ".png":
			return "image/png";
		case ".jpg":
			return "image/jpg";
		case ".zip":
			return "application/zip, application/octet-stream";
	}
	return "text/html";
};

const server = http.createServer(function (req, res) {
	let filePath = "/" + req.url.replace(/[^A-Za-z0-9\.\-_]+/g, '').replace(/\.\.+/g, '');
	if (filePath != req.url) {
		res.writeHead(404, { "Content-Type": "text/html" });
		res.end("404 Not Found");
		return;
	}
	if (filePath == "/") {
		filePath = path.join(__dirname, "index.html");
	}
	else {
		filePath = path.join(__dirname, "static", filePath);
		if (!fs.existsSync(filePath)) {
			res.writeHead(404, { "Content-Type": "text/html" });
			res.end("404 Not Found");
			return;
		}
	}
	
	let contentType = getContentType(filePath);

	fs.readFile(filePath, function (error, content) {
		if (error) {
			res.writeHead(404, {"Content-Type": "text/html"});
			res.end("404 Not Found");
		}
		else {
			res.writeHead(200, { "Content-Type": contentType });
			res.end(content, "utf-8");
		}
	});
});


let name_mod = crypto.createHash('sha256').update(crypto.randomBytes(64)).digest('hex');
let state = crypto.createHash('sha256').update(crypto.randomBytes(64)).digest('hex');
let clients = new Set();

const wss = new WebSocket.Server({ server });
wss.on("connection", function (ws, req) {
	let ip = req.socket.remoteAddress;
	let name = crypto.createHash('sha256').update(name_mod + ip).digest('hex');
	ws.name = name;
	clients.add(ws);

	// Report client connected
	clients.forEach(function (client) {
		if (client !== ws) {
			client.send(JSON.stringify({
				"type" : "connected",
				"name" : name
			}));
		}
	});
	ws.send(JSON.stringify({
		"type" : "init",
		"name" : name,
		"state" : state
	}));
	clients.forEach(function (client) {
		if (client !== ws) {
			ws.send(JSON.stringify({
				"type" : "connected",
				"name" : client.name
			}));
		}
	});

	ws.on("message", function (data) {
		try {
			data = data.toString('utf8');
			data = JSON.parse(data);
		} catch (e) {
			console.log('Failed to decode data', data);
			return;
		}

		if (data.hasOwnProperty('message')) {
			state = crypto.createHash('sha256').update(state).digest('hex');
			//console.log(state);

			clients.forEach(function (client) {
				if (client !== ws) {
					client.send(JSON.stringify({
						"type" : "message",
						"name" : name,
						"message" : data.message
					}));
				}
			});
		}
		else {
			console.log('Unknown message', data);
		}
	});

	ws.on("close", function () {
		clients.delete(ws);
		clients.forEach(function (client) {
			client.send(JSON.stringify({
				"type" : "disconnected",
				"name" : name
			}));
		});
	});
});

const port = 4242;
server.listen(port, function () {
	console.log(`Server started at http://localhost:${port}`);
});
