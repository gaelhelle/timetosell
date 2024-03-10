const { TwitterApi } = require("twitter-api-v2");
require("dotenv").config();

const client = new TwitterApi({
  appKey: process.env.TWITTER_APP_KEY,
  appSecret: process.env.TWITTER_APP_SECRET,
  accessToken: process.env.TWITTER_ACCESS_KEY,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

const rwClient = client.readWrite;

async function addTweet({ globalRank, financeRank }) {
  if (!globalRank || !financeRank) {
    console.error("Please provide a rank for the tweet");
    return;
  }

  let advice = `It's a great day to buy.`;

  if (financeRank == "1") {
    advice = `Be careful now, high volatility expected. BTD.`;
  }

  try {
    if (globalRank == "1") {
      await rwClient.v2.tweet(`We did it guys. SELL THE F** OUT NOOOOOW. See you in 3 years.`);
    } else {
      await rwClient.v2.tweet(`As of today, Coinbase $COIN App is ranking:\nFinance: #${financeRank}\nAll Apps: #${globalRank}\n\n${advice}`);
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  addTweet,
};
