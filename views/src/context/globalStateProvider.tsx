import React, { createContext, FC, useReducer } from "react";
import {
  Actions,
  GlobalContextType,
  GlobalStateProviderProps,
  GlobalStateType,
} from "../types/Props";

export const initialState = {
  userState: {
    id: "",
    name: "",
    isAuth: false,
  },
};

export const GlobalContext = createContext<GlobalContextType>({
  state: initialState,
  dispatch: () => null,
});

const GlobalReducer = (state: GlobalStateType, action: Actions) => {
  switch (action.type) {
    case "setUserState":
      return {
        ...state,
        userState: { ...state.userState, ...action.payload },
      };
    default:
      return state;
  }
};

const GlobalStateProvider: FC<GlobalStateProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalStateProvider;
