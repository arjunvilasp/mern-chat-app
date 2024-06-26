import { Server } from "socket.io";
import expess from "express";
import http from "http";
import { log } from "console";

const app = expess();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

export const getSocketReceiver = (receiverId) => {
  return socketUsers[receiverId];
};

const socketUsers = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId != "undefined") socketUsers[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(socketUsers));

  socket.on("disconnect", () => {
    delete socketUsers[userId];
  });
});

export { app, server, io };
