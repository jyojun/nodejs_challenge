export const transport = (data) => {
  let source_port = 10001;
  let dest_port = 8080;
  let seq_num = 10;
  let ack_num;
  let packet;
  let result_segments = [];

  // 데이터를 100개씩 세그먼트로 나눔
  const segments = [];
  for (let i = 0; i < data.length; i += 100) {
    segments.push(data.slice(i, i + 100));
  }

  // 3-way handshake
  packet = sendPacket("SYN", source_port, dest_port, seq_num++, ack_num, 0);
  result_segments.push(packet);
  ack_num = 100;
  packet = receivePacket(
    "SYN+ACK",
    dest_port,
    source_port,
    ack_num++,
    seq_num,
    0
  );
  result_segments.push(packet);
  packet = sendPacket("ACK", source_port, dest_port, seq_num++, ack_num++, 0);
  result_segments.push(packet);
  // 데이터 100씩 segments 전송
  segments.forEach((segment) => {
    let len = segment.length;
    seq_num += len;
    let seg = false;

    if (len >= 100) {
      seg = true;
    }
    packet = sendSegment(
      "DATA",
      source_port,
      dest_port,
      seq_num,
      seg,
      len,
      segment
    );
    result_segments.push(packet);
    packet = receivePacket(
      "ACK",
      dest_port,
      source_port,
      seq_num,
      ack_num++,
      0
    );
    result_segments.push(packet);
  });

  return result_segments;
};

function sendPacket(packet, source_port, dest_port, seq_num, ack_num, len) {
  console.log(">> Sending Packet :", packet);
  console.log("Source Port :", source_port);
  console.log("Destination Port :", dest_port);
  console.log("Sequence Number :", seq_num);
  console.log("Ack Number :", ack_num);
  console.log("Content-Length :", len);

  const result = [packet, source_port, dest_port, seq_num, ack_num, len];
  console.log(result, "\n");
  return result;
}

function receivePacket(packet, source_port, dest_port, seq_num, ack_num, len) {
  console.log(">> Received Packet :", packet);
  console.log("Source Port :", source_port);
  console.log("Destination Port :", dest_port);
  console.log("Sequence Number :", seq_num);
  console.log("Ack Number :", ack_num);

  const result = [packet, source_port, dest_port, seq_num, ack_num, len];
  console.log(result, "\n");
  return result;
}

function sendSegment(
  packet,
  source_port,
  dest_port,
  seq_num,
  seg,
  len,
  content
) {
  console.log(">> Sending Packet :", packet);
  console.log("Source Port :", source_port);
  console.log("Destination Port :", dest_port);
  console.log("Sequence Number :", seq_num);
  console.log("Segmentation :", seg);
  console.log("Content-Length :", len);
  console.log(content);

  const result = [packet, source_port, dest_port, seq_num, seg, len, content];
  console.log(result, "\n");
  return result;
}
