import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoins, setSort } from "../features/coinsSlice";
import CoinRow from "./CoinRow";
import LoadingSkeleton from "./LoadingSkeleton";
import CoinDetailModal from "./CoinDetailModal";

export default function CoinsTable() {
  const dispatch = useDispatch();
  const { items, page, per_page, hasMore, status, error, sortBy, sortDir } =
    useSelector((s) => s.coins);

  const [selected, setSelected] = useState(null);
  useEffect(() => {
    if (status === "idle") dispatch(fetchCoins({ page: 1 }));
  }, [status, dispatch]);

  const loadMore = () => {
    if (status !== "loading")
      dispatch(fetchCoins({ page: page + 1, per_page }));
  };

  const observerRef = useRef(null);
  const bottomRef = useCallback(
    (node) => {
      if (status === "loading") return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [status, hasMore, page]
  );

  const sortedItems = React.useMemo(() => {
    if (!sortBy) return items;
    const arr = [...items];
    arr.sort((a, b) => {
      let av = a[sortBy] ?? 0;
      let bv = b[sortBy] ?? 0;
      if (sortBy === "price_change_percentage_24h") {
        av = a.price_change_percentage_24h ?? 0;
        bv = b.price_change_percentage_24h ?? 0;
      }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [items, sortBy, sortDir]);

  // Helper for arrows
  const renderArrow = (col) => {
    if (sortBy !== col) return null;
    return sortDir === "asc" ? (
      <span className="ml-1">↓</span>
    ) : (
      <span className="ml-1">↑</span>
    );
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-8"> {/* outer padding */}
      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full table-fixed border-collapse text-left">
          <thead className="bg-slate-50">
  <tr>
    <th className="py-3 px-4"></th> {/* Star column header */}
    <th className="text-left py-3 px-2">Rank</th>
    <th className="text-left py-3 px-4 w-56">Coin</th>
    <th
      className="text-left py-3 px-4 cursor-pointer"
      onClick={() => dispatch(setSort({ sortBy: "current_price" }))}
    >
      Price {renderArrow("current_price")}
    </th>
    <th
      className="text-left py-3 px-4 cursor-pointer"
      onClick={() =>
        dispatch(setSort({ sortBy: "price_change_percentage_24h" }))
      }
    >
      24h {renderArrow("price_change_percentage_24h")}
    </th>
    <th
      className="text-left py-3 px-4 cursor-pointer"
      onClick={() => dispatch(setSort({ sortBy: "market_cap" }))}
    >
      Market Cap {renderArrow("market_cap")}
    </th>
    <th
      className="text-left py-3 px-4 cursor-pointer"
      onClick={() => dispatch(setSort({ sortBy: "total_volume" }))}
    >
      24h Volume {renderArrow("total_volume")}
    </th>
  </tr>
</thead>

          {/* tbody: render CoinRow directly (CoinRow should return a <tr> with <td>s) */}
          {/* add divide-y to ensure visible light horizontal lines between rows */}
          <tbody className="bg-white divide-y divide-slate-200">
            {sortedItems.map((c, idx) => (
              <CoinRow
                key={c.id}
                serial={idx + 1}
                coin={c}
                onClick={() => setSelected(c.id)}
              />
            ))}
          </tbody>
        </table>

        {status === "loading" && <LoadingSkeleton rows={4} />}

        {error && (
          <div className="p-4 text-center text-red-600">
            <div>Error: {error}</div>
            <button
              className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded"
              onClick={() => dispatch(fetchCoins({ page: page || 1 }))}
            >
              Retry
            </button>
          </div>
        )}

        <div className="p-4 text-center">
          {hasMore ? (
            <div ref={bottomRef} className="text-sm text-slate-500">
              Scroll to load more...
            </div>
          ) : (
            <div className="text-sm text-slate-400">No more coins</div>
          )}
        </div>
      </div>

      {selected && (
        <CoinDetailModal id={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
