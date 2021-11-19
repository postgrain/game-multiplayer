import { MovementAction } from "./movement-action";
import { Socket } from "socket.io-client";
import { Movement } from "./player-movement-listener";

export class MovementActionSocketIO implements MovementAction {
  constructor(private socket: Socket) {}

  playerDidMove(playerId: string, movement: Movement) {
    this.socket.emit("playerMoved", { playerId, ...movement });
  }
}
