"use strict";
const app = require("../src/app");
const http = require("http");
const debug = require("debug")("nodestr:server");

const port = nomalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", OnListening);

console.log("API rodando na porta " + port);

function nomalizePort(val) {
	const port = parseInt(val, 10);

	if (isNaN(port)) {
		return val;
	}

	if (port >= 0) {
		return port;
	}

	return false;
}

function onError(error) {
	if (error.syscall !== "listen") {
		throw error;
	}

	const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

	switch (error.code) {
		case "EACCES":
			console.error(bind + " requires elevaed privileges");
			process.exit(1);
			break;
		case "EADDRINUSE":
			console.error(bind + " is already use");
			process.exit(1);
			break;
		default:
			throw error;
	}
}

function OnListening() {
	const addr = server.address();
	const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
	debug("Listening on " + bind);
}
