const express = require("express");
const http = require("http");
const helmet = require("helmet");
const cors = require("cors");
const { Server } = require("socket.io");
const handle_events = require("./socket/events.js");

// Configuration :
const app = express();
const server = http.createServer(app);

const Server_PORT = process.env.PORT || 4000;

// Middlewares :
app.use(helmet());
app.use(cors());

// Setup Socket.io :
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// handle all events : 
handle_events(io);

// Setup serveur :
server.listen(Server_PORT, () =>
  console.log(`Server listening on port http://localhost:${Server_PORT}`)
);
