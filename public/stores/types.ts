export interface IState {

}
export type ContextType = {
  store: IState;
  setStore: (name: string, e: any) => void;
};
