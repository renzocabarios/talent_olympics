import { create } from "zustand";
import { createSelectors } from "./createSelectors";
import { IRouteStore, routeStore } from "./route";
import { accountStore, IAccountStore } from "./account";
import { ISplTokenStore, splTokenStore } from "./send-spl";

type IStore = IRouteStore & IAccountStore & ISplTokenStore;

export const useStoreBase = create<IStore>()((...state) => ({
  ...routeStore(...state),
  ...accountStore(...state),
  ...splTokenStore(...state),
}));

export const useStore = createSelectors(useStoreBase);
