import { CONNECTION, getKeypairFromNemomnic } from "@/lib/web3";
import {
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
} from "@solana/web3.js";
import { useMutation } from "@tanstack/react-query";
import {
  getOrCreateAssociatedTokenAccount,
  createTransferInstruction,
} from "@solana/spl-token";
import { useEffect } from "react";

interface ISendSplToken {
  toAddress: string;
  mintAddress: string;
  amount: number;
}

async function sendSplToken({ toAddress, mintAddress, amount }: ISendSplToken) {
  const nemonic = localStorage.getItem("nemonic");

  if (nemonic) {
    const from = getKeypairFromNemomnic(nemonic);

    const sourceAccount = await getOrCreateAssociatedTokenAccount(
      CONNECTION,
      from,
      new PublicKey(mintAddress),
      from.publicKey
    );

    const destinationAccount = await getOrCreateAssociatedTokenAccount(
      CONNECTION,
      from,
      new PublicKey(mintAddress),
      new PublicKey(toAddress)
    );

    const tx = new Transaction();

    tx.add(
      createTransferInstruction(
        sourceAccount.address,
        destinationAccount.address,
        from.publicKey,
        amount
      )
    );

    const latestBlockHash = await CONNECTION.getLatestBlockhash("confirmed");
    tx.recentBlockhash = await latestBlockHash.blockhash;
    return await sendAndConfirmTransaction(CONNECTION, tx, [from]);
  }

  return null;
}

export default function useSendSplToken() {
  const { data, mutate, isError, isPending, isSuccess, error } = useMutation({
    mutationFn: (value: ISendSplToken) => sendSplToken(value),
  });

  useEffect(() => {
    console.log(error);
  }, [isError, error]);

  return { mutate, data, isError, isPending, isSuccess };
}
