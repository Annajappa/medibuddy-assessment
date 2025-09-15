import React, { useState } from "react";
import Header from "./components/Header";
import { Routes, Route, Link } from "react-router-dom";
import AllPage from "./pages/AllPage";
import HighlightsPage from "./pages/HighlightsPage";
import NotFound from "./pages/NotFound";

export default function App() {
  const [view, setView] = useState("all");
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <nav className="max-w-6xl mx-auto px-4 py-3 flex gap-3">
        <Link to="/"
            onClick={() => setView("all")}
            className={`px-3 py-1 border-gray-600 rounded ${view==="all" ? "bg-indigo-600 text-white" : "bg-white border"}`}
          >
            All
          </Link>
          <Link to="/highlights"
            onClick={() => setView("highlights")}
            className={`px-3 py-1 border-gray-600 rounded ${view==="highlights" ? "bg-indigo-600 text-white" : "bg-white border"}`}
          >
            Highlights
          </Link>
      </nav>
      <main className="py-6">
        <Routes>
          <Route path="/" element={<AllPage />} />
          <Route path="/highlights" element={<HighlightsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
