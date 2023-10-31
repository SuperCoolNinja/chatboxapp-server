module.exports = handleUser = {
  _usersConnected: [],

  setup(socket, io) {
    const userData = {
      id: socket.id,
      pseudo: "unknown",
    };

    this._usersConnected.push(userData);

    io.emit("onConnection", this._usersConnected);

    socket.on("changePseudo", (newPseudo) =>
      this.changePseudo(newPseudo, socket, io, this._usersConnected)
    );
    socket.on("disconnect", () =>
      this.onDisconnect(socket, io, this._usersConnected)
    );
  },

  changePseudo(newPseudo, socket, io, listUsers) {
    const getUser = listUsers.find((v) => v.id === socket.id);
    getUser["pseudo"] = newPseudo;

    // Trigger to the client-side the new pseudo
    socket.emit("onChangePseudo", newPseudo);

    // Update the users data and synchronize it to all clients
    io.emit("onUpdateUserList", this._usersConnected);
  },

  onDisconnect(socket, io, listUsers) {
    console.log(`user : ${socket.id} has been disconnected.`);

    // Update the users list connected to remove the one disconnected
    this._usersConnected = listUsers.filter((v) => v.id !== socket.id);

    // Trigger the client to update the usersConnected list
    io.emit("onUpdateUserList", this._usersConnected);
  },
};
