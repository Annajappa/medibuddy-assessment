import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrending } from "../features/coinsSlice";
import { ArrowUpRight, ArrowDownRight } from "lucide-react"; // icons

export default function Highlights({ onlyHighlights = false }) {
  const dispatch = useDispatch();
  const trending = useSelector((s) => s.coins.trending);
  const coins = useSelector((s) => s.coins.items);

  useEffect(() => {
    dispatch(fetchTrending());
  }, [dispatch]);

  const gainers = React.useMemo(() => {
    if (!coins || coins.length === 0) return [];
    return [...coins]
      .filter((c) => typeof c.price_change_percentage_24h === "number")
      .sort(
        (a, b) =>
          (b.price_change_percentage_24h ?? 0) -
          (a.price_change_percentage_24h ?? 0)
      )
      .slice(0, 5);
  }, [coins]);

  const losers = React.useMemo(() => {
    if (!coins || coins.length === 0) return [];
    return [...coins]
      .filter((c) => typeof c.price_change_percentage_24h === "number")
      .sort(
        (a, b) =>
          (a.price_change_percentage_24h ?? 0) -
          (b.price_change_percentage_24h ?? 0)
      )
      .slice(0, 5);
  }, [coins]);

  const highVolume = React.useMemo(() => {
    if (!coins || coins.length === 0) return [];
    return [...coins]
      .filter((c) => typeof c.total_volume === "number")
      .sort((a, b) => (b.total_volume ?? 0) - (a.total_volume ?? 0))
      .slice(0, 5);
  }, [coins]);

  const cardClass =
    "p-3 rounded shadow border-l-4 border-indigo-500 bg-gradient-to-r from-white to-slate-50";

  // render reusable table
  const renderTable = (items, label) => (
    <div className={cardClass}>
      <h3 className="text-sm font-medium mb-2">{label}</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500 text-xs">
            <th className="py-1">Coin</th>
            <th className="py-1">Price</th>
            <th className="py-1">24h</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 && (
            <tr>
              <td colSpan="3" className="text-slate-400 py-2">
                No data
              </td>
            </tr>
          )}
          {items.map((c) => {
            const isUp = (c.price_change_percentage_24h ?? 0) >= 0;
            return (
              <tr key={c.id} className="border-t">
                <td className="flex items-center gap-2 py-2">
                  <img src={c.image} alt={c.name} className="w-5 h-5 rounded" />
                  <span>{c.name}</span>
                </td>
                <td className="py-2">${Number(c.current_price).toLocaleString()}</td>
                <td
                  className={`flex items-center gap-1 py-2 ${
                    isUp ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {(c.price_change_percentage_24h ?? 0).toFixed(2)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  // trending separate because API shape differs
  const renderTrending = () => (
    <div className={cardClass}>
      <h3 className="text-sm font-medium mb-2">Trending</h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-slate-500 text-xs">
            <th className="py-1">Coin</th>
            <th className="py-1">Price</th>
            <th className="py-1">24h</th>
          </tr>
        </thead>
        <tbody>
          {trending.length === 0 && (
            <tr>
              <td colSpan="3" className="text-slate-400 py-2">
                No trending data
              </td>
            </tr>
          )}
          {trending.slice(0, 6).map((c) => {
  const isUp = (c.price_change_percentage_24h ?? 0) >= 0;
  return (
    <tr key={c.id} className="border-t">
      <td className="flex items-center gap-2 py-2">
        <img src={c.image} alt={c.name} className="w-5 h-5 rounded" />
        <span>{c.name}</span>
      </td>
      <td className="py-2">${Number(c.current_price).toLocaleString()}</td>
      <td
        className={`flex items-center gap-1 py-2 ${
          isUp ? "text-green-600" : "text-red-600"
        }`}
      >
        {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {(c.price_change_percentage_24h ?? 0).toFixed(2)}%
      </td>
    </tr>
  );
})}

        </tbody>
      </table>
    </div>
  );

  if (onlyHighlights) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {renderTrending()}
        {renderTable(gainers, "Top Gainers (24h)")}
        {renderTable(losers, "Top Losers (24h)")}
        {renderTable(highVolume, "Highest Volume")}
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-4">
      <h2 className="text-lg font-semibold mb-2">Highlights</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {renderTrending()}
        {renderTable(gainers, "Top Gainers (24h)")}
        {renderTable(losers, "Top Losers (24h)")}
        {renderTable(highVolume, "Highest Volume")}
        <div className="bg-white shadow rounded p-3 hidden md:block">
          <h3 className="text-sm font-medium mb-2">Extra</h3>
          <div className="text-sm text-slate-500">
            Other highlight ideas here
          </div>
        </div>
      </div>
    </section>
  );
}
