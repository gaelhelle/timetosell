const { TwitterApi } = require("twitter-api-v2");
require("dotenv").config();

const client = new TwitterApi({
  appKey: process.env.TWITTER_APP_KEY,
  appSecret: process.env.TWITTER_APP_SECRET,
  accessToken: process.env.TWITTER_ACCESS_KEY,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

const rwClient = client.readWrite;

async function addTweet(rank) {
  if (!rank) {
    console.error("Please provide a rank for the tweet");
    return;
  }

  let advice = `It's a great day to buy.`;

  if (rank == "1") {
    advice = `It's a great day to sell.`;
  }

  try {
    await rwClient.v2.tweet(`As of today, Coinbase App is ranking #${rank}.\n${advice}`);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  addTweet,
};
