var https = require("https");
var cheerio = require("cheerio");

function get_link(link) {
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
}
const get_src = (data) => {
  const $ = cheerio.load(data);
  const $script = $("script");
  $script.each((i, element) => {
    let src = element.attribs.src;
    if (src) console.log(src);
  });

  const $img = $("img");
  $img.each((i, element) => {
    let src = element.attribs.src;
    if (src) console.log(src);
  });
};

get_link("https://www.naver.com");
