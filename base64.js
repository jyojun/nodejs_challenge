const base64_table =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

export function base64(str) {
  // 1. 문자열 -> 아스키 코드 변환
  let ascii = [];
  for (let i = 0; i < str.length; i++) {
    ascii.push(str.charCodeAt(i));
  }
  // console.log(ascii);

  // 2. 2진수로 변환(8비트에 맞게);
  let binary = [];
  for (let i = 0; i < ascii.length; i++) {
    let temp = ascii[i].toString(2);
    if (temp.length < 8) {
      temp = "0".repeat(8 - temp.length) + temp;
    }
    binary.push(temp);
  }

  // console.log(binary);

  // 3. 6비트 단위로 자르기
  let six_bit = [];
  let temp = binary.join("");
  // console.log(temp);

  for (let i = 0; i < temp.length; i += 6) {
    if (temp.slice(i, i + 6).length < 6) {
      six_bit.push(
        temp.slice(i, i + 6) + "0".repeat(6 - temp.slice(i, i + 6).length)
      );
      break;
    }
    six_bit.push(temp.slice(i, i + 6));
  }

  // console.log(six_bit);

  let result = "";
  // 4. 10진수로 변환 -> Base64 테이블 매핑
  for (let i = 0; i < six_bit.length; i++) {
    result += base64_table[parseInt(six_bit[i], 2)];
  }
  // console.log(result);

  return result;
}
base64("Hello BoostCamper,\n\tThis message written by JK.\n");
