"use client";

import Home from "@/components/Home";
import bg from "../assets/bg.jpg";
import { useState } from "react";
import Links from "@/components/Links";

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleMenu = () => {
    setSidebarOpen((state) => !state);
  };

  return (
    <div>
      <main
        className="flex min-h-screen flex-col items-center justify-between p-24 bg-black bg-cover text-[#ACACAC]"
        style={{
          backgroundImage: `url(${bg.src})`,
        }}
      >
        <div className="text-center">
          <h2 className="text-white text-3xl font-bold">Is it time to sell?</h2>
        </div>

        <Home />

        <Links />
      </main>
    </div>
  );
}
