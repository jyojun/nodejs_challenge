import Cache from "./cache.js";

let cache = new Cache(5);

import readlineSync from "readline-sync";
import { parsing } from "./crawling.js";

let keyword;
do {
  keyword = readlineSync.question("키워드를 입력하세요 (x를 누르면 종료) ");
  if (keyword === "x") {
    break;
  }
  if (keyword === "$cache") {
    // $cache를 입력하면 keyword가 입력
    cache.showKeyword();
    continue;
  }
  let result = await parsing(keyword);

  cache.get(keyword);
  cache.set(keyword, result);
  cache.show(keyword);
} while (1);
