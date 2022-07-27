import BoostSet from "./boostSet.js";

export default class CountSet {
  #arr = {};
  #list = {};
  constructor(arr) {
    let set = [];
    let count = [];

    arr.map((x) => {
      if (!set.includes(x)) {
        set.push(x);
        count.push(this.reduce((cnt, item) => cnt + (x === item), 0, arr));
        // count.push(arr.reduce((cnt, item) => cnt + (x === item), 0));
        this.#arr[set[set.length - 1]] = count[count.length - 1];
      }
    });
    this.#list = arr;
    Object.freeze(this.#list);
    Object.freeze(this.#arr);
  }
  #getArr() {
    return this.#arr;
  }

  #getList() {
    return this.#list;
  }

  // 새로운 요소 추가
  append(element) {
    const new_list = [...this.#getList()];
    new_list.push(element);
    return new CountSet(new_list); // 새로운 CountSet 정의
  }

  // 요소의 count를 줄인다.
  remove(element) {
    let new_list = [...this.#getList()];
    const index = new_list.indexOf(element);
    if (index > -1) new_list.splice(index, 1);

    return new CountSet(new_list);
  }

  countFor(element) {
    let cnt = 0;
    for (const a of this.filter((x) => x === element, this.#getList())) cnt++;
    return cnt;
  }

  resultAll() {
    const arr = this.#getArr();
    return arr;
  }

  sum(other) {
    let newList = [...this.#getList()];
    other.#getList().map((x) => {
      if (!newList.includes(x)) newList.push(x);
    });
    return new CountSet(newList);
  }

  complement(other) {
    let newList = [];
    for (const a of this.filter(
      (x) => !other.#getList().includes(x),
      this.#getList()
    ))
      newList.push(a);
    return new CountSet(newList);
  }
  intersect(other) {
    let newList = [];
    for (const a of this.filter(
      (x) => other.#getList().includes(x),
      this.#getList()
    )) {
      newList.push(a);
    }

    const newSet = new BoostSet(newList);

    return new CountSet(newSet.resultAll());
  }

  // filter, reduce 메소드 생성
  *filter(f, list) {
    for (const a of list) {
      if (f(a)) yield a;
    }
  }

  reduce(f, acc, iter) {
    for (const a of iter) {
      acc = f(acc, a);
    }
    return acc;
  }
}

// const countA = new CountSet([1, 1, 1, 1, 2, 2, 2, 3, 3]);
// const countB = new CountSet([2, 2, 3, 4]);
// console.log(countA.resultAll());
// console.log(countB.resultAll());

// console.log(countA.append(5).resultAll());
// console.log(countB.remove(3).resultAll());
// console.log(countA.countFor(3));
// console.log(countA.sum(countB).resultAll());
// console.log(countA.complement(countB).resultAll());
// console.log(countA.intersect(countB).resultAll());
