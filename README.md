# Day 1 

## 체크 포인트 (해야 할 일)
- [x] 페어 갯수를 리턴하는 함수
- [x] 다섯 숫자가 연속으로 나오는 지 판단하는 함수
- [ ] 두 배열의 승자를 리턴하는 함수
- [ ] 메인 함수
## 학습 메모

####  1. 정렬 함수
###### JS의 sort() 메서드는  배열의 요소를 적절한 위치에 정렬 한 후 그 배열을 반환한다. 기본 정렬 순서는 문자열의 유니코드 코드 포인트를 따르기 때문에, 숫자값을 갖는 배열 정렬은 compareFunction을 사용하여 구현한다. 

##### 1.1 매개변수 
##### compareFunction(a,b)

- 숫자를 비교하기 위해 compare 함수는 a에서 b를 빼줄 수 있다. (infinity, NaN값이 포함되어 있지 않아야함.)

```javascript
var numbers = [1, 3, 10, 2, 21];

numbers.sort(function (a, b) {
    return a - b;
});

console.log(numbers); // [1, 2, 3, 10, 21]
```

- 내림 차순정렬은 반대로 b에서 a값을 리턴해준다. 
- 이차원 배열의 경우엔 a,b 을 각각의 배열이라고 생각하고 첫번째 원소 ~ 마지막 원소까지 비교하여 같을 경우에만 다음 원소를 비교한다.

```javascript
// 오름차순 기준
var numbers = [
    [1,1],
    [1,2],
    [2,3],
    [1,10]
]

numbers.sort(function (a, b) {
    if (a[0] === b[0]) {
        return a[1] - b[1]
    } else {
        return a[0] - b[0]
    }
})
```

* 출처 : <https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/sort>

#### 2. 모듈

##### 2.1 export, import 
- 변수나 함수, 클래스를 선언할 때 맨 앞에 export를 붙이면 내보내기가 가능하여 다른 파일에서도 활용 가능하다. 가져올 것이 많다면, 마지막 줄에 한꺼번에 내보내기도 가능하다. 

```javascript
export function sort_arr(arr) {j
    arr.sort()
    ...
}
```

```javascript
function sort_arr(arr) {
    arr.sort()
    ...
}

function sort_arr2(arr) {
    arr.sort()
    ...
}

export {sort_arr, sort_arr2}
```

- 외부에서 선언한 변수, 함수, 클래스를 가져올 때 import를 사용한다. (ex. import {...} ) 

```javascript
import {sort_arr, sort_arr2} from './common.js'

let arr = [1,3,2,5,4];
let sorted_arr = sort_arr(arr)
```

* 출처 : <https://ko.javascript.info/import-export>