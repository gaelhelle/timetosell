//  @ts-nocheck
"use client";

import { formatTimestamp } from "@/utils/utils";
import { useEffect, useState } from "react";

export default function RankHistory() {
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    if (!process.env.NEXT_PUBLIC_API_URL) return;

    const res = await fetch(process.env.NEXT_PUBLIC_API_URL, { cache: "no-store" });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const results = await res.json();

    setItems(results.values.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {items?.map((item, index) => {
        const rankDiff = items[index + 1]?.rank - item?.rank;
        const valueDiff = rankDiff < 0 ? rankDiff : `+${rankDiff}`;

        return (
          <>
            <div className="border rounded-sm border-gray-300 shadow-sm p-4 flex items-center gap-4">
              <div>
                <span>#{item?.rank}</span>
                <span className={`ml-2 tracking-widest -mr-1 ${rankDiff < 0 ? "text-red-500" : "text-emerald-500"}`}>({valueDiff})</span>
              </div>
              <div>|</div>
              <div>{formatTimestamp(item?.created_at)}</div>
            </div>
          </>
        );
      })}
    </div>
  );
}
