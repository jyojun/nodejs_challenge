import { base64 } from "./base64.js";

export function presentation(data) {
  const content = data.split("\r\n");
  const encoded_content =
    content.slice(0, 4).join("\r\n") + "\r\n" + base64(content[4]);

  console.log(encoded_content);

  return encoded_content;
}
