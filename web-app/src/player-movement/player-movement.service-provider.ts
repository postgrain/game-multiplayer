import { GameClient } from "../game-client";
import {
  ButtonsListener,
  KeyboardListener,
  PlayerMovementListener,
} from "./player-movement-listener";

export class PlayerMovementServiceProvider {
  register(gameClient: GameClient) {
    const movementListener = new PlayerMovementListener(gameClient);
    new ButtonsListener(movementListener);
    new KeyboardListener(movementListener);
  }
}
