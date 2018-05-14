const MessageHandler = require("../src/pubsub.js");

class Vendor {
    constructor(messageHandler) {
        this.messageHandler = messageHandler;
    }
    restock() {
        this.say("We just restocked some SNES, hurray!");
        this.messageHandler.publish("snes", "SNES classics are back in stock!");
    }
    say(message) {
        console.log("Vendor -", message);
    }
}

class Customer {
    constructor() {
        this.purchaseEvent = null;
    }
    hopeForSnes(messageHandler) {
        this.purchaseEvent = messageHandler.subscribe("snes", content => {
            this.say("Vendor says:", content);
            this.say("Place order!!!");
        });
    }
    say(...message) {
        console.log("Customer -", ...message);
    }
    buySnes() {
        this.say("Alright, I'm done.");
        // Now that we've bought a SNES, we don't want to get vendor notifications anymore.
        if (this.purchaseEvent) {
            this.purchaseEvent.done();
        }
    }
}

const pubSub = new MessageHandler();
const vendor = new Vendor(pubSub);
const customer = new Customer();

customer.hopeForSnes(pubSub);
vendor.restock();
customer.buySnes();
// Here, we shouldn't get any more notification.
vendor.restock();
