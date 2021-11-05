import { GameActions, Movement } from "./game-actions";
import { Socket } from "socket.io-client";

// infra
export class GameActionsSocketIO implements GameActions {
  constructor(private socket: Socket) {}

  playerDidMove(playerId: string, movement: Movement) {
    this.socket.emit("playerMoved", { playerId, ...movement });
  }
}
