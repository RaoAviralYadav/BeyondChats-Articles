const axios = require("axios");
const cheerio = require("cheerio");

const BASE_URL = "https://beyondchats.com";
const API_URL = "http://127.0.0.1:8000/api/articles";

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
    if (href && href.includes("/blogs/") && !href.includes("page")) {
      links.push(href.startsWith("http") ? href : BASE_URL + href);
    }
  });

  return [...new Set(links)].slice(0, 5);
}

async function scrapeArticle(url) {
  const res = await axios.get(url);
  const $ = cheerio.load(res.data);

  const title = $("h1").first().text().trim();
  const content = $("article").text().trim().slice(0, 8000);

  return {
    title,
    content,
    source_url: url,
    scraped_at: new Date().toISOString()
  };
}

async function saveArticle(article) {
  const res = await axios.post(API_URL, article);
  return res.data;
}

(async () => {
  try {
    const lastPage = await getLastPageUrl();
    const links = await getArticleLinks(lastPage);

    for (const link of links) {
      console.log(`Scraping: ${link}`);
      const article = await scrapeArticle(link);
      const saved = await saveArticle(article);
      console.log(`Saved article ID: ${saved.id}`);
    }

    console.log("Scraping completed.");
  } catch (err) {
    console.error("Error:", err.message);
  }
})();
