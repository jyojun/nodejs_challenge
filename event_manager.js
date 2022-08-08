class EventManager {
  constructor() {
    this.manager = [];
  }
  add(subscriber, event, sender, handler) {
    if (event) subscriber.events.push(event);
    if (sender) subscriber.senders.push(sender);
    this.manager.push({
      sender: sender,
      event: event,
      to: subscriber,
      handler: handler,
    });
  }
  remove(subscriber) {}
  postEvent(name, sender, userData) {
    this.manager.forEach((d) => {
      // console.log(event);
      if (
        (d.event === name && d.sender === sender) ||
        (d.event === "" && d.sender === sender) ||
        (d.event === name && d.sender === undefined) ||
        (d.event === "" && d.sender === undefined)
      ) {
        const event = new Event(name, sender, d.to.name);
        d.handler(event, userData);
      }
    });
  }
  stringify() {
    this.manager.forEach((d) => {
      console.log(d.to.name, ": event name =", d.event, ", sender =", d.sender);
    });
  }
}

export const handler = (event, userData) => {
  console.log(
    `${event.to} : ${event.name} event from ${event.sender} userData = `,
    userData
  );
};

export const Singleton = (function () {
  let instance;

  function createInstance() {
    let eventManager = new EventManager();
    return eventManager;
  }

  return {
    sharedInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

export class Subscriber {
  constructor(name) {
    this.name = name;
    this.events = [];
    this.senders = [];
  }
}
export class Publisher {
  constructor(name) {
    this.name = name;
  }
}

export class Event {
  constructor(name, sender, to) {
    this.name = name;
    this.sender = sender;
    this.to = to;
  }
}
