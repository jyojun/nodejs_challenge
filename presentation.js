import { base64_encoder, base64_decoder } from "./base64.js";
import fs from "fs";

export function presentation(data) {
  const content = data.split("\r\n");
  const encoded_content =
    content.slice(0, 4).join("\r\n") + "\r\n" + base64_encoder(content[4]);

  console.log(encoded_content);

  return encoded_content;
}

export function res_presentation(data) {
  let temp = data.split("\r\n");
  const decoded_result = base64_decoder(temp[4]);
  const decoded_content =
    temp.slice(0, 4).join("\r\n") + "\r\n" + decoded_result;

  fs.writeFileSync("./attachment.file", decoded_result);

  console.log(">> 수신 데이터");
  console.log(decoded_content);
  return decoded_content;
}
