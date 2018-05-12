module.exports = class MessageHandler {
    constructor() {
        this.subs = {};
    }

    subscribe(eventName, listener) {
        if (!this.subs[eventName]) {
            this.subs[eventName] = [];
        }
        this.subs[eventName].push(listener);
    }

    publish(eventName, ...args) {
        if (this.subs[eventName]) {
            this.subs[eventName].forEach(listener => listener(...args));
        }
    }
}
