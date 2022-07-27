class BoostSet {
  #arr = [];
  constructor(arr) {
    let uniqueArr = arr.filter((item, idx) => {
      return arr.indexOf(item) === idx;
    });

    Object.freeze(uniqueArr);
    this.#arr = uniqueArr;
  }

  #getArr() {
    return this.#arr;
  }

  get arr() {
    const arr = this.#getArr();
    return arr;
  }

  // 합집합
  sum(other) {
    let result = [...this.arr];
    other.arr.map((x) => {
      if (!result.includes(x)) result.push(x);
    });
    return result;
  }

  // 여집합
  complement(other) {
    return this.arr.filter((x) => !other.arr.includes(x));
  }

  // 교집합
  intersect(other) {
    return this.arr.filter((x) => other.arr.includes(x));
  }

  // 모든 요소 1차원 배열로 리턴
  resultAll() {}
}

const set = new BoostSet([1, 2, 2, 3, 3, 3, 3, 5]);
const set2 = new BoostSet([1, 3, 3, 4, 4]);

console.log(set.arr);
console.log(set2.arr);

set.arr[2] = 100;

console.log(set.sum(set2));
console.log(set.complement(set2));
console.log(set.intersect(set2));
