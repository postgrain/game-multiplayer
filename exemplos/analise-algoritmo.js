/**
             * Análise de algoritmos. Analise de complexidade algoritimica
             *
             * O tempo de execução desse algoritmo varia de acordo com a quantidade de frutas e de jogadores no jogo.
             * Quanto mais jogadores online, mais tempo demora para executar a função.
             *
             * Big O (n*y)
             *
             * N players * Y fruits
             * 3 players * 2 fruits = 6 iterações
             *
             */
 function checkForFruitCollision() {
    for (const playerId in state.players) {
        const player = state.players[playerId];

        for (const fruitId in state.fruits) {
            console.log(`Checking ${playerId} and ${fruitId}`);

            const fruit = state.fruits[fruitId]
            if (player.x === fruit.x && player.y === fruit.y) {
                console.log(`Collision between ${fruitId} and player ${playerId}`)
                removeFruit({ fruitId });
            }
        }
    }
}

/**
 * O tempo de execução desse algoritmo varia de acordo com a quantidade de frutas no jogo.
 * A função independe da quantidade de jogadores online. O tempo de execução da função está sempre relacionado
 * com a quantidade de frutas no tabuleiro.
 * Big O (Y)
 *
 * Y fruits
 * 2 fruits = 2 iterações
 *
 */
function checkForFruitCollision2(playerId) {
    const player = state.players[playerId];

    for (const fruitId in state.fruits) {
        console.log(`Checking ${playerId} and ${fruitId}`);

        const fruit = state.fruits[fruitId]
        if (player.x === fruit.x && player.y === fruit.y) {
            console.log(`Collision between ${fruitId} and player ${playerId}`)
            removeFruit({ fruitId });
        }
    }
}

/**
 * Tempo de execução constante.
 * Big O (1)
 *
 */
function checkForFruitCollision3(playerId) {
    const player = state.players[playerId];
    const cell = state.game.board[player.x][player.y]

    console.log(`Checking ${playerId} and ${fruitId}`);
    if (cell.hasFruidOnIt()) {
        console.log(`Collision between ${fruitId} and player ${playerId}`)
        removeFruit({ fruitId });
    }
}
