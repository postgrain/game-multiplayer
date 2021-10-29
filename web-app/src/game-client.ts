export default function createGameClient() {
  const state: any = {
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
    setup({ screen, players, fruits }: any) {
      state.screen = screen;
      state.players = players;
      state.fruits = fruits;
    },
  };
}
