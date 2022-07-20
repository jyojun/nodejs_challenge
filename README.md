# Day3

## 체크 포인트

- [x] 크롤링(Crawling) 관련 라이브러리 설치

```shell
npm install axios cheerio
```

> npm@5부터 --save는 기본 옵션이기 때문에, 사용하지 않더라도 모든 install 명령은 package.json의 dependencies에 설치된 패키지를 기록한다.

- [ ] HTML (GET 방식을 통해 검색 키워드에 대한 HTML정보 가져오기)

- axios 모듈을 사용하여 통신하며, axios.get() 함수 내에 파리미터로 검색해야할 키워드를 포함한 url을 넣는다.

```javascript
const axios = require("axios");

const getHtml = async (keyword) => {
  try {
    return await axios.get(`https://www.google.com/search?q=${keyword}`);
  } catch (err) {
    console.log(err);
  }
};
```

## 학습 메모

#### 필요한 라이브러리

- Axios: 브라우저와 Node 환경에서 사용하는 Promise 기반의 HTTP Client로 사이트의 HTML을 가져올 때 사용할 라이브러리.

- Cheerio: Node.js 환경에서 JQuery 처럼 Dom Selector 기능을 제공, Axios 결과로 받은 데이터에서 필요한 데이터를 추출하는데에 사용.
