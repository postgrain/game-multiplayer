import { Player } from "./players";

export class MovementAction {
  constructor(protected state: any, protected player: Player) {}
}

export class MoveUpAction extends MovementAction {
  execute() {
    if (this.player.coordinates.y - 1 >= 0) {
      this.player.coordinates.y = this.player.coordinates.y - 1;
    }
  }
}

export class MoveDownAction extends MovementAction {
  execute() {
    if (this.player.coordinates.y + 1 < this.state.screen.height) {
      this.player.coordinates.y = this.player.coordinates.y + 1;
    }
  }
}

export class MoveRightAction extends MovementAction {
  execute() {
    if (this.player.coordinates.x + 1 < this.state.screen.width) {
      this.player.coordinates.x = this.player.coordinates.x + 1;
    }
  }
}

export class MoveLeftAction extends MovementAction {
  execute() {
    if (this.player.coordinates.x - 1 >= 0) {
      this.player.coordinates.x = this.player.coordinates.x - 1;
    }
  }
}
