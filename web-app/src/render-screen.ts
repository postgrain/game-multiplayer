import { GameClient } from "./game-client";

export default function configureScreen(
  game: GameClient,
  canvas: HTMLCanvasElement,
  scoreElement: HTMLElement
) {
  const context = canvas.getContext("2d")!;
  const { width, height } = game.screen();
  canvas.setAttribute("width", width.toString());
  canvas.setAttribute("height", height.toString());

  return function renderScreen(requestAnimationFrame: any) {
    context.fillStyle = "white";
    context.clearRect(0, 0, width, height);

    for (const player of game.currentPlayers()) {
      let color = "black";

      if (player.me) {
        color = "#b8ad21";
        renderPlayerScore(scoreElement, player.score);
      }

      context.fillStyle = color;
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

// atualizar na tela o score do Me (Player)
function renderPlayerScore(scoreElement: HTMLElement, score: number) {
  scoreElement.innerText = score.toString();
}
