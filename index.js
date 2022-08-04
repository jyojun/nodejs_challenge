import https from "https";
import cheerio from "cheerio";
import request from "request";
import url from "url";
import { Counter } from "./counter.js";

const counter = new Counter();
function get_link(link) {
  https.get(link, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      getDownload(link);
      get_src(data);
    });
  });
}
function get_src(data) {
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

  setTimeout(() => {
    counter.display();
  }, 2000);
}

// get_link("https://m.naver.com");

function getDownload(url) {
  return new Promise((resolve, reject) => {
    request(
      { url, time: true, resolveWithFullResponse: true },
      (err, res, body) => {
        if (err) Error("request is failed");
        const regexp = /^(https?):\/\/([^:\/\s]+)(:([^\/]*))?((\/[^\s/\/]+)*)?\/([^#\s\?]*)(\?([^#\s]*))?(#(\w*))?$/;

        let parsedUrl = regexp.exec(url);
        // console.log(parsedUrl);
        if (!parsedUrl) return;
        let scheme = parsedUrl[1];
        let domain = parsedUrl[2];

        let path = parsedUrl[5] + parsedUrl[6];
        if (!parsedUrl[5] || !parsedUrl[6]) {
          path = "/";
        }
        let file = parsedUrl[7];
        let type = file.split(".")[file.split(".").length - 1];
        let size = Math.round((body.length / 1024) * 100) / 100;
        let download_time =
          Math.round((res.timings.end - res.timings.response) * 100) / 100;
        let wait_time = Math.round(res.timings.response * 100) / 100;
        counter.update(domain, file, type, size, wait_time, download_time);
        console.log(">>", file);
        console.log("도메인", domain);
        console.log("스킴", scheme);
        console.log("경로", path);
        console.log("종류", type);
        console.log("용량", `${size}KB`); // content-length 없는 경우.
        console.log("대기 시간", `${wait_time}ms`); // res.timings.end == res.elapsedTime
        console.log("다운로드 시간", `${download_time}ms`);
        console.log();
      }
    );
  });
}

export { get_link };
