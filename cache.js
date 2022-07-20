class Cache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // 맵으로 키워드 : 데이터를 저장
    this.hitCount = 0;
  }

  get(keyword) {
    let item = this.cache.get(keyword);
    if (item) {
      // 캐시에 키워드가 존재한다면 다시 맨 뒤로 갱신
      this.cache.delete(keyword);
      this.cache.set(keyword, item);
      this.hitCount = this.hitCount + 1; // hit count 증가 (참조할 때 존재)
      console.log("cache hit!");
    }
    return item;
  }

  set(keyword, data) {
    // 캐시에 keyword가 있다면 갱신해준다.
    if (this.cache.has(keyword)) {
      this.cache.delete(keyword);

      // 캐시에 없고, 꽉차있다면 가장 오래된 노드를 삭제해준다.
    } else if (this.cache.size == this.capacity) {
      this.cache.delete(this.getLRU());
    }

    // 적재
    this.cache.set(keyword, data);
  }

  getLRU() {
    return this.cache.keys().next().data;
  }

  show() {
    console.log(this.cache, this.hitCount);
  }
}

let cache = new Cache(5);
cache.get("google", "google");
cache.set("google", "google");
cache.get("google", "google");
cache.set("google", "google");
cache.show();
