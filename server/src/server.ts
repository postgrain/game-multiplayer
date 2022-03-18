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

server.listen(4200, () => {
  console.log("Server up on port 4200");
});

game.onStateChanged((state: GameState) => {
  sockets.emit("stateChanged", state);
});

game.onFellIntoATrap((playerId: any) => {
  sockets.to(playerId).emit("fellIntoATrap");
});

sockets.on("connection", (socket) => {
  console.log("> Novo client conectado: ", socket.id);

  // game.players.add({ playerId: socket.id });
  const player = game.addPlayer(socket.id);

  socket.emit("setup", game);

  socket.on("playerMoved", (command) => {
    game.movePlayer({ ...command, player });
    sockets.emit("stateChanged", game.state);
  });

  socket.on("disconnect", () => {
    // game.players.remove({ playerId: socket.id });
    game.players.remove(player);
    console.log(game.state.players[player.id]);
  });
});
