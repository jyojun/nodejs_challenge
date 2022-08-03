function application(from, to, title, content) {
  let data = `From: ${from}\r\n`;
  data += `To: ${to}\r\n`;
  data += `Title: ${title}\r\n`;
  data += `\r\n`;
  data += content;

  console.log(data);
  return data;
}

const from = "jk@boostcamp.connect.or.kr";
const to = "camper@boostcamp.connect.or.kr";
const title = "Hello World";
const content = "Hello BoostCamper,\r\n\tThis message written by JK";

application(from, to, title, content);
