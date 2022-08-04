class Counter {
  constructor() {
    this.domain = 0;
    this.request = 0;
    this.img = 0;
    this.code = 0;
    this.size = 0;
    this.redirects = 0;
    this.load_time = 0;
    this.biggest_size = [];
    this.biggest_wait_time = [[], []];
    this.biggest_download_time = [[], []];
  }

  display() {
    console.log("도메인 개수 : ", this.domain);
    console.log("요청 개수 : ", this.requests);
    console.log("이미지 개수(png, gif, jpg) 개수 : ", this.img);
    console.log("코드(css, js) 개수 : ", this.code);
    console.log("전송용량 : ", this.size);
    console.log("리다이렉트 개수 : ", this.redirects);
    console.log("전체 로딩 시간 : ", this.load_time);
    console.log("가장 큰 용량 : ", this.largest_size);
    console.log("가장 오랜 대기 시간 : ", this.longest_wait_time);
    console.log("가장 오랜 다운로드 시간: ", this.longest_download_time);
  }
}

module.exports = Counter;
