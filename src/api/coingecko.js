import axios from "axios";

const baseURL = "https://api.coingecko.com/api/v3";

const instance = axios.create({
  baseURL,
  timeout: 15000,
});

const KEY = import.meta.env.VITE_COINGECKO_API_KEY || import.meta.env.REACT_APP_COINGECKO_API_KEY;
if (KEY) {
  instance.defaults.headers.common["X-CoinGecko-Api-Key"] = KEY;
}

export default {
  getMarkets: (opts = {}) => {
    return instance.get("/coins/markets", {
      params: {
        vs_currency: opts.vs_currency || "usd",
        order: opts.order || "market_cap_desc",
        per_page: opts.per_page || 50,
        page: opts.page || 1,
        price_change_percentage: opts.price_change_percentage || "24h",
        sparkline: !!opts.sparkline,
        ids: opts.ids || undefined,
      },
    });
  },

  getTrending: () => instance.get("/search/trending"),

  search: (q) =>
    instance.get("/search", {
      params: { query: q },
    }),

  getCoin: (id) => instance.get(`/coins/${id}`, { params: { localization: false, tickers: false } }),
};
