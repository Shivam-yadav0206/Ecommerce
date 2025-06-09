// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import searchReducer from "./searchSlice";
import feedReducer from "./feedSlice"; // 🆕

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    search: searchReducer,
    feed: feedReducer, // 🆕
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
