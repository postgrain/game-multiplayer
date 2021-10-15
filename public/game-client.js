export default function createGameClient() {
  const state = {
    screen: {
      width: 0,
      height: 0,
    },
    players: {},
    fruits: {},
  };

  return {
    screen() {
      return state.screen;
    },
    currentPlayers() {
      return Object.values(state.players);
    },
    currentFruits() {
      return Object.values(state.fruits);
    },
    setup({ screen, players, fruits }) {
      state.screen = screen;
      state.players = players;
      state.fruits = fruits;
    },
  };
}
