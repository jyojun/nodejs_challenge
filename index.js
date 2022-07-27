class BoostSet {
  #arr = [];
  constructor(arr) {
    // 생성자 함수에서 set 역할을 해준다.
    // arr.sort(function (a, b) {
    //   return a - b;
    // });
    let uniqueArr = arr.filter((item, idx) => {
      return arr.indexOf(item) === idx;
    });
    this.#arr = uniqueArr;
  }

  #getArr() {
    return this.#arr;
    j;
  }

  get arr() {
    return this.#getArr();
  }

  sum(other) {
    let result = this.arr.filter((item) => {
      return !other.arr.includes(item);
    });
    other.arr.map((item) => {
      result.push(item);
    });
    return result;
  }
  complement(other) {}
  intersect(other) {}
  resultAll() {}
}

const set = new BoostSet([1, 2, 2, 3, 3, 3, 3, 5]);
const set2 = new BoostSet([1, 3, 3, 3]);

console.log(set.arr);
console.log(set2.arr);

console.log(set.sum(set2));
