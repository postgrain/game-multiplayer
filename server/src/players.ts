import { Coordinates } from "./coordinate";
import { GameState } from "./game";

export class PlayersManager {
  readonly state: GameState;
  readonly mutateState: (newState: Partial<GameState>) => void;

  constructor([state, mutateState]: [
    GameState,
    (newState: Partial<GameState>) => void
  ]) {
    this.state = state;
    this.mutateState = mutateState;
  }

  add(player: Player) {
    this.state.players[player.id] = {
      ...player,
      ...player.coordinates,
    };
  }

  move(player: Player) {
    this.state.players[player.id] = {
      ...this.state.players[player.id],
      ...player.coordinates,
    };
  }

  incrementsScoreFor(player: Player) {
    player.score += 1;

    this.state.players[player.id] = {
      ...this.state.players[player.id],
      score: player.score,
    };
  }

  remove(player: Player) {
    delete this.state.players[player.id];
  }
}

export class Player {
  constructor(
    readonly id: string,
    readonly coordinates: Coordinates,
    public score = 0
  ) {}
}
