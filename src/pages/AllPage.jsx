import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import Highlights from "../components/Highlights";
import CoinsTable from "../components/CoinsTable";
import { Link } from "react-router-dom";

export default function AllPage() {
  const [view, setView] = useState("all");
  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col items-left">
      <h1 className="font-sans text-[30px] font-bold mb-4">
  Cryptocurrency Prices by Market Cap
</h1>

<p className="text-lg">
  The global cryptocurrency market cap today is{" "}
  <span className="text-green-600 font-semibold">$4.14 Trillion</span>, a{" "}
  <span className="text-red-600 font-semibold inline-flex items-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 ml-1 text-red-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
    0.9%
    
  </span>{" "}
  change in the last 24 hours.{" "}
  <span className="text-gray-500 underline cursor-pointer hover:text-gray-700">
    <a href="https://www.coingecko.com/">Read more</a>
  </span>
</p>

      </div>
      <SearchBar />
      {view === "all" && (
        <>
          {/* <Highlights /> */}
          <CoinsTable />
        </>
      )}

      {view === "highlights" && (
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Highlights onlyHighlights />
        </div>
      )}
    </div>
  );
}
