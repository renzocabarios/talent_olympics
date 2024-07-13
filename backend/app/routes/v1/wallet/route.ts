import { Router } from "express";
import { getFungibleTokens, getQuote, getSwap } from "./controller";

const router = Router();
router.route("/quote").get(getQuote);
router.route("/swap").get(getSwap);
router.route("/fungible-tokens").get(getFungibleTokens);

export default router;
