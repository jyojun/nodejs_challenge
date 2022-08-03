export function application(from, to, title, content) {
  let data = `From: ${from}\r\n`;
  data += `To: ${to}\r\n`;
  data += `Title: ${title}\r\n`;
  data += `\r\n`;
  data += content;

  console.log(data);
  return data;
}
