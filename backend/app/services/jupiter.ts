import axios from "axios";

const JUPITER = axios.create({
  baseURL: "https://quote-api.jup.ag/v6/",
});

interface IGetQuoteParams {
  outputMint: string;
  inputMint: string;
  amount: string;
}

export async function getQuote(params: IGetQuoteParams) {
  return await JUPITER.get("quote", { params });
}

interface ISwapBody {
  userPublicKey: string;
  quoteResponse: any;
}

export async function swap(body: ISwapBody) {
  return await JUPITER.post("swap", body);
}

export default { getQuote, swap };
