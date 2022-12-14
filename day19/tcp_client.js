import net from "net";
import readline from "readline";
import { check_camp_id } from "./utils.js";

let checkin_time;
let checkout_time;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const client = new net.Socket();

client.connect({ port: 2022, host: "localhost" });

client.on("connect", () => {
  rl.on("line", function (line) {
    if (line === "checkout") {
      checkout_time = new Date();
      client.write(
        JSON.stringify({
          type: "CHECKOUT",
        })
      );
    } else {
      let temp = line.split(" ");
      if (temp[0] === "checkin") {
        if (check_camp_id(temp[1])) {
          checkin_time = new Date();
          client.write(
            JSON.stringify({
              type: "CHECKIN",
              content: `${temp[1]}`,
            })
          );
        } else {
          console.log("캠퍼 아이디를 다시 적어주세요!");
        }
      } else if (temp[0] === "mission") {
        client.write(
          JSON.stringify({
            type: "MISSION",
            content: `${temp[1]}`,
          })
        );
      } else if (temp[0] === "peersession") {
        client.write(
          JSON.stringify({
            type: "PEERSESSION",
            content: `${line.replace("peersession", "").trim()}`,
          })
        );
      } else if (temp[0] === "message") {
        client.write(
          JSON.stringify({
            type: "MESSAGE",
            content: `${line.replace("message", "").trim()}`,
          })
        );
      } else if (temp[0] === "complete") {
        client.write(
          JSON.stringify({
            type: "COMPLETE",
          })
        );
      } else if (temp[0] === "direct") {
        client.write(
          JSON.stringify({
            type: "DIRECT",
            content: `${line.replace("direct", "").replace(",", "").trim()}`,
          })
        );
      }
    }
  });
});

client.on("data", (data) => {
  console.log(data.toString());
});

client.on("close", () => {
  console.log("ended");
});

client.on("end", function () {
  console.log("disconnected");
  let diff = (checkout_time.getTime() - checkin_time.getTime()) / 1000;
  console.log(`${diff.toFixed(2)}초 활동하였습니다.`);
});

client.on("error", function (err) {
  console.log(JSON.stringify(err));
});
