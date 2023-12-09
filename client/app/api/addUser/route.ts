import { saveTwitterHandle } from "@/utils/supabase";
import type { NextApiResponse } from "next";
import { NextRequest } from "next/server";

export async function POST(req: Request | NextRequest, res: NextApiResponse) {
  const body = await req.json();
  const { handle, ranks } = body;

  try {
    await saveTwitterHandle(handle, ranks);

    return new Response("user added!");
  } catch (err) {
    return new Response("Impossible to add user");
  }
}
