import "express-async-errors";
import express, { Express } from "express";
import { addRoutes } from "./app/routes/index";
import { addMiddlewares } from "./app/middlewares/index";
import http from "http";
import { Server } from "socket.io";
const app: Express = express();

addMiddlewares(app);

addRoutes(app);

app.use(function (err: any, req: any, res: any, next: any) {
  res.status(403);
  res.json({
    data: [],
    status: "fail",
    message: err.toString(),
  });
});

const server = http.createServer(app);
export const SOCKET = new Server(server, { cors: { origin: "*" } });

SOCKET.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

export default server;
