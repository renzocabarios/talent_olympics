import walletRoute from "./wallet/route";
import { IRoutes, IRoute } from "../../types";

const routes: IRoutes = [
  {
    url: "wallet",
    route: walletRoute,
  },
];

export default routes.map((e: IRoute) => {
  e.url = `v1/${e.url}`;
  return e;
});
