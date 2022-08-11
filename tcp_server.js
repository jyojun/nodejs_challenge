import net from "net";
import { insertGroup, popGroup, missionToKeyword } from "./utils.js";

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
          client.write(`${client.campId}님은 이미 체크인을 하셨습니다.`);
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
        // group braodcasting
        for (const c of groups[client.groupNum]) {
          if (c !== client)
            c.write(
              `${client.campId}님께서 GROUP#${client.groupNum}에서 들어오셨습니다.`
            );
        }
        break;

      // checkout
      case "CHECKOUT":
        if (client.checkin !== true) {
          client.write(`체크인을 먼저 해주세요.`);
          break;
        }
        // todo 1: groups에서 해당 client 찾아서 pop 해줘야함
        popGroup(groups, client);

        // group braodcasting
        for (const c of groups[client.groupNum]) {
          c.write(
            `${client.campId}님께서 GROUP#${client.groupNum}에서 퇴장했습니다.`
          );
        }
        client.write(`체크아웃 완료! GROUP#${client.groupNum}에서 퇴장합니다.`);
        console.log(
          `${client.campId}님께서 Session#${client.sessionNum}에서 체크아웃 합니다.`
        );
        client.end();
        break;

      case "MISSION":
        if (client.checkin !== true) {
          client.write(`체크인을 먼저 해주세요.`);
          break;
        }

        let keyword = missionToKeyword(d.content);
        if (!keyword) {
          client.write("미션이 없던 날짜거나 해당 날짜의 키워드가 없습니다.");
          break;
        }
        client.write(
          `${JSON.stringify(d.content)}의 키워드는 ${keyword}입니다.`
        );
        console.log(
          `Session#${client.sessionNum} ${client.campId}님의 ${d.content} 키워드 => ${keyword}`
        );
        break;
    }
  });

  client.on("end", function () {
    console.log(`${client.campId} 연결 끊김.`);
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
