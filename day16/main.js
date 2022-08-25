import { Subscriber, Singleton, handler } from "./event_manager.js";
import chalk from "chalk";

const pubsub = Singleton.sharedInstance();

// subscriber A,B,C,D 생성
const subscriberA = new Subscriber("subscriberA");
const subscriberB = new Subscriber("subscriberB");
const subscriberC = new Subscriber("subscriberC");
const subscriberD = new Subscriber("subscriberD");

// add subscriber, event, sender, handler
pubsub.add(subscriberA, "ModelDataChanged", "albumModel", handler);
pubsub.add(subscriberB, "", "albumView", handler);
pubsub.add(subscriberC, "DidShakeMotion", "albumController", handler);
pubsub.add(subscriberC, "AllDataChanged", undefined, handler);
pubsub.add(subscriberD, "", undefined, handler);

console.log(
  "\n",
  chalk.green.inverse(
    "=======================Subscriber Stringify()====================="
  )
);
pubsub.stringify();

console.log(
  "\n",
  chalk.red.inverse("=======================Post Event=====================")
);
// post event, sender, userData
pubsub.postEvent("ModelDataChanged", "albumModel", { data: "abc" });
pubsub.postEvent("viewUpdated", "albumView", { view: "xxx" });
pubsub.postEvent("DidShakeMotion", "albumController", { from: "blue" });
pubsub.postEvent("AllDataChanged", "dummy", {});
