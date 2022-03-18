import {
  MoveUpAction,
  MoveDownAction,
  MoveRightAction,
  MoveLeftAction,
} from "./player-movements";
import { Fruits, FruitsSpawn } from "./fruits";
import { Coordinates } from "./coordinate";
import { Traps, TrapsSpawn } from "./traps";
import { Player, PlayersManager } from "./players";

export interface Fruit extends Coordinates {}

export interface Trap extends Coordinates {}

export interface GameState {
  players: { [key: string]: { score: number } & Coordinates };
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
  let state: GameState = {
    players: {},
    fruits: {},
    traps: {},
    screen: {
      width: 50,
      height: 50,
    },
  };
  const fruits = new Fruits([state, mutateState]);
  const traps = new Traps([state, mutateState]);
  const players = new PlayersManager([state, mutateState]);

  const game = {
    fruits,
    traps,
    players,
    get state() {
      return state;
    },
    movePlayer,
    addPlayer,
    removePlayer,
    onStateChanged,
    onFellIntoATrap,
    generateRandomCoordinates,
    notify,
  };

  const fruitsSpawn = new FruitsSpawn(game);
  const trapsSpawn = new TrapsSpawn(game);
  fruitsSpawn.spawn();
  trapsSpawn.spawn();

  function generateRandomCoordinates() {
    return {
      x: Math.floor(Math.random() * state.screen.width + 1),
      y: Math.floor(Math.random() * state.screen.height + 1),
    };
  }

  function addPlayer(playerId: string) {
    const player = new Player(playerId, generateRandomCoordinates());
    players.add(player);
    return player;
  }

  function removePlayer(command: any) {
    const playerId = command.playerId;

    delete state.players[playerId];
  }

  /**
   * Padrões de projeto.
   * Utilizando o Command Pattern e o Strategy.
   *
   * Ver arquivo exemplos/command.ts
   */

  // strategy pattern + factory pattern

  function movePlayer(command: { movement: string; player: Player }) {
    // const keyPressed = command.movement; // https://refactoring.guru/pt-br/inline-temp

    const MovementMap: { [key: string]: any } = {
      MoveUp: MoveUpAction,
      MoveDown: MoveDownAction,
      MoveRight: MoveRightAction,
      MoveLeft: MoveLeftAction,
    };

    const Movement = MovementMap[command.movement];

    if (command.player && Movement) {
      const movement = new Movement(state, command.player);
      movement.execute();
      players.move(command.player);
      movementExecuted(command.player);
    }
  }

  function movementExecuted(player: Player) {
    fruits.removeWhenCollided(state.players[player.id], () => {
      players.incrementsScoreFor(player);
    });

    traps.removeWhenCollided(state.players[player.id], () => {
      trapObserver(player.id);
    });
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

  function mutateState(newState: Partial<GameState>) {
    state = {
      ...state,
      ...newState,
    };
  }

  return game;
}
