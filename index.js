const str =
  '<!DOCTYPE html><HTML lang="ko"><BODY><P>BOOST<IMG SRC="codesquad.kr"></IMG><BR/></P></BODY></HTML>';

// 토큰화 하기 (tag open, tag close, attribute_name, operator, value)
function tokenizer(str) {
  const result = [];
  let temp = "";
  let tag_inside = false;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "<") {
      if (temp !== "") {
        // text 같은 문자열이 앞에 추가되면 안되기 떄문에, "<" 앞에서 끊어준다.
        result.push(temp);
        temp = "";
      }
      temp += str[i];
      tag_inside = true;
    } else if (str[i] === ">") {
      if (temp[0] !== "<") {
        result.push(temp);
        temp = "";
      }
      temp += str[i];
      result.push(temp);
      temp = "";
      tag_inside = false;
    } else if (tag_inside && str[i] === " ") {
      // 태그안에 빈칸이 있는경우 나누어준다.
      if (temp !== "") {
        result.push(temp);
        temp = "";
      }
    } else if (str[i] === "=") {
      // "="이 나올경우 앞에 attribute name, = 둘다 push한다.
      result.push(temp);
      result.push(str[i]);
      temp = "";
    } else {
      temp += str[i];
    }
  }
  return result;
}

tokens = tokenizer(str);
console.log(tokens);
