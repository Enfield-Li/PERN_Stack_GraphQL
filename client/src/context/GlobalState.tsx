import { useState } from "react";
import { globalAction, initialState } from "../types/GlobalTypes";
import { GlobalContext } from "./GlobalContext";

interface GlobalContextProps {
  children: React.ReactNode;
}

export const GlobalProvider: React.FC<GlobalContextProps> = ({ children }) => {
  const [laughState, setLaughState] = useState(false);
  const [likeState, setLikeState] = useState(false);
  const [confusedState, setConfusedState] = useState(false);

  return (
    <GlobalContext.Provider
      // @ts-ignore
      value={{
        state: {
          laughState,
          likeState,
          confusedState,
          setLaughState,
          setConfusedState,
          setLikeState,
        },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
