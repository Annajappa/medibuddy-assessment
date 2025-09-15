import React from "react";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-gradient-to-br from-indigo-100 to-teal-100 flex items-center justify-center text-white font-bold">
            <img src="https://static.ambitionbox.com/assets/v2/images/rs:fit:1280:960:false:false/bG9jYWw6Ly8vbG9nb3Mvb3JpZ2luYWxzL2luZGlhbi1oZWFsdGgtb3JnYW5pc2F0aW9uLmpwZw.png" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Medibuddy Crypto Dashboard</h1>
            <p className="text-sm text-slate-500">Live market data from (CoinGecko)</p>
          </div>
        </div>
        <div className="text-sm text-slate-500">
          <a HREF="https://www.coingecko.com/"><p style={{color : "blue", fontSize : "20px"}}>coingecko-official</p></a>
        </div>
      </div>
    </header>
  );
}
