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

export function res_network(data) {}
