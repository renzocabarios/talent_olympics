import { generateAccess } from "../../../utils/index";
import { Request, Response } from "express";
import { HELIUS } from "../../../services";

const getFungibleTokens = async (_req: Request, _res: Response) => {
  const { page = 1, limit = 10, ownerAddress = "" } = _req.query;

  const data = await HELIUS.getFungibleTokensByOwner({
    ownerAddress: ownerAddress as string,
  });

  const parsed = (data.data.result.items ?? []).map((e: any) => {
    return {
      id: e.id,
      content: e.content,
      token_info: e.token_info,
    };
  });

  _res.send({
    data: parsed,
    status: "success",
    message: "Get fungible tokens success",
    meta: {
      access: generateAccess({}),
      page,
      limit,
    },
  });
};

export { getFungibleTokens };
