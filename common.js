// 여러 함수에서 쓰일 공통 함수

// 배열 오름차순 정렬 함수
function sort_arr(arr) {
  arr.sort(function (a, b) {
    return a - b;
  });
  return arr;
}

// 2차원 배열 내림차순 정렬 함수
function sort_arr2(arr) {
  arr.sort(function (a, b) {
    if (a[0] === b[0]) {
      return b[1] - a[1];
    } else {
      return b[0] - a[0];
    }
  });
}

export { sort_arr, sort_arr2 };
