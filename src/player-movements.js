export class MovementAction {
  constructor(state, player) {
    this.state = state;
    this.player = player;
  }
}

export class MoveUpAction extends MovementAction {
  execute() {
    if (this.player.y - 1 >= 0) {
      this.player.y = this.player.y - 1;
    }
  }
}

export class MoveDownAction extends MovementAction {
  execute() {
    if (this.player.y + 1 < this.state.screen.height) {
      this.player.y = this.player.y + 1;
    }
  }
}

export class MoveRightAction extends MovementAction {
  execute() {
    if (this.player.x + 1 < this.state.screen.width) {
      this.player.x = this.player.x + 1;
    }
  }
}

export class MoveLeftAction extends MovementAction {
  execute() {
    if (this.player.x - 1 >= 0) {
      this.player.x = this.player.x - 1;
    }
  }
}

export default {
  MoveUpAction,
  MoveDownAction,
  MoveLeftAction,
  MoveRightAction,
};
