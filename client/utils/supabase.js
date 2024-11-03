import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function getAppRankingLatest() {
  try {
    const [table1, table2, table3, table4] = await Promise.all([supabase.from("values").select().order("created_at", { ascending: false }).limit(1), supabase.from("robinhood_ios").select().order("created_at", { ascending: false }).limit(1), supabase.from("shakepay_ios").select().order("created_at", { ascending: false }).limit(1), supabase.from("bithumb_ios").select().order("created_at", { ascending: false }).limit(1)]);

    if (table1.error || table2.error || table3.error || table4.error) {
      console.error({
        table1Error: table1.error,
        table2Error: table2.error,
        table3Error: table3.error,
        table4Error: table4.error,
      });
      return;
    }

    return {
      coinbase_ios: table1.data,
      robinhood_ios: table2.data,
      shakepay_ios: table3.data,
      bithumb_ios: table4.data,
    };
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
}

async function getRankValues() {
  let { data, error } = await supabase.from("values").select();

  if (error) {
    console.error(error);
    return;
  }

  return data;
}

async function saveTwitterHandle(handle, ranks) {
  console.log(handle);
  console.log(ranks);
  let { data, error } = await supabase.from("users").insert({
    handle: handle,
    ranks: ranks,
  });

  if (error) {
    console.error(error);
    return;
  }

  return data;
}

export { getRankValues, saveTwitterHandle, getAppRankingLatest };
