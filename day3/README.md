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

![스크린샷 2022-07-20 오후 5 32 41](https://user-images.githubusercontent.com/64758931/179936421-f8b17140-d6ba-4ec3-bffc-2d1f24ca4493.png)

![image](https://user-images.githubusercontent.com/64758931/179936377-09e7269a-fede-4265-a26e-b50c23fa70e2.png)


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

![image](https://user-images.githubusercontent.com/64758931/179935964-b5956bb5-192d-458e-a3b1-17204ac775cb.png)


- [x] 콘솔 입출력으로 크롤링을 진행한다.
```javascript
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let keyword = "";
console.log("키워드 입력 : ");

rl.on("line", function (line) {
  keyword = line;
  rl.close();
}).on("close", function () {
  parsing(keyword);
  // process.exit();
});
```


-> 입력값을 받을 때, readlineSync 모듈로 변경하였다.
```javascript
// index.js
do {
  keyword = readlineSync.question("키워드를 입력하세요 (x를 누르면 종료) ");
  if (keyword === "x") {
    break;
  }
  if (keyword === "$cache") {
    // $cache를 입력하면 keyword가 입력
    cache.showKeyword();
    continue;
  }
  let result = await parsing(keyword);

  cache.get(keyword);
  cache.set(keyword, result);
  cache.show(keyword);
} while (1);
``` 

- [x] LRU 알고리즘 구현 (GET, SET)

1. 클래스를 이용하여 Cache를 구현한다.
2. Cache 클래스 객체를 생성할 때는, capacity를 설정한다. (ex: cache = new Cache(5))
3. Cache 객체는 get(), set() 메소드가 있는데, 연결리스트로 구현한다.
  * get() 메소드
    * 캐시에 키워드가 존재한다면 다시 맨 뒤로 갱신한다.
    * 캐시 안에 이미 존재한다면, hitCount를 1씩 추가한다.

  * set() 메소드
    * 캐시에 키워드가 존재한다면, 갱신해준다. 이때, 해당 키워드 데이터가 10개가 넘어가면 앞에서 잘라준다.
    * 캐시에 없고, 이미 꽉차있는 캐시라면 가장 오래된 맨 앞 키워드를 삭제하고 적재한다.

  * 그 외, $cache를 입력받았을 때, 캐시속 전체 키워드와 그에 해당하는 hitCount를 출력하는 메소드도 포함.


#### 실행 결과
- google, apple, apple, apple, apple, google, $cache 입력시
-> google, apple 각각 3,2 번 hit count 발생 
![image](https://user-images.githubusercontent.com/64758931/179998818-f6bd6c5e-26b7-4fd0-8065-206a73136d27.png)

- google, apple, amazon, naver, boostcamp, nike $cache 입력시
-> capacity 5개 초과로 입력시 가장 오래전에 호출한 google이 삭제되고 nike가 캐시에 적재된다. 
![image](https://user-images.githubusercontent.com/64758931/179998889-a9dddcfb-0181-4ff5-99f9-a72bd0184f22.png)
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
5. LRU 알고리즘
   - https://dailylifeofdeveloper.tistory.com/355


#### 오류 해결방법

- https://hashcode.co.kr/questions/9521/nodejs-%EC%82%AC%EC%9D%B4%ED%8A%B8%EC%A0%91%EA%B7%BC-%EC%8B%9C-request-path-contains-unescaped-characters-%EC%97%90%EB%9F%AC - request path contains unescaped characters 에러


#### 실행
```shell
git clone https://gist.github.com/jyojun/6a9cb54b67a2032c4bd18ab90a89ae55 day3
cd day3
npm install
node index.js
```
