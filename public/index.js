const socket = io();

socket.on("server-message", (data) => {
  console.log(data);
  socket.emit("client-message", "Hola desde el cliente");
});
