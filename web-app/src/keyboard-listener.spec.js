import createKeyboardListener from './keyboard-listener.js';

const fakeDocument = {
    listeners: {},
    addEventListener(eventName, callback) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(callback)
    },
    dispatchEvent(eventName, event) {
        for(let observer of this.listeners[eventName]) {
            observer(event)
        }
    }
}

const keyboardListener = createKeyboardListener(fakeDocument);

let calledObserverTimes = 0;
keyboardListener.subscribe((command) => {
    assert('player1', command.playerId)
    assert('ArrowUp', command.keyPressed)
    calledObserverTimes += 1
})

fakeDocument.dispatchEvent('keydown', { key: 'ArrowUp' })

assert(1, calledObserverTimes);

export default function() {}

function assert(expected, real) {
    if (expected != real) {
        throw new Error(`Expect ${expected} but got ${real}`);
    }
    console.log('.')
}
