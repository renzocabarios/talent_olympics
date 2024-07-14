import "express-async-errors";
import ENV from "./app/env/index";
import app from "./app";
import { PYTH, CHAINLINK } from "./app/services";

(() => {
  CHAINLINK.intializeListener().then((e) => {});
  PYTH.intializeListener().then((e) => {});
  app.listen(ENV.PORT, () => {
    console.log(`Server started on port ${ENV.PORT}`);
  });
})();
