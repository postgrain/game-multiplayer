interface Action {
    player: any;
    execute();
}

export class ArrowUp implements Action {
    constructor(public player: any) {}

    execute() {
        console.log('Moving player Up')
        if (this.player.y - 1 >= 0) {
            this.player.y = this.player.y - 1
        }
    }
}

export class ArrowDown implements Action {
    constructor(private player: any, private screen: any) {}

    execute() {
        console.log('Moving player Down')
        if (this.player.y + 1 < this.screen.height) {
            this.player.y = this.player.y + 1
        }
    }
}


class Game {
    state: {
        players: [],
        fruits: []
    };

    movePlayer(keyPressed: string, player: string) {
        const action = makeMovePlayerAction(keyPressed);
        const player = this.state.players[player]

        if (action.execute()) {
            console.log('');
        }
    }
}
// factory
function makeMovePlayerAction(command): Action {
  switch(command) {
      case command.ArrowUp: return new ArrowUp(command.player);
  }
  throw new Error('');
}
