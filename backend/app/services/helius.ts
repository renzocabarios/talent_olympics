import axios from "axios";
import ENV from "../env";

const HELIUS_URL = axios.create({
  baseURL: ENV.HELIUS_RPC,
});

interface IGetAssetsByOwnerParams {
  ownerAddress: string;
  page?: number; // Starts at 1
  limit?: number;
}

export async function getAssetsByOwner({
  ownerAddress,
  page = 1,
  limit = 5,
}: IGetAssetsByOwnerParams) {
  return await HELIUS_URL.post("", {
    jsonrpc: "2.0",
    id: "my-id",
    method: "getAssetsByOwner",
    params: {
      ownerAddress,
      page,
      limit,
      displayOptions: {
        showFungible: true, //return both fungible and non-fungible tokens
      },
    },
  });
}

export async function getFungibleTokensByOwner({
  ownerAddress,
  page = 1,
  limit = 5,
}: IGetAssetsByOwnerParams) {
  return await HELIUS_URL.post("", {
    jsonrpc: "2.0",
    id: "my-id",
    method: "searchAssets",
    params: {
      ownerAddress,
      page, // Starts at 1
      limit,
      tokenType: "fungible",
      displayOptions: {
        showNativeBalance: true,
      },
    },
  });
}

export default { getAssetsByOwner, getFungibleTokensByOwner };
