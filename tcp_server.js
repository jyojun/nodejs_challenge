import net from "net";
import {
  insertGroup,
  popGroup,
  missionToKeyword,
  maxCountToNumber,
} from "./utils.js";

let HOST = "127.0.0.1";
let PORT = 2022;

let groups = [[]];
let sessionNum = 0;

let peersession = {};
let maxCount = {};

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

      case "PEERSESSION":
        if (client.checkin !== true) {
          client.write(`체크인을 먼저 해주세요.`);
          break;
        }

        let count = maxCountToNumber(d.content);

        if (peersession[client.groupNum]) {
          client.write(
            `이미 GROUP#${client.groupNum}의 피어세션이 진행중입니다.`
          );
          break;
        } else {
          // 피어세션 groupNum 키값에 해당 client가 권한을 갖음
          peersession[client.groupNum] = client;
          for (const c of groups[client.groupNum]) {
            c.write(
              `GROUP#${client.groupNum}의 피어세션이 시작되었습니다. ${count}개 메세지까지 주고받을 수 있습니다.`
            );
          }

          console.log(
            `GROUP#${client.groupNum}의 피어세션이 시작되었습니다. => maxCount = ${count}`
          );

          maxCount[client.groupNum] = count;
        }

        break;

      case "MESSAGE":
        if (client.checkin !== true) {
          client.write(`체크인을 먼저 해주세요.`);
          break;
        }

        if (peersession[client.groupNum] && maxCount[client.groupNum] > 0) {
          maxCount[client.groupNum]--;
          for (const c of groups[client.groupNum])
            c.write(
              `${client.campId}: "${d.content}" 현재 피어세션 잔여메세지 : ${
                maxCount[client.groupNum]
              }개`
            );
        }

        if (maxCount[client.groupNum] <= 0) {
          delete maxCount[client.groupNum];
          for (const c of groups[client.groupNum])
            c.write(
              `피어세션 잔여 메세지가 모두 소진되었습니다. 피어세션을 종료해주세요~`
            );
        }
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
