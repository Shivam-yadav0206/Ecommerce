import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Address {
  _id: number;
  type: string;
  name: string;
  address: string;
  phone: string;
  pincode: string;
  isDefault: boolean;
}

interface UserDetails {
  _id: string | null;
  name: string;
  email: string;
  googleId: string | null;
  avatar: string | null;
  role: string | null;
  age: number | string | null;
  gender: string | null;
  addresses : Address[]
  // Add address or other fields if needed
}

interface UserState {
  isAuthenticated: boolean;
  user: UserDetails | null;
}

const initialState: UserState = {
  isAuthenticated: false,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserDetails>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },    
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
