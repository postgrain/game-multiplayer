import { Movement } from "./player-movement-listener";

export interface MovementAction {
  playerDidMove: (playerId: string, movement: Movement) => void;
}
