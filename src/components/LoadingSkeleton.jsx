import React from "react";

export default function LoadingSkeleton({ rows = 6 }) {
  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="space-y-2">
        {[...Array(rows)].map((_, i) => (
          <div key={i} className="bg-white p-3 rounded shadow animate-pulse">
            <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-slate-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
