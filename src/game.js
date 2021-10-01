export default function createGame() {
  const state = {
      players: {},
      fruits: {},
      screen: {
        width: 10,
        height: 10
      }
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
  }

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
      const playerId = command.playerId
      const playerX = command.playerX
      const playerY = command.playerY

      state.players[playerId] = {
          x: playerX,
          y: playerY
      }
  }

  function removePlayer(command) {
      const playerId = command.playerId

      delete state.players[playerId]
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
      console.log(`Move ${command.playerId} with ${command.keyPressed}`)

      const keyPressed = command.keyPressed
      const player = state.players[command.playerId]

      const acceptedMoves = {
          ArrowUp(player) {
              console.log('Moving player Up')
              if (player.y - 1 >= 0) {
                  player.y = player.y - 1
              }
          },
          ArrowDown(player) {
              console.log('Moving player Down')
              if (player.y + 1 < state.screen.height) {
                  player.y = player.y + 1
              }
          },
          ArrowRight(player) {
              console.log('Moving player Right')
              if (player.x + 1 < state.screen.width) {
                  player.x = player.x + 1
              }
          },
          ArrowLeft(player) {
              console.log('Moving player Left')
              if (player.x - 1 >= 0) {
                  player.x = player.x - 1
              }
          }
      }

      const moveFunction = acceptedMoves[keyPressed];

      if(player && moveFunction){
          moveFunction(player)
          checkForFruitCollision(command.playerId)
      }
  }

  function checkForFruitCollision(playerId) {
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

  return {
      state,
      movePlayer,
      addPlayer,
      removePlayer,
      addFruit,
      removeFruit
  }
}
