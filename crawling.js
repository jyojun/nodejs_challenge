const axios = require("axios");
const cheerio = require("cheerio");

const getHtml = async (keyword) => {
  try {
    return await axios.get(`https://www.google.com/search?q=${"Apple"}`);
  } catch (err) {
    console.log(werr);
  }
};

const parsing = async (keyword) => {
  const html = await getHtml(keyword);
  console.log(html);
};

parsing("애플");
