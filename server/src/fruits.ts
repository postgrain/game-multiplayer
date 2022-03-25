import { GameState } from "./game";
import crypto from "crypto";
import { Coordinates, generateRandomCoordinates } from "./coordinate";

export class FruitsManager {
  readonly state: GameState;
  readonly mutateState: (newState: Partial<GameState>) => void;

  constructor([state, mutateState]: [
    GameState,
    (newState: Partial<GameState>) => void
  ]) {
    this.state = state;
    this.mutateState = mutateState;
  }

  add(fruit: Fruit) {
    // this.mutateState({
    //   fruits: {
    //     ...this.state.fruits,
    //     [command.fruitId]: {
    //       x: command.fruitX,
    //       y: command.fruitY,
    //     },
    //   },
    // });
    this.state.fruits[fruit.id] = {
      ...fruit.coordinates,
    };
  }

  remove(command: any) {
    delete this.state.fruits[command.fruitId];
  }

  removeWhenCollided({ x, y }: Coordinates, fn: () => void) {
    for (const fruitId in this.state.fruits) {
      const fruit = this.state.fruits[fruitId];
      if (x === fruit.x && y === fruit.y) {
        this.remove({ fruitId });
        fn();
      }
    }
  }
}

export class FruitsSpawn {
  constructor(private game: any) {}
  spawn() {
    setInterval(() => {
      this.game.fruits.add(
        Fruit.create(
          generateRandomCoordinates(
            this.game.state.screen.width,
            this.game.state.screen.height
          )
        )
      );
      this.game.notify();
    }, 1000);
  }
}

export class Fruit {
  constructor(readonly id: number, readonly coordinates: Coordinates) {}

  static create(coordinates: Coordinates) {
    const id = crypto.randomInt(0, 1000000);

    return new Fruit(id, coordinates);
  }
}
