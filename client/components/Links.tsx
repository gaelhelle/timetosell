import { useState } from "react";
import RankHistory from "./RankHistory";

export default function Links() {
  const [sidebarOpen, setSidebarOpen] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    1: true,
    5: false,
    10: false,
  });

  const handleCheckboxChange = (event: any) => {
    const { id, checked } = event.target;
    setCheckedItems({
      ...checkedItems,
      [id]: checked,
    });
  };

  const closeMenu = () => {
    setSidebarOpen("");
  };

  const handleSubmitForm = async () => {
    console.log("submit");

    setDisabledButton(true);

    const postData = async () => {
      const data = {
        handle: twitterHandle,
        ranks: checkedItems,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/addUser`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.json();
    };

    await postData();
  };

  const handleInputChange = (event: any) => {
    setTwitterHandle(event.target.value);
  };

  const titleMenu = sidebarOpen == "notify" ? "Notify me on twitter" : "Rank History";

  return (
    <>
      <div>
        <div className="max-w-[700px] mx-auto text-center mb-16">
          <p className="text-sm">
            Our system uses AI high-end tech “CAR” market detection, direct identifier <b>Coinbase AppStore Ranking</b>, to detect when is a good time to sell your crypto bag.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          <button className="flex items-center gap-2 group transition duration-500" onClick={() => setSidebarOpen("notify")}>
            <span className="group-hover:text-white ">Notify me when to sell</span>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="relative w-6 h-6 group-hover:translate-x-1 group-hover:text-white transition-all">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </span>
          </button>
          <button className="flex items-center gap-2 group transition duration-500" onClick={() => setSidebarOpen("history")}>
            <span className="group-hover:text-white ">Rank history</span>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="relative w-6 h-6 group-hover:translate-x-1 group-hover:text-white transition-all">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </span>
          </button>
          <a href="https://twitter.com/timetosell_bot" className="flex items-center gap-2 group transition duration-500">
            <span className="group-hover:text-white ">Twitter bot</span>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="relative w-6 h-6 group-hover:translate-x-1 group-hover:text-white transition-all">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      {sidebarOpen && (
        <div>
          <div className="fixed top-0 bottom-0 right-0 w-3/4 lg:w-[700px] bg-white z-30 p-8 lg:p-20">
            <div className="flex flex-col h-screen overflow-y-auto p-8 lg:pb-24">
              <span onClick={closeMenu} className="absolute top-10 right-10 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
              <div className="text-black mt-20">
                <h3 className="text-3xl mb-2">{titleMenu}</h3>

                {sidebarOpen == "notify" ? (
                  <div>
                    <p className="text-slate-400 font-light">Our robot will ping you on twitter</p>
                    <form className="my-10" onSubmit={handleSubmitForm}>
                      <div className="mb-4">
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          Twitter handle
                        </label>
                        <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required value={twitterHandle} onChange={handleInputChange} />
                      </div>
                      <div className="mb-4">
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          When rank is
                        </label>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center">
                            <input id="1" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={checkedItems[1]} onChange={handleCheckboxChange} />
                            <label htmlFor="1" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                              1
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input id="5" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={checkedItems[5]} onChange={handleCheckboxChange} />
                            <label htmlFor="5" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                              5
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input id="10" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={checkedItems[10]} onChange={handleCheckboxChange} />
                            <label htmlFor="10" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                              10
                            </label>
                          </div>
                        </div>
                      </div>
                      <button disabled={disabledButton} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Submit
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="mt-10">
                    <RankHistory />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="fixed top-0 bottom-0 left-0 right-0 h-screen backdrop-blur z-20 bg-[#03031c99]" onClick={closeMenu} />
        </div>
      )}
    </>
  );
}
