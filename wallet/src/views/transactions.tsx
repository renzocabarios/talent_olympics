import { useStore } from "@/lib/store/store";
import { formatUnits, truncateAddress } from "@/lib/utils";
import useGetStats from "@/hooks/useGetStats";
import useGetTransactions from "@/hooks/useGetTransactions";

export default function Transactions() {
  const { data } = useGetStats();

  const { publicKey } = useStore();
  const { data: transactions } = useGetTransactions({ account: publicKey });

  return (
    <>
      <div className="flex flex-col items-center gap-7 justify-center">
        {/* <p className="text-xs">SOL market price</p>
        <p className="text-4xl font-bold">${average}</p> */}

        <div className="w-full grid grid-cols-2 gap-4">
          <div className="col-span-2 flex flex-col gap-2 items-center">
            <p className="text-xs font-bold">Total Transactions</p>
            <p className="text-xs">{data?.totalSupply ?? 0}</p>
          </div>
          <div className="flex flex-col gap-2 items-center">
            <p className="text-xs font-bold">Total Supply</p>
            <p className="text-xs">
              {formatUnits(data?.totalSupply ?? 0, -9).toFixed(1)} SOL
            </p>
          </div>

          <div className="flex flex-col gap-2 items-center">
            <p className="text-xs font-bold">Current Epoch</p>
            <p className="text-xs">{data.epoch ?? 0}</p>
          </div>
        </div>

        {/* <p>{JSON.stringify(transactions)}</p> */}

        <p>My Transactions</p>

        {transactions?.map((e) => {
          return (
            <div className="w-full flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-xs">{truncateAddress(e.signature)}</p>

                <p className=" text-xs text-gray-500">
                  {new Date(Number(e.blockTime) * 1000).toLocaleDateString()}{" "}
                  {new Date(Number(e.blockTime) * 1000).toLocaleTimeString()}
                </p>
              </div>
              <div className="flex flex-col  items-end gap-1">
                <p className="text-xs text-gray-500">
                  <span className="text-white">{e.slot}</span> Slot
                </p>
                <p className="text-xs text-gray-500">
                  <span className="text-white"> {e.blockTime}</span> Blocktime
                </p>
              </div>
            </div>
          );
        })}

        {/* <div className="w-full flex items-center justify-between">
          <p>Pyth</p>
          <p>${formatUnits(pyth, -8).toFixed(4)}</p>
        </div>

        <div className="w-full flex items-center justify-between">
          <p>Chainlink</p>
          <p>${formatUnits(chainlink, -8).toFixed(4)}</p>
        </div> */}
      </div>
    </>
  );
}
