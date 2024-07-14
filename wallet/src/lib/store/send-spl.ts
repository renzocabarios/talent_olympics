import { StateCreator } from "zustand";

interface IState {
  tokenPublicKey: string;
  tokenName: string;
  tokenImage: string;
}

const initialState = {
  tokenPublicKey: "",
  tokenName: "",
  tokenImage: "",
};

interface IActions {
  setTokenPublicKey: (value: string) => void;
  setTokenName: (value: string) => void;
  setTokenImage: (value: string) => void;
}

export type ISplTokenStore = IState & IActions;

export const splTokenStore: StateCreator<ISplTokenStore> = (set) => ({
  setTokenPublicKey: (value) => set(() => ({ tokenPublicKey: value })),
  setTokenName: (value) => set(() => ({ tokenName: value })),
  setTokenImage: (value) => set(() => ({ tokenImage: value })),
  ...initialState,
});
