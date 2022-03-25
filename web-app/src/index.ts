import configureScreen from "./render-screen";
import { GameClient } from "./game-client";
import { MovementActionSocketIO } from "./player-movement/movement-action-socketio";
import { PlayerMovementServiceProvider } from "./player-movement";
import { io } from "socket.io-client";

const socket = io(`ws://${process.env.API_URL}`);
let movementService: PlayerMovementServiceProvider;
socket.on("connect", () => {
  console.log("> Conexão aberta com o server: ", socket.id);
});

socket.on("disconnect", () => {
  console.log("> Conexão perdida com o servidor: ", socket.id);
  movementService?.unregister();
});

socket.on("setup", ({ screen, players, fruits, traps }: any) => {
  const gameActions = new MovementActionSocketIO(socket);
  const gameClient = new GameClient(socket.id, gameActions);

  movementService = new PlayerMovementServiceProvider();
  movementService.register(gameClient);

  gameClient.setup({
    screen,
    players,
    fruits,
    traps,
  });

  const canvas = document.getElementById("screen") as HTMLCanvasElement;
  const score = document.getElementById("score") as HTMLElement;

  configureScreen(gameClient, canvas, score)(requestAnimationFrame);

  socket.on("stateChanged", ({ screen, players, fruits, traps }: any) => {
    gameClient.setup({
      screen,
      players,
      fruits,
      traps,
    });
  });

  socket.on("fellIntoATrap", () => {
    alert("Você caiu em um buraco! hahahahahah!");
  });
});
