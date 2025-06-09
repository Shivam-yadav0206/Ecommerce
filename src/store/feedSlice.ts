// store/feedSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/api/axios";

// store/feedSlice.ts
interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrls?: string[]; // For internal use or API
  imageSrc: string;     // For UI consumption
  description: string;
  category: string;
}


interface FeedState {
  offers: Product[];
  smartPhones: Product[];
  notebooks: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: FeedState = {
  offers: [],
  smartPhones: [],
  notebooks: [],
  loading: false,
  error: null,
};

// Async thunk to fetch feed data
export const fetchFeed = createAsyncThunk("feed/fetchFeed", async () => {
  const response = await axiosInstance.get("/feed");
  return response.data;
});

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchFeed.fulfilled,
        (state, action: PayloadAction<FeedState>) => {
          state.loading = false;
          state.offers = action.payload.offers;
          state.smartPhones = action.payload.smartPhones;
          state.notebooks = action.payload.notebooks;
        }
      )
      .addCase(fetchFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load feed";
      });
  },
});

export default feedSlice.reducer;
