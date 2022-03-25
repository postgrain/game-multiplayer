import {
  MoveUpAction,
  MoveDownAction,
  MoveRightAction,
  MoveLeftAction,
} from "./player-movements";
import { FruitsManager, FruitsSpawn } from "./fruits";
import { Coordinates, generateRandomCoordinates } from "./coordinate";
import { TrapsManager, TrapsSpawn } from "./traps";
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

export class Game {
  private observers: ((state: GameState) => void)[] = [];
  trapObserver: any = () => {};
  state: GameState = {
    players: {},
    fruits: {},
    traps: {},
    screen: {
      width: 50,
      height: 50,
    },
  };
  fruits = new FruitsManager([this.state, this.mutateState]);
  traps = new TrapsManager([this.state, this.mutateState]);
  players = new PlayersManager([this.state, this.mutateState]);
  fruitsSpawn = new FruitsSpawn(this);
  trapsSpawn = new TrapsSpawn(this);

  constructor() {
    this.fruitsSpawn.spawn();
    this.trapsSpawn.spawn();
  }

  static create() {
    return new Game();
  }

  addPlayer(playerId: string) {
    const player = new Player(
      playerId,
      generateRandomCoordinates(
        this.state.screen.width,
        this.state.screen.width
      )
    );
    this.players.add(player);
    return player;
  }

  removePlayer(command: any) {
    const playerId = command.playerId;

    delete this.state.players[playerId];
  }

  movePlayer(command: { movement: string; player: Player }) {
    const MovementMap: { [key: string]: any } = {
      MoveUp: MoveUpAction,
      MoveDown: MoveDownAction,
      MoveRight: MoveRightAction,
      MoveLeft: MoveLeftAction,
    };

    const Movement = MovementMap[command.movement];

    if (command.player && Movement) {
      const movement = new Movement(this.state, command.player);
      movement.execute();
      this.players.move(command.player);
      this.movementExecuted(command.player);
    }
  }

  onStateChanged(observerFn: (state: GameState) => void) {
    this.observers.push(observerFn);
  }

  notify() {
    this.observers.forEach((observerFn: (state: GameState) => void) => {
      observerFn(this.state);
    });
  }

  onFellIntoATrap(fn: any) {
    this.trapObserver = fn;
  }

  mutateState(newState: Partial<GameState>) {
    this.state = {
      ...this.state,
      ...newState,
    };
  }

  private movementExecuted(player: Player) {
    this.fruits.removeWhenCollided(this.state.players[player.id], () => {
      this.players.incrementsScoreFor(player);
    });

    this.traps.removeWhenCollided(this.state.players[player.id], () => {
      this.trapObserver(player.id);
    });
    this.notify();
  }
}
