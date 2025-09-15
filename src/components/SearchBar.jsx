import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setQuery, reset, fetchCoins } from "../features/coinsSlice";
import useDebounce from "../hooks/useDebounce"; // <-- use your custom hook

export default function SearchBar() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  // Debounced value (waits 450ms after typing stops)
  const debouncedInput = useDebounce(input, 450);

  useEffect(() => {
    if (debouncedInput.trim() !== "") {
      dispatch(reset());
      dispatch(setQuery(debouncedInput));
      dispatch(fetchCoins({ page: 1 }));
    }
  }, [debouncedInput, dispatch]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-4">
      <input
        className="w-full md:w-1/2 border rounded px-3 py-2 shadow-sm"
        placeholder="Search by coin name or symbol (debounced)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}
