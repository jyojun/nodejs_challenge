var https = require("https");
var cheerio = require("cheerio");
var request = require("request");

const get_link = (link) => {
  https.get(link, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      get_src(data);
    });

    // console.log(data);
  });
};
const get_src = (data) => {
  const $ = cheerio.load(data);
  const $script = $("script");
  $script.each((i, element) => {
    let src = element.attribs.src;
    if (src) getDownload(src);
  });

  const $img = $("img");
  $img.each((i, element) => {
    let src = element.attribs.src;
    if (src) getDownload(src);
  });
};

get_link("https://m.naver.com");

function getDownload(url) {
  return new Promise((resolve, reject) => {
    request(
      { url, time: true, resolveWithFullResponse: true },
      (err, res, body) => {
        if (err) Error("request is failed");
        const regexp = /^(https?):\/\/([^:\/\s]+)(:([^\/]*))?((\/[^\s/\/]+)*)?\/([^#\s\?]*)(\?([^#\s]*))?(#(\w*))?$/;

        let parsedUrl = regexp.exec(url);
        let scheme = parsedUrl[1];
        let domain = parsedUrl[2];
        let path = parsedUrl[5] + parsedUrl[6];
        let file = parsedUrl[7];
        let size = Math.round((body.length / 1024) * 100) / 100;
        let download_time =
          Math.round((res.elapsedTime - res.timings.response) * 100) / 100;
        console.log(">>", file);
        console.log("도메인", domain);
        console.log("스킴", scheme);
        console.log("경로", path);
        console.log("종류", file.split(".")[file.split(".").length - 1]);
        console.log("용량", `${size}KB`); // content-length 없는 경우.
        console.log("대기 시간", `${res.elapsedTime}ms`); // res.timings.end == res.elapsedTime
        console.log("다운로드 시간", `${download_time}ms`);
        console.log();
      }
    );
  });
}

console.log("here");
