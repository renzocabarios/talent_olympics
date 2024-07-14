import { useMemo } from "react";
import { useStore } from "@/lib/store/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useGetBalance from "@/hooks/useGetBalance";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { formatUnits } from "@/lib/utils";

export default function SolBalance() {
  const { data } = useGetBalance();
  const { setCurrent, chainlink, pyth } = useStore();

  const average = useMemo(
    () =>
      (
        ((formatUnits(pyth + chainlink, -8) / 2) * (data ?? 0)) /
        LAMPORTS_PER_SOL
      ).toFixed(4),
    [chainlink, pyth]
  );
  return (
    <div
      onClick={() => {
        setCurrent("send");
      }}
      className="p-2 rounded-xl text-white flex justify-between "
    >
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={"https://github.com/shadcn.png"} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p>SOLANA</p>

          <p className="text-xs">{(data ?? 0) / LAMPORTS_PER_SOL} SOL</p>
        </div>
      </div>
      <div className="">
        <p>${average}</p>
      </div>
    </div>
  );
}
