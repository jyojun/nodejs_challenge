export default class BoostSet {
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

  resultAll() {
    const arr = this.#getArr();
    return arr;
  }

  // 합집합
  sum(other) {
    let newList = [...this.resultAll()];
    other.resultAll().map((x) => {
      if (!newList.includes(x)) newList.push(x);
    });
    return newList;
  }

  // 여집합
  complement(other) {
    let newList = [];
    for (const a of this.filter(
      (x) => !other.resultAll().includes(x),
      this.resultAll()
    ))
      newList.push(a);
    return newList;
  }

  // 교집합
  intersect(other) {
    let newList = [];
    for (const a of this.filter(
      (x) => other.resultAll().includes(x),
      this.resultAll()
    ))
      newList.push(a);
    return newList;
  }

  // filter, map 메소드 생성
  *filter(f, iter) {
    for (const a of iter) {
      if (f(a)) yield a;
    }
  }

  *map(f, iter) {
    for (const a of iter) {
      yield f(a);
    }
  }
}

// // A, B boostSet 생성
// const setA = new BoostSet([1, 2, 2, 3, 3, 3, 3, 5]);
// const setB = new BoostSet([1, 3, 3, 4, 4]);

// console.log(setA.resultAll());
// console.log(setB.resultAll());

// console.log(setA.sum(setB));
// console.log(setA.complement(setB));
// console.log(setA.intersect(setB));
