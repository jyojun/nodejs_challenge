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

function lexer(arr) {
  let lexArr = [];
  let comment_in = false;
  let tag_in = false;
  let before_operator = true;
  for (c of arr) {
    if (c.includes("!")) {
      // 주석은 제외
      comment_in = true;
      continue;
    } else {
      if (comment_in === true) {
        // 주석안에 있으면 ">"를 만날때 끝난다.
        if (c === ">") {
          comment_in = false;
        }
        continue;
      } else {
        if (c.startsWith("<") && c.includes("/>")) {
          lexArr.push(["start_with_end", c]);
        } else if (c.startsWith("</")) {
          lexArr.push(["end_tag_start", c]);
        } else if (c.startsWith("/>")) {
          lexArr.push(["end_tag_end", c]);
        } else if (c.startsWith("<")) {
          lexArr.push(["tag_start", c]);
          if (c.includes(">")) {
            tag_in = false;
          } else {
            tag_in = true;
          }
        } else if (c.includes(">")) {
          lexArr.push(["tag_end", c]);
          tag_in = false;
        } else if (c === "=") {
          lexArr.push(["operator", c]);
        } else if (tag_in === true) {
          if (before_operator === true) {
            lexArr.push(["attribute_name", c]);
            before_operator = false;
          } else {
            lexArr.push(["attribute_value", c]);
            before_operator = true;
          }
        } else {
          lexArr.push(["text", c]);
        }
      }
    }
  }
  return lexArr;
}

tokens = tokenizer(str);

console.log("--------------tokens-------------");
console.log(tokens);
console.log("---------------------------------");

console.log("lexer start: ");
console.log(lexer(tokens));
