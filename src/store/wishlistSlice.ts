import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  _id: string;
  name: string | null;
  rating: { average: number; count: number } | null;
  specs: Record<string, string> | null;
  price: number | null;
  stock: number | null;
  imageUrls?: string[] | null;
}

interface WishlistState {
  items: Product[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Used after login to initialize placeholder products
    setWishlistFromIds(state, action: PayloadAction<string[]>) {
      state.items = action.payload.map((id) => ({
        _id: id,
        name: null,
        rating: null,
        specs: null,
        price: null,
        stock: null,
        imageUrls: null,
      }));
    },

    // Replace a placeholder with real product data
    setWishlistCache(state, action: PayloadAction<Product[]>) {
      state.items = action.payload
    },

    addToWishlist(state, action: PayloadAction<Product>) {
      const exists = state.items.some(
        (item) => item._id === action.payload._id
      );
      if (!exists) {
        state.items.push(action.payload);
      }
    },

    removeFromWishlist(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },

    clearWishlist(state) {
      state.items = [];
    },
  },
});

export const {
  setWishlistFromIds,
  setWishlistCache,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
