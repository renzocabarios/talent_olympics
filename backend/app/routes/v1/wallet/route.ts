import { Router } from "express";
import { getFungibleTokens } from "./controller";

const router = Router();
router.route("/fungible-tokens").get(getFungibleTokens);

export default router;
