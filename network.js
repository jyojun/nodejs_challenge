export function network(packets) {
  const source_ip = "192.168.1.5";
  const dest_ip = "192.168.1.9";

  let result_packets = [];
  packets.forEach((packet) => {
    console.log(">> 요청", packet);
    console.log("{", source_ip, ",", dest_ip, packet, "}");
    console.log();
    result_packets.push([source_ip, dest_ip, packet]);
  });

  return result_packets; // 데이터 링크로 전송
}

export function res_network(data) {
  const source_ip = "192.168.1.5";
  const dest_ip = "192.168.1.9";

  let segments = [];
  data.forEach((d) => {
    if (d[1] === dest_ip) {
      // 수신이 일치할 경우
      console.log(">> 요청", JSON.stringify(d));
      console.log(`발신 IP 주소 => ${source_ip}`);
      console.log(`수신 IP 주소 (일치) => ${dest_ip}\n`);
      segments.push(d[2]);
    }
  });

  return segments;
}
