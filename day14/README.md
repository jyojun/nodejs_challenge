# Day14

## 체크 포인트
- [x] HTTP GET 요청을 하여 응답한 HTML값 저장. (URL 입력 후 HTTP 요청 보내기)
- [x] cheerio html parser로 script, img 속성 주소값 저장. (HTML 파싱 - src 속성 탐색 구현)
- [x] 응답 대기 시간 측정 및 출력
- [x] 다운로드 시간 측정 및 출력
- [x] 요청 도메인 개수 측정 및 출력
- [x] 전체 요청 개수 측정 및 출력
- [x] 전체 이미지 개수 측정 및 출력
- [x] 전체 코드 개수 측정 및 출력
- [x] 전체 전송 용량 측정 및 출력
- [ ] 리다이렉트 개수 측정 및 출력
- [ ] 응답 - 리소스 메모리 캐싱 구현
- [ ] 캐싱 데이터 측정 및 출력

![image](https://user-images.githubusercontent.com/64758931/182864178-ed72cb82-2c6d-44bf-9b41-3ec954e5cd38.png)

![image](https://user-images.githubusercontent.com/64758931/182973947-695d88d3-5d45-43d7-b754-04eda493185c.png)

### 실행

```shell
npm i 
npm run input.js
```


## 학습 메모

#### 프로미스 예제

```javascript
function getData() {
  return new Promise(function(resolve, reject) {
    $.get('url 주소/products/1', function(response) {
      if (response) {
        resolve(response);
      }
      reject(new Error("Request is failed"));
    });
  });
}

// 위 $.get() 호출 결과에 따라 'response' 또는 'Error' 출력
getData().then(function(data) {
  console.log(data); // response 값 출력
}).catch(function(err) {
  console.error(err); // Error 출력
});
```
서버에 제대로 응답을 받으면 resolve() 메서드 호출
응답이 없으면 reject() 메서드 호출.
호출된 메서드에 따라 then() 이나 catch()로 분기하여 응답 결과 또는 오류 호출

- 호출 응답 시간 -> request time option
https://stackoverflow.com/questions/18106825/nodejs-request-library-get-the-response-time


