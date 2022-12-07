const express = require("express");
const { Server } = require("socket.io");
var http = require("http");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

var server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://chat-bot-rosy-beta.vercel.app",
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Chat using Socket.io by Supriya");
  res.end();
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("joinRoom", (room) => {
    socket.join(room);
  });

  socket.on("newMessage", ({ newMessage, room }) => {
    io.in(room).emit("getLatestMessage", newMessage);
  });
});

const port = process.env.PORT || 8000;

server.listen(port, console.log(`App started at port ${port}`));
