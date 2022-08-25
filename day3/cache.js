class Cache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // 맵으로 키워드 : 데이터를 저장
    this.hitCount = new Map(); // rkrrk
  }

  get(keyword) {
    let item = this.cache.get(keyword);
    if (item) {
      // 캐시에 키워드가 존재한다면 다시 맨 뒤로 갱신
      this.cache.delete(keyword);
      this.cache.set(keyword, item);
      this.hitCount.set(keyword, this.hitCount.get(keyword) + 1); // hit count 증가 (참조할 때 존재)
      console.log("cache hit!");
    }
    return item;
  }

  set(keyword, data) {
    // 캐시에 keyword가 있다면 갱신해준다.
    if (this.cache.has(keyword)) {
      let temp = this.cache.get(keyword);
      temp = temp.concat(data); // 키워드의 이미 있던 데이터와 새로 들어온 데이터를 연결

      if (temp.length > 10) {
        temp = temp.slice(temp.length - 10); // 최대 10 보다 더 길어진만큼 자른다.
      }
      this.cache.delete(keyword);
      this.cache.set(keyword, temp);
      // 캐시에 없고, 꽉차있다면 가장 오래된 노드를 삭제해준다.
    } else if (this.cache.size == this.capacity) {
      const temp = this.getLRU(); // 가장 오래된 키워드
      console.log(temp);
      this.cache.delete(temp);
      this.hitCount.delete(temp);
      this.cache.set(keyword, data);
      console.log(`its full! delete ${temp}`);
    } else {
      this.cache.set(keyword, data);
    }

    // 처음 적재 되면 hitCount를 0으로 초기화
    if (this.hitCount.get(keyword) === undefined) {
      this.hitCount.set(keyword, 1);
    }
  }

  getLRU() {
    return this.cache.keys().next().value;
  }

  show(keyword) {
    console.log(`${keyword}\n`);
    this.cache.get(keyword).forEach((idx, item) => {
      console.log(`${item + 1}번째 자료 ${idx}\n`);
    });
  }
  showKeyword() {
    // 캐시속 전체 키워드와 그에 해당하는 hitcount만 출력
    this.cache.forEach((idx, item) => {
      console.log(`${item}(${this.hitCount.get(item)})`);
    });
  }
}

export default Cache;
