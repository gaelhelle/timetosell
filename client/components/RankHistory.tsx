"use client";

import { formatTimestamp } from "@/utils/utils";
import { useEffect, useState } from "react";

export default function RankHistory() {
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    if (!process.env.NEXT_PUBLIC_API_URL) return;

    const res = await fetch(process.env.NEXT_PUBLIC_API_URL, { next: { revalidate: 3600 } });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const results = await res.json();

    setItems(results.values.sort((a: any, b: any) => a.rank - b.rank));
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(items);

  return (
    <div className="flex flex-col gap-4">
      {items?.map((item) => (
        <>
          <div className="border rounded-sm border-gray-300 shadow-sm p-4 flex items-center gap-4">
            {/* @ts-ignore */}
            <div>#{item?.rank}</div>
            <div>|</div> {/* @ts-ignore */}
            <div>{formatTimestamp(item?.created_at)}</div>
          </div>
        </>
      ))}
    </div>
  );
}
