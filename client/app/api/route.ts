import { NextResponse } from "next/server";
import { getRankValues } from "@/utils/supabase";
import { getUniqueValuesPerDay } from "@/utils/utils";

export const dynamic = "force-dynamic";

export async function GET() {
  const values = await getRankValues();
  const uniqueValues = getUniqueValuesPerDay(values);

  return NextResponse.json({ values: uniqueValues });
}
