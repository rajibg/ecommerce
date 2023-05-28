export interface LayoutType {
  children: React.ReactNode;
}

export interface userState {
  id: string;
  name: string;
  isAuth: boolean;
}
export type GlobalStateType = {
  userState: userState;
};

export type ActionsMap = {
  setUserState: { [key: string]: string | boolean };
};

export type Actions = {
  [Key in keyof ActionsMap]: {
    type: Key;
    payload: ActionsMap[Key];
  };
}[keyof ActionsMap];

export type Dispatcher = <
  Type extends Actions["type"],
  Payload extends ActionsMap[Type]
>(
  type: Type,
  ...payload: Payload extends undefined ? [undefined?] : [Payload]
) => void;

export type GlobalContextType = {
  state: GlobalStateType;
  dispatch: React.Dispatch<any>;
};

export interface GlobalStateProviderProps {
  children: React.ReactNode;
}
