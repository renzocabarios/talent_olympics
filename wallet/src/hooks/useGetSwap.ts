import { API_INSTANCE } from "@/lib/http";
import { CONNECTION, getKeypairFromNemomnic } from "@/lib/web3";
import {
  AddressLookupTableAccount,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { useMutation } from "@tanstack/react-query";
interface IGetQuoteParams {
  outputMint: string;
  inputMint: string;
  amount: string | number;
  userPublicKey: string;
}

async function getSwap(params: IGetQuoteParams) {
  const data = await API_INSTANCE.get("api/v1/wallet/swap", { params });
  try {
    const nemonic = localStorage.getItem("nemonic");

    if (nemonic) {
      const from = getKeypairFromNemomnic(nemonic);

      const {
        swapTransaction,
        lastValidBlockHeight,
        // prioritizationFeeLamports,
      } = data.data.data[0];

      const swapTransactionBuf = Buffer.from(swapTransaction, "base64");
      const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
      console.log(transaction.message.addressTableLookups);

      const addressLookupTableAccounts = await Promise.all(
        transaction.message.addressTableLookups.map(async (lookup) => {
          return new AddressLookupTableAccount({
            key: lookup.accountKey,
            state: AddressLookupTableAccount.deserialize(
              //@ts-ignore
              await CONNECTION.getAccountInfo(lookup.accountKey).then(
                (res: any) => res.data
              )
            ),
          });
        })
      );

      const message = TransactionMessage.decompile(transaction.message, {
        addressLookupTableAccounts: addressLookupTableAccounts,
      });

      message.payerKey = from.publicKey;

      transaction.message = message.compileToV0Message(
        addressLookupTableAccounts
      );
      transaction.sign([from]);

      const rawTransaction = transaction.serialize();

      const txid = await CONNECTION.sendRawTransaction(rawTransaction, {
        skipPreflight: true,
        maxRetries: 2,
      });
      console.log(txid);

      const confirmation = await CONNECTION.confirmTransaction(
        { signature: txid, blockhash: txid, lastValidBlockHeight },
        "confirmed"
      );

      console.log(confirmation);
    }
  } catch (e: any) {
    console.log(e.toString());
  }

  return 0;
}

export default function useGetSwap() {
  const { data, isError, isPending, mutate, isSuccess } = useMutation({
    mutationFn: (params: IGetQuoteParams) => getSwap(params),
  });

  return { mutate, data, isError, isPending, isSuccess };
}
