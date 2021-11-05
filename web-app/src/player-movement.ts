import createKeyboardListener from "./keyboard-listener";
import { Movement, AllowedMovements } from "./game-actions";
import { GameClient } from "./game-client";

export class PlayerMovementListener {
  constructor(private gameClient: GameClient) {}

  onMovement(movement?: AllowedMovements) {
    if (movement) {
      this.gameClient.playerMoved({ movement } as Movement);
    }
  }
}

// infra
export class ButtonsListener {
  constructor(private playerMovementListener: PlayerMovementListener) {
    const buttonMovementMap: { [key: string]: AllowedMovements } = {
      Up: AllowedMovements.Up,
      Down: AllowedMovements.Down,
      Right: AllowedMovements.Right,
      Left: AllowedMovements.Left,
    };

    const movementButtons = document.querySelectorAll(".movement-btn");
    movementButtons.forEach((button) =>
      button.addEventListener("click", (event: any) => {
        this.playerMovementListener.onMovement(
          buttonMovementMap[event.target.dataset.movement]
        );
      })
    );
  }
}

// infra
export class KeyboardListener {
  constructor(private playerMovementListener: PlayerMovementListener) {
    const keyboardMovementsMap: { [key: number]: AllowedMovements } = {
      38: AllowedMovements.Up,
      87: AllowedMovements.Up,

      40: AllowedMovements.Down,
      83: AllowedMovements.Down,

      37: AllowedMovements.Left,
      65: AllowedMovements.Left,

      39: AllowedMovements.Right,
      68: AllowedMovements.Right,
    };

    const keyboardListener = createKeyboardListener(document);
    keyboardListener.subscribe((keyEvent: any) => {
      this.playerMovementListener.onMovement(
        keyboardMovementsMap[keyEvent.keyCode]
      );
    });
  }
}
