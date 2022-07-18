import { sort_arr, sort_arr2 } from "./common.js";

// 배열에서 각 숫자별 pair 종류 정보 함수 (ex: 3 2개 페어, 1 4개 페어)
function get_pair(arr) {
  let cnt = 1;
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === arr[i + 1]) {
      cnt += 1;
    } else if (arr[i] !== arr[i + 1]) {
      result.push([cnt, arr[i]]);
      cnt = 1;
    }
  }
  return result;
}

// 배열에서 위 기능을 돌릴 함수
function count_pairs(arr) {
  let sorted_arr = sort_arr(arr);
  let result = get_pair(sorted_arr);
  sort_arr2(result);
  return result;
}

export { count_pairs };
