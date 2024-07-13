import { generateAccess } from "../../../utils/index";
import { Request, Response } from "express";
import { HELIUS, JUPITER } from "../../../services";

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

const getQuote = async (_req: Request, _res: Response) => {
  const { inputMint = 1, outputMint = 10, amount = "" } = _req.query;

  const data = await JUPITER.getQuote({
    inputMint: inputMint as string,
    outputMint: outputMint as string,
    amount: inputMint as string,
  });

  const parsed = data?.data;

  _res.send({
    data: parsed,
    status: "success",
    message: "Get fungible tokens success",
    meta: {
      access: generateAccess({}),
    },
  });
};

const getSwap = async (_req: Request, _res: Response) => {
  const {
    inputMint = 1,
    outputMint = 10,
    amount = "",
    userPublicKey = "",
  } = _req.query;

  const quote = await JUPITER.getQuote({
    inputMint: inputMint as string,
    outputMint: outputMint as string,
    amount: amount as string,
  });

  const swap = await JUPITER.swap({
    quoteResponse: quote?.data as any,
    userPublicKey: userPublicKey as string,
  });

  console.log(swap.data);

  _res.send({
    data: [{ ...swap?.data }],
    status: "success",
    message: "Get fungible tokens success",
    meta: {
      access: generateAccess({}),
    },
  });
};

export { getFungibleTokens, getQuote, getSwap };
