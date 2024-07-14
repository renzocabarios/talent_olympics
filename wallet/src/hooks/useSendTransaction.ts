import { CONNECTION, getKeypairFromNemomnic } from "@/lib/web3";
import { sendAndConfirmTransaction, Transaction } from "@solana/web3.js";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

async function sendTransaction(transaction: Transaction) {
  const nemonic = localStorage.getItem("nemonic");

  if (nemonic) {
    const from = getKeypairFromNemomnic(nemonic);
    return await sendAndConfirmTransaction(CONNECTION, transaction, [from]);
  }

  return null;
}

export default function useSendTransaction() {
  const { data, mutate, isError, isPending, isSuccess, error } = useMutation({
    mutationFn: (transaction: Transaction) => sendTransaction(transaction),
  });

  useEffect(() => {
    console.log(error);
  }, [isError]);

  return { mutate, data, isError, isPending, isSuccess };
}
