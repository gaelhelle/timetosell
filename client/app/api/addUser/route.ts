import { saveTwitterHandle } from "@/utils/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const body = await req.json();
  const { handle, ranks } = body;

  try {
    await saveTwitterHandle(handle, ranks);

    return new Response("user added!");
  } catch (err) {
    return new Response("Impossible to add user");
  }
}
