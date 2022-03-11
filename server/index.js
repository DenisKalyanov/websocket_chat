const express = require("express");
const PORT = process.env.PORT || 5002;
const WebSocket = require("ws");
const http = require("http");

const messages = [
  { name: "Alex", message: "Hello" },
];

const app = express();
const server = http.createServer(app);
const webSocketServer = new WebSocket.Server({ server });

webSocketServer.on("connection", (ws) => {
  ws.on("message", (m) => {
    messages.push(JSON.parse(m.toString()));
    console.log(JSON.stringify(messages))
    webSocketServer.clients.forEach((client) => client.send(JSON.stringify(messages)));
  });

  ws.on("error", (e) => ws.send(e));

  ws.send(JSON.stringify(messages));
});

server.listen(PORT, () => {
  console.log(`Server is running port: ${PORT}`);
});
