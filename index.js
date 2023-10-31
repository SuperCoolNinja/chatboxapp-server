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
    orgin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

// Setup Socket.io :
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => res.send("Hello world!"));

// handle all events :
handle_events(io);

// Setup serveur :
server.listen(Server_PORT, () =>
  console.log(`Server listening on port ${Server_PORT}`)
);
