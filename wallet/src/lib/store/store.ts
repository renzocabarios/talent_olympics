import { create } from "zustand";
import { createSelectors } from "./createSelectors";
import { IRouteStore, routeStore } from "./route";
import { accountStore, IAccountStore } from "./account";

type IStore = IRouteStore & IAccountStore;

export const useStoreBase = create<IStore>()((...state) => ({
  ...routeStore(...state),
  ...accountStore(...state),
}));

export const useStore = createSelectors(useStoreBase);
