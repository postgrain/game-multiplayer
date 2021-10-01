export default function renderScreen(canvas, game, requestAnimationFrame) {
    const context = canvas.getContext('2d')
    context.fillStyle = 'white'
    context.clearRect(0, 0, game.state.screen.width, game.state.screen.height)

    for (const playerId in game.state.players) {
        const player = game.state.players[playerId]
        context.fillStyle = 'black'
        context.fillRect(player.x, player.y, 1, 1)
    }

    for (const fruitId in game.state.fruits) {
        const fruit = game.state.fruits[fruitId]
        context.fillStyle = 'green'
        context.fillRect(fruit.x, fruit.y, 1, 1)
    }

    requestAnimationFrame(() => {
        renderScreen(canvas, game, requestAnimationFrame);
    })
}
