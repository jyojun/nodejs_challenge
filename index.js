const str = `<!DOCTYPE html><HTML lang="ko"><BODY><P>BOOST<IMG SRC=\"codesquad.kr\"></IMG><BR/></P></BODY></HTML>
`;

// 토큰화 하기 (tag open, tag close, attribute_name, operator, value)
function tokenizer(str) {
  const result = [];
  let temp = "";
  let tag_inside = false;
  let text_inside = false;
  let attribute_value_start = true;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "<") {
      if (temp !== "") {
        // text 같은 문자열이 앞에 추가되면 안되기 떄문에, "<" 앞에서 끊어준다.
        result.push(temp);
        temp = "";
      }
      temp += str[i];
      tag_inside = true;
      text_insde = false;
    } else if (str[i] === ">") {
      if (temp[0] !== "<") {
        result.push(temp);
        temp = "";
      }
      temp += str[i];
      result.push(temp);
      temp = "";
      tag_inside = false;
      attribute_value_start = false;
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
      attribute_value_start = true;
    } else if (str[i] === "\n") {
      continue;
    } else if (!text_inside && !tag_inside && str[i] === " ") {
      continue;
    } else if (attribute_value_start === true) {
      temp += str[i];
    } else {
      // text area
      temp += str[i];
      text_inside = true;
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
    if (c.includes("!") || c.includes("?")) {
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
class Stack {
  constructor() {
    this.stack = [];
  }
  push(element) {
    this.stack.push(element);
  }
  pop() {
    this.stack.pop();
  }
  top() {
    return this.stack[this.stack.length - 1];
  }
}

stack = new Stack();

function parser(arr) {
  let result = {};
  let attribute_name = "";
  let attribute_value = "";
  let tag_in = false;
  for (c of arr) {
    if (c[0] === "tag_start") {
      if (c[1].includes(">") === false) {
        tag_in = true;
      }
      stack.push({
        element: c[1].replace("<", "").replace(">", ""),
        text: "",
        attributes: [],
        children: [],
      });
    } else if (tag_in === true && c[0] === "attribute_name") {
      attribute_name = c[1];
    } else if (tag_in === true && c[0] === "attribute_value") {
      attribute_value = c[1].replace('"', "").replace('"', "");
      stack.top()["attributes"].push({
        name: attribute_name,
        value: attribute_value,
      });
      attribute_name = "";
      attribute_value = "";
    } else if (c[0] === "tag_end") {
      tag_in = false;
    } else if (c[0] === "end_tag_start") {
      //   console.log(stack.stack);
      let temp = stack.top();
      stack.pop();

      // 비어있는 값은 key 제거
      if (temp["attributes"].length === 0) delete temp["attributes"];
      if (temp["text"] === "") delete temp["text"];
      if (temp["children"].length === 0) delete temp["children"];
      if (stack.stack.length === 0) {
        result = temp;
      } else {
        stack.top()["children"].push(temp);
      }
    } else if (c[0] === "start_with_end") {
      stack.top()["children"].push({
        element: c[1].replace("/>", "").replace("<", ""),
      });
    } else if (c[0] === "text") {
      stack.top()["text"] = c[1];
    }
  }
  return result;
}

function stringify(arr) {
  let stack = new Stack();

  for (t of arr) {
    if (t.includes("!")) {
      continue;
    }

    // < 으로 시작하고, / 으로 끝나면 continue
    if (t.includes("<")) {
      if (t[t.length - 2] == "/") continue;
      // ex <br/>, <img />
      else {
        // < 로 시작하기만 하면,
        if (stack.length !== 0) {
          let temp = stack.top().replace("<", "").replace(">", "");
          if (temp == t.replace("</", "").replace(">", "")) {
            // 방금 넣은 태그와 같은 태그일 경우 pop
            stack.pop();
          } else {
            // 아닐 경우 잘못된 형식
            throw Error("올바른 XML 형식이 아닙니다.");
          }
        } else {
          throw Error("올바른 XML 형식이 아닙니다.");
        }
      }
    } else {
      // 아닐경우 push
      stack.push(t);
    }
  }
}

function elementByAttribute(obj, name, value) {
  if (obj["attributes"]) {
    for (let i = 0; i < obj.attributes.length; i++) {
      if (
        obj.attributes[i].name === name &&
        obj.attributes[i].value === value
      ) {
        return obj;
      }
    }
  }
  if (obj["children"]) {
    for (let i = 0; i < obj.children.length; i++) {
      let new_obj = obj.children[i];
      return elementByAttribute(new_obj, name, value);
    }
  }
}

tokens = tokenizer(str);
lexArr = lexer(tokens);

console.log("--------------tokens-------------");
console.log(tokens);
console.log("---------------------------------");

console.log("lexer start: ");
console.log(lexArr);

console.log("parser start");
let result = parser(lexArr);

console.dir(result, { depth: null });

// XML 잘못된 형식
// const str2 = `<!DOCTYPE html><HTML lang="ko"><BODY></HTML></BODY>`;

// tokens2 = tokenizer(str2);
// stringify(tokens2);

// elementByAttribute;

console.log(`elementByAttribute(obj, "lang", "ko")`);
console.log(elementByAttribute(result, "lang", "ko"));
console.log(`elementByAttribute(obj, "SRC", "codesquad.kr")`);
console.log(elementByAttribute(result, "SRC", "codesquad.kr"));
