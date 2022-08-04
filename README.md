# Day14

## 체크 포인트
- [x] HTTP GET 요청을 하여 응답한 HTML값 저장.
- [x] cheerio html parser로 script, img 속성 주소값 저장.

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

