export function generateRandomCoordinates(
  screenWidth: number,
  screenHeight: number
) {
  return {
    x: Math.floor(Math.random() * screenWidth + 1),
    y: Math.floor(Math.random() * screenHeight + 1),
  };
}

export interface Coordinates {
  x: number;
  y: number;
}
