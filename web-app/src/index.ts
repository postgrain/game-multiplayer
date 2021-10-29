import createKeyboardListener from "./keyboard-listener";
import configureScreen from "./render-screen";
import createGameClient from "./game-client";
import { io } from "socket.io-client";

const gameClient = createGameClient();
// TODO: usar env var para url do servidor
const socket = io("ws://localhost:3000");

socket.on("connect", () => {
  console.log("> Conexão aberta com o server: ", socket.id);
});

const buttonMovementMap: any = {
  Up: "MoveUp",
  Down: "MoveDown",
  Right: "MoveRight",
  Left: "MoveLeft",
};

const playerMoved = (movement: any) => {
  console.log("> player moved", { movement });
  socket.emit("playerMoved", {
    playerId: socket.id,
    movement,
  });
};

socket.on("setup", (game: any) => {
  gameClient.setup({
    screen: game.state.screen,
    players: game.state.players,
    fruits: game.state.fruits,
  });

  const canvas = document.getElementById("screen");
  configureScreen(canvas, gameClient)(requestAnimationFrame);

  const movementButtons = document.querySelectorAll(".movement-btn");
  movementButtons.forEach((button) =>
    button.addEventListener("click", (event: any) => {
      playerMoved(buttonMovementMap[event.target.dataset.movement]);
    })
  );

  // SOLID
  // open closed principle

  const keyboardListener = createKeyboardListener(document);

  const keyboardMovementsMap: any = {
    38: "MoveUp",
    87: "MoveUp",

    40: "MoveDown",
    83: "MoveDown",

    37: "MoveLeft",
    65: "MoveLeft",

    39: "MoveRight",
    68: "MoveRight",
  };

  keyboardListener.subscribe((keyEvent: any) => {
    const movement = keyboardMovementsMap[keyEvent.keyCode];

    if (movement) {
      playerMoved(movement);
    }
  });

  socket.on("stateChanged", (state: any) => {
    gameClient.setup({
      screen: state.screen,
      players: state.players,
      fruits: state.fruits,
    });
  });
});
