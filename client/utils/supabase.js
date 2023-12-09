import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

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

export { getRankValues, saveTwitterHandle };
