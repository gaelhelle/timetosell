import { NextResponse } from "next/server";
import { getAppRankingLatest, getRankValues } from "@/utils/supabase";
import { getUniqueValuesPerDay } from "@/utils/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  const values = await getAppRankingLatest();

  return NextResponse.json({ values });
}
