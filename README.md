# Silly Pub Sub

Simple trivial message subscription and publish utility

## Use

### Create a new MessageHandler

```js
const PubSub = require("silly-pubsub");
const pubSub = new PubSub();
```

### Subscribe to an event

```js
pubSub.subscribe("some-event-name", (...args) => {
    // do something
});
```

### Cancel/Terminate an event subscription

```js
// subscribe returns an object that allows event termination
const event = pubSub.subscribe("some-event-name", (...args) => {
    // do something
});
// Terminate
event.done();
```

### Trigger an event

```js
pubSub.publish("some-event-name");
// alternatively, pass any desired argument to access them in the subscribed functions.
pubSub.publish("some-event-name", { whatever: true });
```


## Full example

```js
const PubSub = require("silly-pubsub");

class Vendor {
    constructor(pubSub) {
        this.pubSub = pubSub;
    }
    restock() {
        this.say("We just restocked some SNES, hurray!");
        this.pubSub.publish("snes", "SNES classics are back in stock!");
    }
    say(message) {
        console.log("Vendor -", message);
    }
}

class Customer {
    constructor() {
        this.purchaseEvent = null;
    }
    hopeForSnes(pubSub) {
        this.purchaseEvent = pubSub.subscribe("snes", content => {
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

const pubSub = new PubSub();
const vendor = new Vendor(pubSub);
const customer = new Customer();

customer.hopeForSnes(pubSub);
vendor.restock();
customer.buySnes();
// Here, we shouldn't get any more notification.
vendor.restock();
```

**Output**

```
Vendor - We just restocked some SNES, hurray!
Customer - Vendor says: SNES classics are back in stock!
Customer - Place order!!!
Customer - Alright, I'm done.
Vendor - We just restocked some SNES, hurray!
// Customer doesn't receive a notification anymore.
```