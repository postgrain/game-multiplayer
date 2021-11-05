import configureScreen from "./render-screen";
import { GameClient } from "./game-client";
import { GameActionsSocketIO } from "./game-actions-socketio";
import {
  PlayerMovementListener,
  ButtonsListener,
  KeyboardListener,
} from "./player-movement";
import { io } from "socket.io-client";

// TODO: usar env var para url do servidor
const socket = io("ws://localhost:3000");

socket.on("connect", () => {
  console.log("> Conexão aberta com o server: ", socket.id);
});

socket.on("setup", (game: any) => {
  const gameActions = new GameActionsSocketIO(socket);
  const gameClient = new GameClient(socket.id, gameActions);
  const movementListener = new PlayerMovementListener(gameClient);
  new ButtonsListener(movementListener);
  new KeyboardListener(movementListener);

  gameClient.setup({
    screen: game.state.screen,
    players: game.state.players,
    fruits: game.state.fruits,
  });

  const canvas = document.getElementById("screen");
  configureScreen(canvas, gameClient)(requestAnimationFrame);

  socket.on("stateChanged", (state: any) => {
    gameClient.setup({
      screen: state.screen,
      players: state.players,
      fruits: state.fruits,
    });
  });
});
