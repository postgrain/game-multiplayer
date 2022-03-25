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
  movementButtons = document.querySelectorAll(".movement-btn");
  readonly buttonMovementMap: { [key: string]: AllowedMovements } = {
    Up: AllowedMovements.Up,
    Down: AllowedMovements.Down,
    Right: AllowedMovements.Right,
    Left: AllowedMovements.Left,
  };
  handler = this.handleBtnClick.bind(this);

  constructor(public playerMovementListener: PlayerMovementListener) {}

  register() {
    // TODO: mover para classe de listener parecida com `createKeyboardListener`

    this.movementButtons.forEach((button) =>
      button.addEventListener("click", this.handler)
    );
  }

  unregister() {
    this.movementButtons.forEach((button) =>
      button.removeEventListener("click", this.handler)
    );
  }

  private handleBtnClick(event: any) {
    this.playerMovementListener.onMovement(
      this.buttonMovementMap[event.target.dataset.movement]
    );
  }
}

export class KeyboardListener {
  keyboardListener = createKeyboardListener(document);
  readonly keyboardMovementsMap: { [key: number]: AllowedMovements } = {
    38: AllowedMovements.Up,
    87: AllowedMovements.Up,

    40: AllowedMovements.Down,
    83: AllowedMovements.Down,

    37: AllowedMovements.Left,
    65: AllowedMovements.Left,

    39: AllowedMovements.Right,
    68: AllowedMovements.Right,
  };
  subscription: any;

  constructor(private playerMovementListener: PlayerMovementListener) {}

  register() {
    this.subscription = this.keyboardListener.subscribe((keyEvent: any) => {
      this.playerMovementListener.onMovement(
        this.keyboardMovementsMap[keyEvent.keyCode]
      );
    });
  }

  unregister() {
    this.subscription?.();
  }
}
