import axios from "axios";
import cheerio from "cheerio";

import readline from "readline";

let keyword = "";
console.log("키워드 입력 : ");

const getHtml = async (keyword) => {
  try {
    return await axios.get(
      `https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=` +
        encodeURI(keyword)
    );
  } catch (err) {
    console.log(err);
  }
};

const parsing = async (keyword) => {
  const html = await getHtml(keyword); // 키워드에 대한 모든 정보가 담겨있다.
  const $ = cheerio.load(html.data); // HTML을 파싱하고 DOM 생성
  const elements = $(".total_wrap.api_ani_send"); // class명이 total_tit_group 인 요소

  let cnt = 0;
  let data = [];
  elements.each((idx, item) => {
    // element를 순회하여 출력한다.

    if ($(item).find(".total_tit_group .total_tit").text() === "") {
      // 제목이 비어있으면 pass
      return true; // each 문에서 return true는 continue
    }
    // console.log(
    //   `결과${cnt + 1}.`,
    //   "제목 : ",
    //   $(item).find(".total_tit_group .total_tit").text()
    // ); // 제목
    // console.log(
    //   `결과${cnt + 1}.`,
    //   "링크 : ",
    //   $(item).find(".total_tit_group .total_source").text()
    // ); // 링크
    // console.log(
    //   `결과${cnt + 1}.`,
    //   "미리보기 : ",
    //   $(item).find(".api_txt_lines").text()
    // ); // 미리보기
    let title = $(item).find(".total_tit_group .total_tit").text();
    let link = $(item).find(".total_tit_group .total_source").text();
    let desc = $(item).find(".api_txt_lines").text();

    data.push([title, link, desc]);
    cnt = cnt + 1;
    if (cnt >= 5) {
      return false; // each 문에서 return false는 break;
    }
  });
  return data;
};

export { parsing };
