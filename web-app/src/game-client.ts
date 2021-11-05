import { GameActions, Movement } from "./game-actions";

export class GameClient {
  private state: any = {
    screen: {
      width: 0,
      height: 0,
    },
    players: {},
    fruits: {},
  };

  constructor(private playerId: string, private actions: GameActions) {}

  screen() {
    return this.state.screen;
  }
  currentPlayers() {
    return Object.values(this.state.players);
  }
  currentFruits() {
    return Object.values(this.state.fruits);
  }
  setup({ screen, players, fruits }: any) {
    this.state.screen = screen;
    this.state.players = players;
    this.state.fruits = fruits;
  }
  playerMoved(movement: Movement) {
    console.log("> player moved", { movement });
    this.actions.playerDidMove(this.playerId, movement);
  }
}
