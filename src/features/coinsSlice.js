import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/coingecko";

export const fetchCoins = createAsyncThunk(
  "coins/fetchCoins",
  async ({ page = 1, per_page = 50 } = {}, { rejectWithValue }) => {
    try {
      const res = await api.getMarkets({ page, per_page });
      return { data: res.data, page };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Modified fetchTrending
export const fetchTrending = createAsyncThunk(
  "coins/fetchTrending",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.getTrending();
      // Normalize response so UI has usable fields
      const formatted = res.data.coins.map((c) => {
        const coin = c.item;
        return {
          id: coin.id,
          name: coin.name,
          symbol: coin.symbol,
          image: coin.large,
          price_btc: coin.price_btc ?? 0,
          market_cap_rank: coin.market_cap_rank ?? null,
          score: coin.score ?? null,
        };
      });
      return formatted;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchCoinDetail = createAsyncThunk(
  "coins/fetchCoinDetail",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.getCoin(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const coinsSlice = createSlice({
  name: "coins",
  initialState: {
    items: [],
    page: 0,
    per_page: 50,
    hasMore: true,
    status: "idle",
    error: null,
    trending: [],
    details: {},
    query: "",
    sortBy: null,
    sortDir: "desc",
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setSort(state, action) {
      const { sortBy } = action.payload;
      if (state.sortBy === sortBy) {
        state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
      } else {
        state.sortBy = sortBy;
        state.sortDir = "desc";
      }
    },
    reset(state) {
      state.items = [];
      state.page = 0;
      state.hasMore = true;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { data, page } = action.payload;
        const existingIds = new Set(state.items.map((c) => c.id));
        const newOnes = data.filter((c) => !existingIds.has(c.id));
        state.items = [...state.items, ...newOnes];
        state.page = page;
        state.hasMore = data.length === state.per_page;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      // ✅ Updated to work with formatted trending
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.trending = action.payload;
      })
      .addCase(fetchCoinDetail.fulfilled, (state, action) => {
        state.details[action.payload.id] = action.payload;
      });
  },
});

export const { setQuery, setSort, reset } = coinsSlice.actions;
export default coinsSlice.reducer;
