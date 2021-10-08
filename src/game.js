export default function createGame() {
  const state = {
    players: {},
    fruits: {},
    screen: {
      width: 50,
      height: 50,
    },
    // board: [
    //     // x, y
    //     {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
    //     {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
    //     {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
    //     {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
    //     {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
    //     {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
    //     {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
    //     {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
    //     {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
    //     {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
    // ]
  };

  /**
   * # Abstração adiantada. Possíveis efeitos negativos no sistema.
   * Integridade conceitual -> complexidade acidental

   * 1. pode existir mais de uma fruta na mesma coord, mas não mais que um player.
   * 2. uma fruta não pode ser adicionada em cima de player
   * 3. uma fruta não pode ser adicionada próximo de um player

  function addObject(command, key) {
      for (let player of state.players) {
          if (player.x == command.x && player.y == command.y) {
              if (key === 'players') {
                  console.log(`Collision between ${command.objectId} and ${player.objectId}`);
              } else if(key === 'fruits') {
                  console.log(`Fruits cannot be added over players`);
              }
              return;
          }
      }

      state[key][command.objectId] = {
          x: command.x,
          y: command.y
      }
  }

  function removeObject(command, key) {
      delete state[key][command.objectId]
  }
  **/

  function addPlayer(command) {
    const playerId = command.playerId;
    const playerX = Math.floor(Math.random() * state.screen.width + 1);
    const playerY = Math.floor(Math.random() * state.screen.height + 1);

    state.players[playerId] = {
      x: playerX,
      y: playerY,
    };
  }

  function removePlayer(command) {
    const playerId = command.playerId;

    delete state.players[playerId];
  }

  function addFruit(command) {
    state.fruits[command.fruitId] = {
      x: command.fruitX,
      y: command.fruitY,
    };
  }

  function removeFruit(command) {
    const fruitId = command.fruitId;

    delete state.fruits[fruitId];
  }

  /**
   * Padrões de projeto.
   * Utilizando o Command Pattern e o Strategy.
   *
   * Ver arquivo exemplos/command.ts
   */

  // strategy pattern + factory pattern

  function movePlayer(command) {
    const keyPressed = command.keyPressed;
    const player = state.players[command.playerId];

    const acceptedMoves = {
      ArrowUp(player) {
        if (player.y - 1 >= 0) {
          player.y = player.y - 1;
        }
      },
      ArrowDown(player) {
        if (player.y + 1 < state.screen.height) {
          player.y = player.y + 1;
        }
      },
      ArrowRight(player) {
        if (player.x + 1 < state.screen.width) {
          player.x = player.x + 1;
        }
      },
      ArrowLeft(player) {
        if (player.x - 1 >= 0) {
          player.x = player.x - 1;
        }
      },
    };

    const moveFunction = acceptedMoves[keyPressed];

    if (player && moveFunction) {
      moveFunction(player);
      checkForFruitCollision(command.playerId);
    }
  }

  function checkForFruitCollision(playerId) {
    const player = state.players[playerId];

    for (const fruitId in state.fruits) {
      const fruit = state.fruits[fruitId];
      if (player.x === fruit.x && player.y === fruit.y) {
        removeFruit({ fruitId });
      }
    }
  }

  return {
    state,
    movePlayer,
    addPlayer,
    removePlayer,
    addFruit,
    removeFruit,
  };
}
