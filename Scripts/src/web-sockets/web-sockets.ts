import * as express from "express";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import * as path from "path";

const app = express();
const port = 8080;

// Serve static files from the 'public' directory
console.log("tets", path.join(__dirname, "public"));
app.use(express.static(path.join(__dirname, "public")));

// Create an HTTP server
const server = createServer(app);

// Create a WebSocket server and attach it to the HTTP server
const wss = new WebSocketServer({ server });

wss.on("connection", (ws: WebSocket) => {
  console.log("Client connected");

  ws.on("message", (message: string) => {
    console.log(`Received message => ${message}`);
    ws.send(`Yohoiii`);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  ws.send("Welcome to the ayush screen");
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
