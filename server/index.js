const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

const { addToDB } = require("./utils/supabase");
const { addTweet } = require("./utils/twitter");

require("dotenv").config();

const url = "https://app.sensortower.com/api/ios/category/category_history?app_ids%5B%5D=886427730&categories%5B%5D=6015&categories%5B%5D=0&categories%5B%5D=36&chart_type_ids%5B%5D=topfreeipadapplications&chart_type_ids%5B%5D=topfreeapplications&chart_type_ids%5B%5D=toppaidapplications&countries%5B%5D=US";

const handleFetchRank = async (res, user) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    const globalRank = data["886427730"]["US"]["36"].topfreeapplications.todays_rank;
    const financeRank = data["886427730"]["US"]["6015"].topfreeapplications.todays_rank;

    if (globalRank && financeRank) {
      addToDB({ globalRank, financeRank });
      addTweet({ globalRank, financeRank });
    } else {
      console.log("Error getting the ranks");
    }
  } catch (e) {
    console.error(e);
  } finally {
  }
};

handleFetchRank();

module.exports = { handleFetchRank };
