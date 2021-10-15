export default function configureScreen(canvas, game) {
  const context = canvas.getContext("2d");
  const { width, height } = game.screen();
  canvas.setAttribute("width", width);
  canvas.setAttribute("height", height);

  return function renderScreen(requestAnimationFrame) {
    context.fillStyle = "white";
    context.clearRect(0, 0, width, height);

    for (const player of game.currentPlayers()) {
      context.fillStyle = "black";
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
