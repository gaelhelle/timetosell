const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

const { addToDB } = require("./utils/supabase");
const { addTweet } = require("./utils/twitter");

require("dotenv").config();

const apps = {
  coinbase_ios: { id: "886427730", country: "US", table_name: "values" },
  robinhood_ios: { id: "938003185", country: "US", table_name: "robinhood_ios" },
  shakepay_ios: { id: "1244290088", country: "CA", table_name: "shakepay_ios" },
};

const handleFetchRank = async (res, user) => {
  for (const app of Object.values(apps)) {
    const url = `https://app.sensortower.com/api/ios/category/category_history?app_ids%5B%5D=${app.id}&categories%5B%5D=6015&categories%5B%5D=0&categories%5B%5D=36&chart_type_ids%5B%5D=topfreeipadapplications&chart_type_ids%5B%5D=topfreeapplications&chart_type_ids%5B%5D=toppaidapplications&countries%5B%5D=${app.country}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const identifier = data[app.id][app.country];

      const globalRank = identifier["36"]?.topfreeapplications.todays_rank;
      const financeRank = identifier["6015"]?.topfreeapplications.todays_rank;

      addToDB({ table: app.table_name, globalRank, financeRank });

      if (app === apps.coinbase_ios) {
        addTweet({ globalRank, financeRank });
      }
    } catch (error) {
      console.error(e);
    }
  }
};

handleFetchRank();

module.exports = { handleFetchRank };
