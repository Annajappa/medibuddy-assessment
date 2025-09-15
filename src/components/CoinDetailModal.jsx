import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoinDetail } from "../features/coinsSlice";

export default function CoinDetailModal({ id, onClose }) {
  const dispatch = useDispatch();
  const detail = useSelector((s) => s.coins.details[id]);

  useEffect(() => {
    if (!detail) dispatch(fetchCoinDetail(id));
  }, [id, detail, dispatch]);

  if (!id) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-start justify-center z-40 p-6">
      <div className="bg-white rounded shadow max-w-2xl w-full p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{detail?.name || id}</h3>
          <button className="text-slate-500" onClick={onClose}>Close</button>
        </div>
        <div className="mt-3">
          {!detail ? (
            <div className="text-sm text-slate-500">Loading...</div>
          ) : (
            <>
              <div className="text-sm text-slate-600 mb-2" dangerouslySetInnerHTML={{ __html: (detail?.description?.en || "").slice(0, 500) }} />
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <div className="text-xs text-slate-500">Current Price</div>
                  <div className="font-medium">${detail?.market_data?.current_price?.usd}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Market Cap</div>
                  <div className="font-medium">${detail?.market_data?.market_cap?.usd?.toLocaleString()}</div>
                </div>
              </div>
              <div className="mt-4 text-sm">
                <a className="text-indigo-600" href={detail?.links?.homepage?.[0] || "#"} target="_blank" rel="noreferrer">Official site</a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
