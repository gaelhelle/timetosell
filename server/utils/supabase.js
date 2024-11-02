const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function addToDB({ table, globalRank, financeRank }) {
  const { data, error } = await supabase.from(table).insert({
    globalRank: globalRank,
    rank: financeRank,
  });

  if (error) {
    console.error(error);
    return;
  }

  console.log(`Added to DB: ${table} (${globalRank} - ${financeRank})!`);
}

module.exports = {
  addToDB,
};
