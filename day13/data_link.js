export function data_link(data) {
  const source_mac = "3C:5A:B4:6F:EA:DC";
  const dest_mac = "3C:5A:B4:93:01:4B";

  let frames = [];
  data.forEach((d) => {
    console.log(">> 요청", d);
    console.log("(", source_mac, ",", dest_mac, d, ")");
    console.log();
    frames.push([source_mac, dest_mac, d]);
  });

  return frames; // 데이터 링크로 전송
}

export function res_data_link(data) {
  const source_mac = "3C:5A:B4:6F:EA:DC";
  const dest_mac = "3C:5A:B4:93:01:4B";

  let packets = [];
  data.forEach((d) => {
    let temp = JSON.parse(d);
    if (temp[1] === dest_mac) {
      // 수신이 일치할 경우
      console.log(">> 요청", JSON.stringify(temp));
      console.log(`수신 MAC 주소 (일치) => ${dest_mac}`);
      console.log(`발신 MAC 주소 => ${source_mac}\n`);
      packets.push(temp[2]);
    }
  });

  return packets;
}
