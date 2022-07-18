import { sort_arr2 } from "./common.js";
import { count_pairs } from "./count_pairs.js";
import { five_continuous_numbers } from "./continuous_numbers.js";

// 페어정보, 5개 연속수 정보 합치기 함수
function combine(arr) {
  let pairs = count_pairs(arr);
  let five_numbers = five_continuous_numbers(arr);
  pairs.push(five_numbers);
  return pairs;
}

function result_sort(arr) {
  let answer = combine(arr);
  sort_arr2(answer);
  return answer;
}

// 가장 높은 점수 페어 갯수를 센다
function highest_count(arr) {
  let cnt = 0;
  let temp = arr[0][0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] === temp) cnt += 1;
  }
  return cnt;
}

// 가장 높은 페어 갯수를 센다.
function highest_compare(arr1, arr2) {
  let result1 = highest_count(arr1);
  let result2 = highest_count(arr2);

  if (result1 > result2) {
    return 1;
  } else if (result1 < result2) {
    return 2;
  } else return 0;
}

// 가장 높은 페어의 갯수까지 같다면 페어가 나온 숫자를 값으로 바꾸어 비교
function arr_to_number(arr) {
  let result = "";
  for (let i = 0; i < arr.length; i++) {
    result += arr[i][1];
  }
  result = parseInt(result);

  return result;
}

function compare_number(arr1, arr2) {
  let result1 = arr_to_number(arr1);
  let result2 = arr_to_number(arr2);

  if (result1 > result2) {
    return 1;
  } else if (result1 < result2) {
    return 2;
  } else {
    return 0;
  }
}

function compare_rank(arr1, arr2) {
  let result1 = result_sort(arr1);
  let result2 = result_sort(arr2);
  if (result1[0][0] === 1 && result2[0][0] === 1) return 0;
  // 둘다 페어가 없고 규칙이 없으면 0
  else if (result1[0][0] > result2[0][0]) return 1;
  else if (result1[0][0] < result2[0][0]) return 2;
  else {
    if (highest_compare(result1, result2))
      return highest_compare(result1, result2);
    else return compare_number(result1, result2);
  }
}

export { compare_rank };
