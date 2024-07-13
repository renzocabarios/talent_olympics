import { StateCreator } from "zustand";

interface IState {
  tokenPublicKey: string;
}

const initialState = {
  tokenPublicKey: "",
};

interface IActions {
  setTokenPublicKey: (value: string) => void;
}

export type ISplTokenStore = IState & IActions;

export const splTokenStore: StateCreator<ISplTokenStore> = (set) => ({
  setTokenPublicKey: (value) => set(() => ({ tokenPublicKey: value })),
  ...initialState,
});
