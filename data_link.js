export function data_link(data) {
  const source_mac = "3C:5A:B4:6F:EA:DC";
  const dest_mac = "3C:5A:B4:11:7B:B0";

  let result_datas = [];
  data.forEach((d) => {
    console.log(">> 요청", d);
    console.log("(", source_mac, ",", dest_mac, d, ")");
    console.log();
    result_datas.push([source_mac, dest_mac, d]);
  });

  return result_datas; // 데이터 링크로 전송
}
