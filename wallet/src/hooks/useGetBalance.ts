import { CONNECTION, getKeypairFromNemomnic } from "@/lib/web3";
import { useQuery } from "@tanstack/react-query";

async function getBalance() {
  const nemonic = localStorage.getItem("nemonic");

  if (nemonic) {
    const from = getKeypairFromNemomnic(nemonic);

    console.log(await CONNECTION.getBalance(from.publicKey));

    return await CONNECTION.getBalance(from.publicKey);
  }

  return 0;
}

export default function useGetBalance() {
  const { data, isError, isPending } = useQuery({
    queryFn: () => getBalance(),
    queryKey: [],
  });

  return { data, isError, isPending };
}
