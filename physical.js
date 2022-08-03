export function physical(data) {
  const sixteen_bits = [];

  data.forEach((d) => {
    let temp = [];
    JSON.stringify(d)
      .split("")
      .map((d) => {
        temp.push(d.charCodeAt().toString(16));
      });
    sixteen_bits.push(temp);
  });
  console.log(sixteen_bits);
  return sixteen_bits;
}

export function res_physical(bits) {
  const frame = [];

  bits.forEach((b) => {
    let temp = "";
    b.map((hex) => {
      temp += String.fromCharCode(parseInt(hex, 16));
    });
    console.log(
      ">> 전달 받은 프레임 값을 다시 문자열로 바꿔서 출력한다.\n",
      temp,
      "\n"
    );
    frame.push(temp);
  });

  return frame;
}
