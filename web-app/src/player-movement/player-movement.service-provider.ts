import { GameClient } from "../game-client";
import {
  ButtonsListener,
  KeyboardListener,
  PlayerMovementListener,
} from "./player-movement-listener";

export class PlayerMovementServiceProvider {
  buttonsListener?: ButtonsListener;
  keyboardListener?: KeyboardListener;

  register(gameClient: GameClient) {
    const movementListener = new PlayerMovementListener(gameClient);
    this.buttonsListener = new ButtonsListener(movementListener);
    this.keyboardListener = new KeyboardListener(movementListener);
    this.buttonsListener.register();
    this.keyboardListener.register();
  }
  unregister() {
    this.buttonsListener?.unregister();
    this.keyboardListener?.unregister();
  }
}
