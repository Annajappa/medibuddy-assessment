import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow text-center">
        <h1 className="text-2xl font-bold mb-2">404 — Page Not Found</h1>
        <p className="mb-4">The page you requested does not exist.</p>
        <Link to="/"><button className="px-4 py-2 bg-indigo-600 text-white rounded">Go Home</button></Link>
      </div>
    </div>
  );
}
