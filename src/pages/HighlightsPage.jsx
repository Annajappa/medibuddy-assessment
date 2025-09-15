import React from "react";
import Highlights from "../components/Highlights";
import { Link } from "react-router-dom";

export default function HighlightsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between border-b">
        <h2 className="text-xl font-bold text-slate-800">Highlights</h2>
        <Link to="/" className="text-sm font-medium text-indigo-600 hover:underline">
          ← Back to All
        </Link>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Highlights onlyHighlights />
      </div>
    </div>
  );
}
