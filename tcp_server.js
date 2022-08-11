import net from "net";
import { insertGroup } from "./utils.js";

let HOST = "127.0.0.1";
let PORT = 2022;

let groups = [[]];
let sessionNum = 0;

let server = net.createServer(function (client) {
  client.on("data", function (data) {
    let d = JSON.parse(data);
    switch (d.type) {
      // checkin
      case "CHECKIN":
        if (client.checkin === true) {
          client.write(`${client.campId}님은 이미 체크아웃을 하셨습니다.`);
          break;
        }
        // 빈 그룹에 client 집어넣기
        insertGroup(groups, client);

        client.campId = d.content;
        client.sessionNum = sessionNum++;
        client.checkin = true;

        console.log(
          `${client.campId}님 체크인 성공! IP: ${client.remoteAddress}:${client.remotePort} => session#${client.sessionNum}, group#${client.groupNum}`
        );
        client.write(
          `체크인에 성공했습니다! GROUP#${client.groupNum}에 들어오셨습니다.`
        );
        break;

      // checkout
      case "CHECKOUT":
        client.write("checkout success");
        // todo 1: groups에서 해당 client 찾아서 pop 해줘야함
        client.end();
    }
  });

  client.on("end", function () {
    console.log("Client disconnected");
    server.getConnections(function (err, count) {
      console.log("Remaining Connections: " + count);
    });
  });

  client.on("error", function (err) {
    console.log("Socket Error: ", JSON.stringify(err));
  });
  client.on("timeout", function () {
    console.log("Socket Timed out");
  });
});

server.listen(PORT, function () {
  console.log("Server listening: " + JSON.stringify(server.address()));
  server.on("close", function () {
    console.log("Server Terminated");
  });
  server.on("error", function (err) {
    console.log("Server Error: ", JSON.stringify(err));
  });
});

// EADDRINUSE error 일 경우 server를 기다린다.
server.on("error", function (e) {
  if (e.code == "EADDRINUSE") {
    console.log("Address in use, retrying...");
    setTimeout(function () {
      server.close();
      server.listen(PORT, HOST);
    }, 1000);
  }
});
