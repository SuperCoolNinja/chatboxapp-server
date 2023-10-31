const handleUser = require("../controller/users");
const handleChat = require("../controller/chat");

module.exports = (io) => {
  io.on("connection", (socket) => {
    handleUser.setup(socket, io);
    handleChat.setup(socket);
  });
};
