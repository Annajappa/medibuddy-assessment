import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function CoinRow({ coin, onClick, serial }) {
  const [isStarred, setIsStarred] = useState(false);
  const change = coin.price_change_percentage_24h;
  const changeAbs = coin.price_change_24h;

  return (
    <tr
      onClick={() => onClick(coin)}
      className="cursor-pointer hover:bg-slate-50"
    >
      {/* ⭐ Star column */}
      <td className="py-3 px-2">
        <FaStar
          size={18}
          className={`cursor-pointer ${
            isStarred ? "text-green-500" : "text-gray-400"
          }`}
          onClick={(e) => {
            e.stopPropagation(); // prevent row click
            setIsStarred(!isStarred);
          }}
        />
      </td>

      {/* Serial number column */}
      <td className="py-3 px-2">{serial}</td>

      {/* Coin column (bigger + aligned left) */}
      <td className="py-3 px-2 text-left">
        <div className="flex items-center gap-2">
          <img src={coin.image} alt={coin.name} className="w-6 h-6" />
          <div className="text-sm">
            <div className="font-medium">{coin.name}</div>
            <div className="text-xs text-slate-500 uppercase">
              {coin.symbol}
            </div>
          </div>
        </div>
      </td>

      {/* Price */}
      <td className="py-3 px-2">
        ${coin.current_price?.toLocaleString()}
      </td>

      {/* 24h Change with colored arrow */}
      <td className="py-3 px-2">
        <div
          className={`flex items-center gap-1 ${
            change >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {change >= 0 ? "↑" : "↓"} {change?.toFixed(2)}%
        </div>
        <div className="text-xs text-slate-400">
          {changeAbs ? `$${changeAbs.toFixed(2)}` : ""}
        </div>
      </td>

      {/* Market Cap */}
      <td className="py-3 px-2">
        ${coin.market_cap?.toLocaleString()}
      </td>

      {/* 24h Volume */}
      <td className="py-3 px-2">
        ${coin.total_volume?.toLocaleString()}
      </td>
    </tr>
  );
}
