export class EventManager {
  instance = null;
  constructor() {
    this.manager = [];
    this.events = new Map();
    this.senders = new Map();
  }
  shareInstance() {}
  add(subscriber, event, sender, handler) {
    this.manager.push({
      sender: sender,
      event: event,
      to: subscriber,
      handler: handler,
    });
  }
  remove(subscriber) {}
  postEvent(name, sender, userData) {}
  stringify() {
    console.log(this.manager);
  }
}

const ModelDataChanged = (data) => {
  return { data: data };
};

const pubsub = new EventManager();

pubsub.add("subscriberA", "ModelDataChanged", "albumModel", ModelDataChanged);

pubsub.stringify();
