import bg from "../assets/bg.jpg";
import { formatTimestamp } from "@/utils/utils";

async function getData() {
  const res = await fetch("http://localhost:3000/api", { next: { revalidate: 2 } });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();
  const latestValue = data.values.sort((a, b) => b.id - a.id)[0];

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-between p-24 bg-black bg-cover text-[#ACACAC]"
      style={{
        backgroundImage: `url(${bg.src})`,
      }}
    >
      <div className="">
        <h2 className="text-white text-3xl font-bold">Is it time to sell?</h2>
      </div>

      <div className="py-10">
        <h1 className="text-center text-8xl font-bold from-[#00DAB0] to-[#00FF3A] bg-gradient-to-r text-transparent bg-clip-text [text-shadow:_0_0_50px_rgb(78_245_87_/_20%)] xl:text-[8vw]">NO</h1>
        <div className="mt-10 text-center">
          <p className="text-sm">
            Current Coinbase AppStore Rank: <span className="font-bold from-[#00DAB0] to-[#00FF3A] bg-gradient-to-r text-transparent bg-clip-text">#{latestValue.rank}</span>
            <span className="inline-block align-middle">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 text-[#50fa49] relative -top-0.5 ml-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
              </svg>
            </span>
          </p>
          <p className="text-sm">Updated on: {formatTimestamp(latestValue.created_at)}</p>
        </div>
      </div>

      <div>
        <div className="max-w-[700px] mx-auto text-center mb-16">
          <p className="text-sm">
            Our system uses AI high-end tech “CAR” market detection, direct identifier <b>Coinbase AppStore Ranking</b>, to detect when is a good time to buy or sell your crypto bag.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          <button className="flex items-center gap-2 group transition duration-500">
            <span className="group-hover:text-white ">Notify me when to sell</span>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="relative w-6 h-6 group-hover:translate-x-1 group-hover:text-white transition-all">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </span>
          </button>
          <button className="flex items-center gap-2 group transition duration-500">
            <span className="group-hover:text-white ">Rank history</span>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="relative w-6 h-6 group-hover:translate-x-1 group-hover:text-white transition-all">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </span>
          </button>
          <a href="./api" className="flex items-center gap-2 group transition duration-500">
            <span className="group-hover:text-white ">Our API</span>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="relative w-6 h-6 group-hover:translate-x-1 group-hover:text-white transition-all">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </main>
  );
}
