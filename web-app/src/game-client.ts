import { Movement, MovementAction } from "./player-movement";

export interface Coordinates {
  x: number;
  y: number;
}

export interface PlayerPayload extends Coordinates {
  score: number
}

export interface Fruit extends Coordinates {}

export interface Trap extends Coordinates {}

class Player implements PlayerPayload {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly score: number,
    public readonly id: string,
    public readonly me: boolean,
  ) {}
}

export interface GameState {
  screen: {
    width: number;
    height: number;
  };
  players: { [key: string]: Player };
  fruits: { [key: string]: Fruit };
  traps: { [key: string]: Trap };
}

export class GameClient {
  private state: GameState = {
    screen: {
      width: 0,
      height: 0,
    },
    players: {},
    fruits: {},
    traps: {}
  };

  constructor(
    private playerId: string,
    private movementAction: MovementAction
  ) {}

  screen() {
    return this.state.screen;
  }

  currentPlayers() {
    return Object.values(this.state.players);
  }

  currentFruits() {
    return Object.values(this.state.fruits);
  }

  currentTraps() {
    return Object.values(this.state.traps);
  }

  setup({ screen, players, fruits, traps }: any) {
    Object.entries<PlayerPayload>(players).forEach(([key, value]) => {
      players[key] = new Player(value.x, value.y, value.score, key, key == this.playerId);
    });

    this.state.screen = screen;
    this.state.players = players;
    this.state.fruits = fruits;
    this.state.traps = traps;
  }

  playerMoved(movement: Movement) {
    console.log("> player moved", { movement });
    this.movementAction.playerDidMove(this.playerId, movement);
  }
}
