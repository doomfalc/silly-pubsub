module.exports = class {
    constructor() {
        this.subs = {};
    }

    subscribe(eventName, listener) {
        if (!this.subs[eventName]) {
            this.subs[eventName] = new Map();
        }
        this.subs[eventName].set(listener, listener);

        return {
            done: () => this.subs[eventName].delete(listener)
        };
    }

    publish(eventName, ...args) {
        if (this.subs[eventName]) {
            this.subs[eventName].forEach(listener => listener(...args));
        }
    }
}
