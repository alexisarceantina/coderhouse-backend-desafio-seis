import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import indexRouter from "./routes/indexRouter";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use("/", indexRouter);

io.on("connection", (socket) => {
  console.log("Usuario logueado");
  socket.emit("server-message", "hola desde el server");

  socket.on("client-message", (data) => {
    console.log(data);
  });
});

httpServer.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
