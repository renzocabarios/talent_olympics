import { StateCreator } from "zustand";

interface IState {
  current: string;
}

const initialState = {
  current: "",
};

interface IActions {
  setCurrent: (value: string) => void;
}

export type IRouteStore = IState & IActions;

export const routeStore: StateCreator<IRouteStore> = (set) => ({
  setCurrent: (value) => set(() => ({ current: value })),
  ...initialState,
});
