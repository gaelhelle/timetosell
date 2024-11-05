import { NextRequest, NextResponse } from "next/server";
import { getAppRankingHistory } from "@/utils/supabase";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  let app = searchParams.get("app");

  if (!app) {
    return NextResponse.json({ error: "App parameter is required" }, { status: 400 });
  }

  if (app === "coinbase_ios") {
    app = "values";
  }

  const values = await getAppRankingHistory(app);

  return NextResponse.json({ values });
}
