import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { CONNECTION } from "@/lib/web3";
import { PublicKey } from "@solana/web3.js";

interface IGetTransactionsParams {
  account: string;
}
async function getTransactions(params: IGetTransactionsParams) {
  const transactions = await CONNECTION.getSignaturesForAddress(
    new PublicKey(params.account)
  );
  return transactions;
}

export default function useGetTransactions(params: IGetTransactionsParams) {
  const { data, isError, isPending } = useQuery({
    queryFn: () => getTransactions(params),
    queryKey: ["transaction"],
  });

  const parsed = useMemo(() => data ?? [], [data]);
  return { data: parsed, isError, isPending };
}
