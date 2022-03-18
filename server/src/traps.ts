import crypto from "crypto";

import { Coordinates } from "./coordinate";
import { GameState } from "./game";

export class Traps {
  readonly state: GameState;
  readonly mutateState: (newState: Partial<GameState>) => void;

  constructor([state, mutateState]: [
    GameState,
    (newState: Partial<GameState>) => void
  ]) {
    this.state = state;
    this.mutateState = mutateState;
  }

  // TODO: ao adicionar uma trap, deve ser verificado se a trap está na mesma coordenada que uma fruta.
  // se estiver, a trap está numa posição invalida e deve ser gerado novamente uma coordenada para a trap.
  // isso se repete até que uma posição válida para a trap seja encontrada.
  add(trap: Trap) {
    this.state.traps[trap.id] = {
      ...trap.coordinates,
    };
  }

  remove({ trapId }: { trapId: string }) {
    delete this.state.traps[trapId];
  }

  removeWhenCollided({ x, y }: Coordinates, fn: () => void) {
    for (const trapId in this.state.traps) {
      const trap = this.state.traps[trapId];
      if (x === trap.x && y === trap.y) {
        this.remove({ trapId });
        fn();
      }
    }
  }
}

export class TrapsSpawn {
  constructor(private game: any) {}

  spawn() {
    setInterval(() => {
      this.game.traps.add(Trap.create(this.game.generateRandomCoordinates()));
      this.game.notify();
    }, 15000);
  }
}

export class Trap {
  constructor(readonly id: number, readonly coordinates: Coordinates) {}

  static create(coordinates: Coordinates) {
    const id = crypto.randomInt(0, 1000000);

    return new Trap(id, coordinates);
  }
}
