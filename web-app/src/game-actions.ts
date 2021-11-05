export enum AllowedMovements {
  Up = "MoveUp",
  Down = "MoveDown",
  Right = "MoveRight",
  Left = "MoveLeft",
}

export interface Movement {
  movement: AllowedMovements;
}

// domain
export interface GameActions {
  playerDidMove: (playerId: string, movement: Movement) => void;
}
