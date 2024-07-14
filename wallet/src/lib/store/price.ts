import { StateCreator } from "zustand";

interface IState {
  pyth: number;
  chainlink: number;
}

const initialState = {
  pyth: 0,
  chainlink: 0,
};

interface IActions {
  setPyth: (value: number) => void;
  setChainlink: (value: number) => void;
}

export type IPriceStore = IState & IActions;

export const priceStore: StateCreator<IPriceStore> = (set) => ({
  setPyth: (value) => set(() => ({ pyth: value })),
  setChainlink: (value) => set(() => ({ chainlink: value })),
  ...initialState,
});
