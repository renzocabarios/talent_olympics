import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { CONNECTION } from "@/lib/web3";

async function getStats() {
  const totalSupply = (await CONNECTION.getSupply()).value.total;
  const epoch = (await CONNECTION.getEpochInfo()).epoch;
  const transactions = await CONNECTION.getTransactionCount();

  return { totalSupply, epoch, transactions };
}

export default function useGetStats() {
  const { data, isError, isPending } = useQuery({
    queryFn: () => getStats(),
    queryKey: ["supply"],
  });

  const parsed = useMemo(
    () => data ?? { totalSupply: 0, epoch: 0, transactions: 0 },
    [data]
  );
  return { data: parsed, isError, isPending };
}
