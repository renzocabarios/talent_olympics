import { API_INSTANCE } from "@/lib/http";
import { CONNECTION, getKeypairFromNemomnic } from "@/lib/web3";
import {
  AddressLookupTableAccount,
  ComputeBudgetProgram,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { useMutation } from "@tanstack/react-query";
interface IGetQuoteParams {
  outputMint: string;
  inputMint: string;
  amount: string | number;
  userPublicKey?: string;
}

async function getSwap(params: IGetQuoteParams) {
  try {
    const nemonic = localStorage.getItem("nemonic");

    if (nemonic) {
      const from = getKeypairFromNemomnic(nemonic);
      const data = await API_INSTANCE.get("api/v1/wallet/swap", {
        params: { ...params, userPublicKey: from.publicKey.toString() },
      });

      const { swapTransaction, lastValidBlockHeight } = data.data.data[0];

      const swapTransactionBuf = Buffer.from(swapTransaction, "base64");

      const transaction = VersionedTransaction.deserialize(swapTransactionBuf);

      transaction.sign([from]);
      const rawTransaction = transaction.serialize();
      const txid = await CONNECTION.sendRawTransaction(rawTransaction, {
        skipPreflight: true,
        maxRetries: 2,
      });
      console.log(txid);
      const { blockhash } = await CONNECTION.getLatestBlockhash();
      await CONNECTION.confirmTransaction(
        { signature: txid, blockhash, lastValidBlockHeight },
        "confirmed"
      );
      console.log(`https://solscan.io/tx/${txid}`);
    }
  } catch (e: any) {
    alert(e.toString());
  }

  return 0;
}

export default function useGetSwap() {
  const { data, isError, isPending, mutate, isSuccess } = useMutation({
    mutationFn: (params: IGetQuoteParams) => getSwap(params),
  });

  return { mutate, data, isError, isPending, isSuccess };
}
