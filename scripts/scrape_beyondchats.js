const axios = require("axios");
const cheerio = require("cheerio");

const BASE_URL = "https://beyondchats.com";

async function getLastPageUrl() {
  const res = await axios.get(`${BASE_URL}/blogs`);
  const $ = cheerio.load(res.data);

  let lastPageUrl = null;

  $("a.page-numbers").each((_, el) => {
    const href = $(el).attr("href");
    if (href) lastPageUrl = href;
  });

  return lastPageUrl || `${BASE_URL}/blogs`;
}

async function getArticleLinks(pageUrl) {
  const res = await axios.get(pageUrl);
  const $ = cheerio.load(res.data);

  const links = [];

  $("a[href*='/blogs/']").each((_, el) => {
    const href = $(el).attr("href");
    if (
      href &&
      href.includes("/blogs/") &&
      !href.includes("page")
    ) {
      links.push(href.startsWith("http") ? href : BASE_URL + href);
    }
  });

  return [...new Set(links)].slice(0, 5);
}

(async () => {
  try {
    const lastPage = await getLastPageUrl();
    console.log("Last page:", lastPage);

    const articleLinks = await getArticleLinks(lastPage);
    console.log("Oldest article links:");
    articleLinks.forEach((l, i) => console.log(`${i + 1}. ${l}`));
  } catch (err) {
    console.error("Scraper error:", err.message);
  }
})();
