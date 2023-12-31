const express = require("express");
const http = require("http");
const helmet = require("helmet");
const cors = require("cors");
const { Server } = require("socket.io");
const handle_events = require("./src/socket/events.js");

require("dotenv").config();

// Configuration :
const app = express();
const server = http.createServer(app);

const Server_PORT = process.env.PORT || 4000;

// Middlewares :
app.use(helmet());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

// Setup Socket.io :
const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

app.get("/", (req, res) => {
  res.send("Hello, this is the root path!");
});

// Handle all events:
handle_events(io);

// Setup server:
server.listen(Server_PORT, () =>
  console.log(`Server listening on port ${Server_PORT}`)
);
