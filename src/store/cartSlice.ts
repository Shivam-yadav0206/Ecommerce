import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductDetails {
  _id: string;
  name: string | null;
  rating: { average: number; count: number } | null;
  specs: Record<string, string> | null;
  price: number | null;
  stock: number | null;
  imageUrls?: string[] | null;
}

interface CartItem {
  productId: string;
  quantity: number;
  details: ProductDetails | null;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 1️⃣ During login: Set cart with only productId and quantity
    setCart(
      state,
      action: PayloadAction<{ productId: string; quantity: number }[]>
    ) {
      state.items = action.payload.map(({ productId, quantity }) => ({
        productId,
        quantity,
        details: null,
      }));
    },

    // 2️⃣ After API call: Update cart item with full product details
    updateCartItemDetails(state, action: PayloadAction<ProductDetails>) {
      const index = state.items.findIndex(
        (item) => item.productId === action.payload._id
      );
      if (index !== -1) {
        state.items[index].details = action.payload;
      }
    },

    // 3️⃣ Add new item (can include details optionally)
    addItem(
      state,
      action: PayloadAction<{
        productId: string;
        quantity: number;
        details?: ProductDetails;
      }>
    ) {
      const index = state.items.findIndex(
        (item) => item.productId === action.payload.productId
      );
      if (index !== -1) {
        state.items[index].quantity += action.payload.quantity;
      } else {
        state.items.push({
          productId: action.payload.productId,
          quantity: action.payload.quantity,
          details: action.payload.details ?? null,
        });
      }
    },

    // 4️⃣ Remove item by productId
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
    },

    // 5️⃣ Clear entire cart
    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  setCart,
  addItem,
  updateCartItemDetails,
  removeItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
