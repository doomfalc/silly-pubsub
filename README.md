# Silly Pub Sub

Simple trivial message subscription and publish utility

## Use

```js
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
    hopeForSnes(messageHandler) {
        messageHandler.subscribe("snes", content => {
            this.say("Vendor says:", content);
            this.say("Place order!!!");
        });
    }
    say(...message) {
        console.log("Customer -", ...message);
    }
}

const pubSub = new MessageHandler();
const vendor = new Vendor(pubSub);
const customer = new Customer();

customer.hopeForSnes(pubSub);
vendor.restock();
```

**Output**

```
Vendor - We just restocked some SNES, hurray!
Customer - Vendor says: SNES classics are back in stock!
Customer - Place order!!!
```