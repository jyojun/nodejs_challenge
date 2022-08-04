export class Counter {
  constructor() {
    this.domain = new Map();
    this.requests = 0;
    this.img = 0;
    this.code = 0;
    this.size = 0;
    this.redirects = 0;
    this.load_time = 0;
    this.largest_size = 0;
    this.longest_wait_time = 0;
    this.longest_download_time = 0;
  }

  display() {
    console.log("도메인 개수 : ", this.domain.size);
    console.log("요청 개수 : ", this.requests);
    console.log("이미지 개수(png, gif, jpg) 개수 : ", this.img);
    console.log("코드(css, js) 개수 : ", this.code);
    console.log(
      "전송용량 : ",
      `${Math.round((this.size / 1024) * 100) / 100}MB`
    );
    console.log("리다이렉트 개수 : ", this.redirects);
    console.log("전체 로딩 시간 : ", this.load_time);
    console.log("가장 큰 용량 : ", `${this.largest_size}KB`);
    console.log("가장 오랜 대기 시간 : ", `${this.longest_wait_time}ms`);
    console.log("가장 오랜 다운로드 시간: ", `${this.longest_download_time}ms`);
  }

  update(domain, file, type, size, wait_time, download_time) {
    if (this.domain.has(domain)) {
      this.domain.set(domain, this.domain.get(domain) + 1);
    } else {
      this.domain.set(domain, 1);
    }

    this.requests++;
    if (type === "png" || type === "gif" || type === "jpg") this.img++;
    if (type === "css" || type === "js") this.code++;
    this.size += size;
    if (this.largest_size < size) {
      // this.largest_size[0] = file;
      this.largest_size = size;
    }

    if (this.longest_wait_time < wait_time) {
      // this.longest_wait_time = file;
      this.longest_size = wait_time;
    }

    if (this.longest_download_time < download_time) {
      // this.longest_downlaod_time[0] = file;
      this.longest_download_time = download_time;
    }
  }
}
