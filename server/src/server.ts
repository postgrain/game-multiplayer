import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import createGame from "./game";
import { GameState } from "./game";

const app = express();

app.use(cors());

const server = http.createServer(app);
const sockets = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const game = createGame();

game.addFruit({ fruitId: "fruit1", fruitX: 5, fruitY: 5 });
game.addFruit({ fruitId: "fruit2", fruitX: 7, fruitY: 5 });

server.listen(3000, () => {
  console.log("Server up on port 3000");
});

game.onStateChanged((state: GameState) => {
  sockets.emit("stateChanged", state);
});

sockets.on("connection", (socket) => {
  console.log("> Novo client conectado: ", socket.id);
  game.addPlayer({ playerId: socket.id });
  socket.emit("setup", game);

  socket.on("playerMoved", (command) => {
    game.movePlayer(command);
    sockets.emit("stateChanged", game.state);
  });

  socket.on("disconnect", () => {
    game.removePlayer({ playerId: socket.id });
  });
});
