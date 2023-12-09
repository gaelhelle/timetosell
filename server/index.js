const puppeteer = require("puppeteer");
const { getRank } = require("./utils/utils");
const { addToDB } = require("./utils/supabase");
require("dotenv").config();

const url = "https://apps.apple.com/us/app/coinbase-buy-bitcoin-ether/id886427730";

const testPuppeteer = async (res, user) => {
  let logStatement = "";

  const browser = await puppeteer.launch({
    args: ["--disable-setuid-sandbox", "--no-sandbox", "--single-process", "--no-zygote"],
    executablePath: process.env.NODE_ENV === "production" ? process.env.PUPPETEER_EXECUTABLE_PATH : puppeteer.executablePath(),
  });
  try {
    const page = await browser.newPage();

    await page.goto(url);

    await page.setViewport({ width: 1080, height: 1024 });

    // Locate the full title with a unique string
    const textSelector = await page.waitForSelector(`[href="https://apps.apple.com/us/charts/iphone/finance-apps/6015"]`);
    const textValue = await textSelector.evaluate((el) => el.textContent);

    addToDB(getRank(textValue));
  } catch (e) {
    console.error(e);
  } finally {
    await browser.close();
  }
};

testPuppeteer();

module.exports = { testPuppeteer };
