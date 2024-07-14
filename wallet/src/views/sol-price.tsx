import { useMemo } from "react";
import { useStore } from "@/lib/store/store";
import { formatUnits } from "@/lib/utils";

export default function SolPrice() {
  const { chainlink, pyth } = useStore();

  const average = useMemo(
    () => (formatUnits(chainlink + pyth, -8) / 2).toFixed(4),
    [chainlink, pyth]
  );

  return (
    <>
      <div className="flex flex-col items-center gap-2 justify-center">
        <p className="text-xs">SOL market price</p>
        <p className="text-4xl font-bold">${average}</p>

        <div className="w-full flex items-center justify-between">
          <p>Pyth</p>
          <p>${formatUnits(pyth, -8).toFixed(4)}</p>
        </div>

        <div className="w-full flex items-center justify-between">
          <p>Chainlink</p>
          <p>${formatUnits(chainlink, -8).toFixed(4)}</p>
        </div>
      </div>
    </>
  );
}
