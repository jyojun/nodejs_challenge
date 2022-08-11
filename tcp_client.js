import net from "net";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const client = new net.Socket();

client.connect({ port: 2022, host: "localhost" });

client.on("connect", () => {
  rl.on("line", function (line) {
    if (line === "checkout") {
      client.write(
        JSON.stringify({
          type: "CHECKOUT",
        })
      );
    } else {
      let temp = line.split(" ");
      if (temp[0] === "checkin") {
        client.write(
          JSON.stringify({
            type: "CHECKIN",
            content: `${temp[1]}`,
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
});

client.on("error", function (err) {
  console.log(JSON.stringify(err));
});
