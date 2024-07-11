import { StateCreator } from "zustand";

interface IState {
  publicKey: string;
}

const initialState = {
  publicKey: "",
};

interface IActions {
  setPublicKey: (value: string) => void;
}

export type IAccountStore = IState & IActions;

export const accountStore: StateCreator<IAccountStore> = (set) => ({
  setPublicKey: (value) => set(() => ({ publicKey: value })),
  ...initialState,
});
