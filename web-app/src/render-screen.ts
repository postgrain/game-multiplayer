import { GameClient } from "./game-client";

export default function configureScreen(
  canvas: HTMLCanvasElement,
  game: GameClient
) {
  const context = canvas.getContext("2d")!;
  const { width, height } = game.screen();
  canvas.setAttribute("width", width.toString());
  canvas.setAttribute("height", height.toString());

  return function renderScreen(requestAnimationFrame: any) {
    context.fillStyle = "white";
    context.clearRect(0, 0, width, height);

    for (const player of game.currentPlayers()) {
      context.fillStyle = player.me ? "#b8ad21" : "black";
      context.fillRect(player.x, player.y, 1, 1);
    }

    for (const fruit of game.currentFruits()) {
      context.fillStyle = "green";
      context.fillRect(fruit.x, fruit.y, 1, 1);
    }

    requestAnimationFrame(() => {
      renderScreen(requestAnimationFrame);
    });
  };
}
