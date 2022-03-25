import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import { Game, GameState } from "./game";

const app = express();

app.use(cors());

const server = http.createServer(app);
const sockets = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const game = Game.create();

server.listen(4200, () => {
  console.log("Server up on port 4200");
});

game.onStateChanged((state: GameState) => {
  sockets.emit("stateChanged", state);
});

game.onFellIntoATrap((playerId: string) => {
  sockets.to(playerId).emit("fellIntoATrap");
});

sockets.on("connection", (socket) => {
  console.log("> Novo client conectado: ", socket.id);

  const player = game.addPlayer(socket.id);

  socket.emit("setup", game.state);

  socket.on("playerMoved", (command) => {
    game.movePlayer({ ...command, player });
  });

  socket.on("disconnect", () => {
    game.players.remove(player);
    console.log(game.state.players[player.id]);
  });
});
