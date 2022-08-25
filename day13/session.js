import { v4 } from "uuid";

export function session(data) {
  const id = v4();

  const content = data.split("\r\n");
  //   console.log(content);
  const session_id = "Session-Id: " + id + "\r\n";

  const result =
    content.slice(0, 3).join("\r\n") +
    "\r\n" +
    session_id +
    content.slice(3).join("\r\n");
  console.log(result);

  return result;
}

export function res_session(data) {
  let temp = data.split("\r\n");
  let session = temp[3];
  temp = temp.slice(0, 3).join("\r\n") + "\r\n" + temp.slice(4).join("\r\n");
  console.log(">> 수신 데이터");
  console.log(JSON.stringify(temp), "\n");

  console.log(session);

  return temp;
}
