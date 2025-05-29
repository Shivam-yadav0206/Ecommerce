"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux"; // ✅ correct import
import { store } from "../store/store"; // adjust path if needed

interface ReduxProviderProps {
  children: ReactNode;
}

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
