import { formatTimestamp } from "@/utils/utils";

async function getData() {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();
  const latestValue = data.values.sort((a, b) => b.id - a.id)[0];

  return (
    <div className="">
      <div className="py-10">
        <h1 className="text-center text-8xl font-bold from-[#00DAB0] to-[#00FF3A] bg-gradient-to-r text-transparent bg-clip-text [text-shadow:_0_0_50px_rgb(78_245_87_/_20%)] xl:text-[8vw]">NO</h1>
        <div className="mt-10 text-center">
          <p className="text-sm">
            Current Coinbase AppStore Rank: <span className="font-bold from-[#00DAB0] to-[#00FF3A] bg-gradient-to-r text-transparent bg-clip-text">#{latestValue.rank}</span>
            <span className="inline-block align-middle">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-[#50fa49] relative -top-0.5 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
              </svg>
            </span>
          </p>
          <p className="text-sm">Updated on: {formatTimestamp(latestValue.created_at)}</p>
        </div>
      </div>
    </div>
  );
}
