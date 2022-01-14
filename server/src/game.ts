import {
  MoveUpAction,
  MoveDownAction,
  MoveRightAction,
  MoveLeftAction,
} from "./player-movements";
import crypto from "crypto";

export interface Coordinates {
  x: number;
  y: number;
}

export interface Player extends Coordinates {
  score: number
}

export interface Fruit extends Coordinates {}

export interface Trap extends Coordinates {}

export interface GameState {
  players: { [key: string]: Player };
  fruits: { [key: string]: Fruit };
  traps: { [key: string]: Trap };
  screen: {
    width: number;
    height: number;
  };
}

export default function createGame() {
  const observers: any = [];
  let trapObserver: any = () => {};
  const state: GameState = {
    players: {},
    fruits: {},
    traps: {},
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

  _spawnFruits();
  _spawnTraps();

  function generateRandomCoordinates() {
    return {
      x: Math.floor(Math.random() * state.screen.width + 1),
      y: Math.floor(Math.random() * state.screen.height + 1),
    };
  }

  function addPlayer(command: any) {
    const playerId = command.playerId;
    state.players[playerId] = { ...generateRandomCoordinates(), score: 0 };
  }

  function removePlayer(command: any) {
    const playerId = command.playerId;

    delete state.players[playerId];
  }

  function addFruit(command: any) {
    state.fruits[command.fruitId] = {
      x: command.fruitX,
      y: command.fruitY,
    };
  }

  function removeFruit(command: any) {
    const fruitId = command.fruitId;

    delete state.fruits[fruitId];
  }

  function addTrap(command: any) {
    state.traps[command.trapId] = {
      x: command.trapX,
      y: command.trapY,
    };
  }

  function removeTrap(command: any) {
    const trapId = command.trapId;

    delete state.traps[trapId];
  }

  function _spawnFruits() {
    setInterval(() => {
      var id = crypto.randomInt(0, 1000000);
      const { x, y } = generateRandomCoordinates();
      addFruit({ fruitId: id, fruitX: x, fruitY: y });
      notify();
    }, 1000);
  }

  function _spawnTraps() {
    setInterval(() => {
      var id = crypto.randomInt(0, 1000000);
      const { x, y } = generateRandomCoordinates();
      // TODO: ao adicionar uma trap, deve ser verificado se a trap está na mesma coordenada que uma fruta.
      // se estiver, a trap está numa posição invalida e deve ser gerado novamente uma coordenada para a trap.
      // isso se repete até que uma posição válida para a trap seja encontrada.
      addTrap({ trapId: id, trapX: x, trapY: y });
      notify();
    }, 15000);
  }

  /**
   * Padrões de projeto.
   * Utilizando o Command Pattern e o Strategy.
   *
   * Ver arquivo exemplos/command.ts
   */

  // strategy pattern + factory pattern

  function movePlayer(command: any) {
    // const keyPressed = command.movement; // https://refactoring.guru/pt-br/inline-temp
    const player = state.players[command.playerId];

    const MovementMap: { [key: string]: any } = {
      MoveUp: MoveUpAction,
      MoveDown: MoveDownAction,
      MoveRight: MoveRightAction,
      MoveLeft: MoveLeftAction,
    };

    const Movement = MovementMap[command.movement];

    if (player && Movement) {
      const movement = new Movement(state, player);
      movement.execute();
      checkForFruitCollision(command.playerId);
      checkForTrapCollision(command.playerId);
    }
  }

  function checkForTrapCollision(playerId: any) {
    const player = state.players[playerId];

    for (const trapId in state.traps) {
      const trap = state.traps[trapId];
      if (player.x === trap.x && player.y === trap.y) {
        removeTrap({ trapId });
        fellIntoATrap(playerId);
      }
    }
  }

  function checkForFruitCollision(playerId: any) {
    const player = state.players[playerId];

    for (const fruitId in state.fruits) {
      const fruit = state.fruits[fruitId];
      if (player.x === fruit.x && player.y === fruit.y) {
        removeFruit({ fruitId });
        incrementPlayerScore(player)
      }
    }
  }

  function incrementPlayerScore(player: Player) {
    player.score += 1
  }

  function onStateChanged(observerFn: (state: GameState) => void) {
    observers.push(observerFn);
  }

  function notify() {
    observers.forEach((observerFn: (state: GameState) => void) => {
      observerFn(state);
    });
  }

  function onFellIntoATrap(fn: any) {
    trapObserver = fn;
  }

  function fellIntoATrap(playerId: any) {
    trapObserver(playerId);
  }

  return {
    state,
    movePlayer,
    addPlayer,
    removePlayer,
    addFruit,
    removeFruit,
    addTrap,
    removeTrap,
    onStateChanged,
    onFellIntoATrap,
  };
}
