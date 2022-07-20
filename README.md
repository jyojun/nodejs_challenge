# Day3

## 체크 포인트

- [x] 크롤링(Crawling) 관련 라이브러리 설치

```shell
npm install axios cheerio
```

> npm@5부터 --save는 기본 옵션이기 때문에, 사용하지 않더라도 모든 install 명령은 package.json의 dependencies에 설치된 패키지를 기록한다.

- [x] HTML (GET 방식을 통해 검색 키워드에 대한 HTML정보 가져오기)

- axios 모듈을 사용하여 통신하며, axios.get() 함수 내에 파리미터로 검색해야할 키워드를 포함한 url을 넣는다.

```javascript
const axios = require("axios");

const getHtml = async (keyword) => {
  try {
    return await axios.get(
      `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=` +
        encodeURI(keyword)
    );
  } catch (err) {
    console.log(eer);
  }
};
```

- [x] cheerio 라이브러리를 사용하여 가져온 HTML 데이터를 파싱한다.

```javascript
const cheerio = require("cheerio");

const parsing = async (keyword) => {
  const html = await getHtml(keyword); // 키워드에 대한 모든 정보가 담겨있다.
  const $ = cheerio.load(html.data); // HTML을 파싱하고 DOM 생성
  const elements = $(".total_wrap.api_ani_send"); // class명이 total_tit_group 인 요소

  let cnt = 0;
  elements.each((idx, item) => {
    // element를 순회하여 출력한다.

    if ($(item).find(".total_tit_group .total_tit").text() === "") {
      // 제목이 비어있으면 pass
      return true; // each 문에서 return true는 continue
    }
    console.log(
      `결과${cnt + 1}.`,
      "제목 : ",
      $(item).find(".total_tit_group .total_tit").text()
    ); // 제목
    console.log(
      `결과${cnt + 1}.`,
      "링크 : ",
      $(item).find(".total_tit_group .total_source").text()
    ); // 링크
    console.log(
      `결과${cnt + 1}.`,
      "미리보기 : ",
      $(item).find(".api_txt_lines").text()
    ); // 미리보기

    cnt = cnt + 1;
    if (cnt >= 5) {
      return false; // each 문에서 return false는 break;
    }
  });
};
```

- naver view 게시글 처럼 제목, 링크가 없고 미리보기만 있는 경우 전처리를 해주었다.
- 네이버 개발자 도구를 살펴보면 total_wrap api_ani_send에 게시글 박스들의 정보가 들어있다.
- 이중 .total_tit_group 에는 (제목, 링크), .api_txt_lines 클래스에는 미리보기 정보가 들어있다.
- .total_tit_group에서 제목과 링크는 각각 .total_tit, .total_source selector를 사용한다.

## 학습 메모

#### 필요한 라이브러리

- Axios: 브라우저와 Node 환경에서 사용하는 Promise 기반의 HTTP Client로 사이트의 HTML을 가져올 때 사용할 라이브러리.

- Cheerio: Node.js 환경에서 JQuery 처럼 Dom Selector 기능을 제공, Axios 결과로 받은 데이터에서 필요한 데이터를 추출하는데에 사용.

#### 제이쿼리(JQuery)

제이쿼리를 사용하면 간편하게 HTML 요소를 선택하고, 그렇게 선택된 요소에 손쉽게 특정 동작을 설정 할 수 있다.

```javascript
$(선택자).동작함수();
```

- 달러($) 표시는 제이쿼리를 의미하고, 제이쿼리에 접근할 수 있게 해주는 식별자.

#### CSS Selectors

1. 전체 선택자

   - 모든 요소를 선택하고, 네임스페이스 제한을 둔다.

2. 유형 선택자

   - 주어진 노드 이름을 가진 모든 요소를 선택한다.
   - ex) input은 모든 input 요소와 일치

3. 클래스 선택자

   - 주어진 class 특성을 가진 모든 요소를 선택
   - ex) .index는 class="index"를 가진 모든 클래스 와 일치

4. ID 선택자
   - id 특성에 따라 요소를 선택한다. 문서 내에는 주어진 id를 가진 요소가 하나만 존재해야한다.
   - ex) #toc는 id="toc"을 가진 요소와 일치

Link: https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Selectors

#### 오류 해결방법

- https://hashcode.co.kr/questions/9521/nodejs-%EC%82%AC%EC%9D%B4%ED%8A%B8%EC%A0%91%EA%B7%BC-%EC%8B%9C-request-path-contains-unescaped-characters-%EC%97%90%EB%9F%AC - request path contains unescaped characters 에러
