import createKeyboardListener from "./keyboard-listener";
import { GameClient } from "../game-client";

export enum AllowedMovements {
  Up = "MoveUp",
  Down = "MoveDown",
  Right = "MoveRight",
  Left = "MoveLeft",
}

export interface Movement {
  movement: AllowedMovements;
}

export class PlayerMovementListener {
  constructor(private gameClient: GameClient) {}

  onMovement(movement?: AllowedMovements) {
    if (movement) {
      this.gameClient.playerMoved({ movement } as Movement);
    }
  }
}

export class ButtonsListener {
  constructor(private playerMovementListener: PlayerMovementListener) {
    const buttonMovementMap: { [key: string]: AllowedMovements } = {
      Up: AllowedMovements.Up,
      Down: AllowedMovements.Down,
      Right: AllowedMovements.Right,
      Left: AllowedMovements.Left,
    };

    // TODO: mover para classe de listener parecida com `createKeyboardListener`
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
