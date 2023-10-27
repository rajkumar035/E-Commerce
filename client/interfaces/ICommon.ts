interface IReactNode {
  children: React.ReactNode;
}

interface IHookFormValidation {
  [key: string]: string;
}

interface ICountState {
  access_token: string | null;
  userid: string | null;
}

interface IAppContext {
  initialState: ICountState | null;
  dispatchAction?: (data: ICountState) => void;
}

export type { IReactNode, IHookFormValidation, ICountState, IAppContext };
