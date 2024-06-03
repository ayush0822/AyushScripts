"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var http_1 = require("http");
var ws_1 = require("ws");
var path = require("path");
var app = express();
var port = 8080;
// Serve static files from the 'public' directory
console.log("tets", path.join(__dirname, "public"));
app.use(express.static(path.join(__dirname, "public")));
// Create an HTTP server
var server = (0, http_1.createServer)(app);
// Create a WebSocket server and attach it to the HTTP server
var wss = new ws_1.WebSocketServer({ server: server });
wss.on("connection", function (ws) {
    console.log("Client connected");
    ws.on("message", function (message) {
        console.log("Received message => ".concat(message));
        ws.send("Dear Miss Srivastava, kindly notice it is my day to pamper my baby gurl, please do not intervene. Proo proo max love for my baby gurl, don't be jealous miss srivastava");
    });
    ws.on("close", function () {
        console.log("Client disconnected");
    });
    ws.send("Welcome to the ayush screen");
});
server.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
