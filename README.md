# Medibuddy Crypto Dashboard

This project is a **React + Tailwind CSS + Redux** application that displays cryptocurrency data in a table with highlights.

## Features

1. Table with Serial Number
   - A new **Serial Number (No)** column has been added to the coins table.

2. All / Highlights Toggle (on `/` route)
   - **All** → Displays both Highlights and the full Coins Table.
   - **Highlights** → Displays only the Highlights section.

3. Pages & Routing
   - **`/` (All Page)** → Contains All + Highlights toggle.
   - **`/highlights` (Highlights Page)** → Shows only the Highlights data.
   - **`*` (Any other path)** → Displays a **404 — Page Not Found** screen.

4. Highlights Section
   - **Trending** (from API).
   - **Top Gainers (24h)** (styled in green).
   - **Top Losers (24h)** (styled in red).
   - **Highest Volume** (sorted by trading volume).
   - All highlight sections are styled differently to stand out.

5. State Management
   - **Redux Toolkit** is used for fetching and storing cryptocurrency data and trending highlights.

## Tech Stack
- React
- Redux Toolkit
- Tailwind CSS
- React Router DOM

## How to Run

1. Install dependencies:
   ```
   npm install
   ```

2. Start development server:
   ```
   npm start
   ```

3. Open the app on the shown dev server URL (usually http://localhost:5173)

## Routes

- `/` → All Page (with toggle between All & Highlights)
- `/highlights` → Highlights Page
- `*` → Page Not Found

