import { Button } from "../components/ui/button";
import { useMemo } from "react";
import { useStore } from "@/lib/store/store";
import useGetFungibleTokens from "@/hooks/useGetFungibleTokens";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useGetBalance from "@/hooks/useGetBalance";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

function formatUnits(value: string | number, decimals: string | number) {
  return Number(value) * 10 ** -Number(decimals);
}

function truncateAddress(address: string) {
  return `${address.slice(0, 5)}...${address.slice(-5)}`;
}

export default function HomePage() {
  const {
    publicKey,
    setTokenPublicKey,
    setCurrent,
    setTokenName,
    setTokenImage,
  } = useStore();
  const { data, isLoading, isError } = useGetFungibleTokens({
    ownerAddress: publicKey,
  });

  const total = useMemo(
    () =>
      data.reduce((acc: any, curr: any) => {
        return acc + Number(curr.token_info?.price_info?.total_price ?? 0);
      }, 0),
    [data, isLoading, isError]
  );

  if (isLoading || isError) {
    return <></>;
  }

  return (
    <>
      <div className="flex flex-col items-center gap-2 justify-center">
        <p
          className="text-xs"
          onClick={() => {
            navigator.clipboard.writeText(publicKey);
          }}
        >
          {truncateAddress(publicKey)}
        </p>
        <p className="text-4xl font-bold">${total.toFixed(2)}</p>

        <div className="flex items-center gap-2"></div>
      </div>

      <div className="flex flex-col gap-1">
        <SolBalance />
        {data.map((e: any) => {
          return (
            <div
              key={e.id}
              onClick={() => {
                setTokenPublicKey(e.id);

                setTokenName(e.content.metadata.name);
                setTokenImage(
                  e.content?.links?.image ?? "https://github.com/shadcn.png"
                );
                setCurrent("send-spl");
              }}
              className="p-2 rounded-xl flex justify-between text-white"
            >
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src={
                      e.content?.links?.image ?? "https://github.com/shadcn.png"
                    }
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p>{e.content.metadata.name}</p>
                  <p className="text-xs">
                    {formatUnits(e.token_info.balance, e.token_info.decimals)}{" "}
                    {e.content.metadata.symbol}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <p>
                  $
                  {Number(e.token_info?.price_info?.total_price ?? 0).toFixed(
                    2
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <Button
        size={"lg"}
        className="w-full p-2 text-xl text-white sticky bottom-0 right-0"
        onClick={() => {
          setCurrent("swap");
        }}
      >
        Swap
      </Button>
    </>
  );
}

function SolBalance() {
  const { data } = useGetBalance();
  const { setCurrent } = useStore();
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
    </div>
  );
}
