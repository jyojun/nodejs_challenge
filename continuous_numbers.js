import { sort_arr } from "./common.js";

// 연속된 5개 수가 있는지 cnt를 셀 함수
function five_count(arr) {
  let cnt = 1;
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] + 1 === arr[i + 1]) {
      // 정렬된 함수가 연속된 함수일 때 count
      cnt += 1;
      if (cnt >= 5) {
        // 5개 이상인 경우 빠져나옴
        return cnt;
      }
    } else if (arr[i] === arr[i + 1]) {
      // 숫자가 같은경우는 넘어감
      continue;
    } else {
      // 그 외의 경우 count를 초기화
      cnt = 1;
    }
  }
  return cnt;
}

function five_continuous_numbers(arr) {
  let sorted_arr = sort_arr(arr);
  let cnt = five_count(arr);
  console.log(cnt);
  if (cnt >= 5) {
    return 1;
  } else {
    return 0;
  }
}

export { five_continuous_numbers };
