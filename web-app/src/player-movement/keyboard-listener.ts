export default function createKeyboardListener(document: any) {
  document.addEventListener("keydown", handleKeydown);

  const state: any = {
    observers: [],
  };

  function subscribe(observerFunction: any) {
    state.observers.push(observerFunction);
    return () => {
      state.observers = state.observers.filter(
        (fn: any) => fn !== observerFunction
      );
    };
  }

  function notifyAll(command: any) {
    for (const observerFunction of state.observers) {
      observerFunction(command);
    }
  }

  function handleKeydown(event: any) {
    notifyAll(event);
  }

  return {
    subscribe,
  };
}
