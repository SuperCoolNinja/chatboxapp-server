module.exports = handleChat = {
  setup(socket) {
    socket.on("chat_message", (message, pseudo) => {
      console.log(`New message send from ${pseudo}`);
      // Broadcast it to all users :
      socket.broadcast.emit("send_message", message, pseudo);
    });
  },
};
