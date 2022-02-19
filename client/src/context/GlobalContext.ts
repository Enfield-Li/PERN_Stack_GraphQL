import { createContext } from "react";
import { initialState } from "../types/GlobalTypes";

export const GlobalContext = createContext<{
  state: typeof initialState;
}>({ state: initialState });
