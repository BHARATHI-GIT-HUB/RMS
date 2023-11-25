const express = require("express");
const app = express();
const http = require("http");

// const { Server } = require("socket.io");

// let io;

// // Properly initialize socket.io with the HTTP server
// export const initializeSocketIO = (server) => {
//   io = new Server(server, {
//     cors: {
//       origin: "*",
//       methods: ["GET", "POST", "PUT", "DELETE"],
//     },
//   });

//   io.on("connection", (socket: any) => {
//     console.log("WebSocket connection established");
//     socket.emit("welcome", "Welcome to the WebSocket server!");
//   });
// };

// export const getSocketIO = () => {
//   if (!io) {
//     throw new Error("SocketIO has not been initialized.");
//   }
//   return io;
// };
