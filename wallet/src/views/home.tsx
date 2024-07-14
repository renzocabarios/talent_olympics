import { useEffect, useMemo, useState } from "react";
import { useStore } from "@/lib/store/store";
import useGetFungibleTokens from "@/hooks/useGetFungibleTokens";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useGetBalance from "@/hooks/useGetBalance";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useSocket } from "@/components/socket-provider";
import BottomNav from "@/components/bottom-nav";

function formatUnits(value: string | number, decimals: string | number) {
  return Number(value) * 10 ** Number(decimals);
}

function truncateAddress(address: string) {
  return `${address.slice(0, 5)}...${address.slice(-5)}`;
}

export default function HomePage() {
  const [page, setpage] = useState(0);

  const { socket } = useSocket();

  const { setPyth, setChainlink } = useStore();

  useEffect(() => {
    if (!socket) return;

    socket.on("ChainlinkUpdate", (event) => {
      setChainlink(Number(event.price));
    });

    socket.on("PythUpdate", (event) => {
      setPyth(Number(event.price));
    });

    return () => {
      socket.off("ChainlinkUpdate");
      socket.off("PythUpdate");
    };
  }, [socket]);

  return (
    <>
      <BottomNav setpage={setpage} />
      {page === 0 && <Main />}
      {page === 1 && <SolPrice />}
    </>
  );
}

function SolPrice() {
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

function Main() {
  const {
    publicKey,
    setTokenPublicKey,
    setCurrent,
    setTokenName,
    setTokenImage,
    chainlink,
    pyth,
  } = useStore();

  const { data: balance } = useGetBalance();

  const { data, isLoading, isError } = useGetFungibleTokens({
    ownerAddress: publicKey,
  });

  const sol = useMemo(
    () =>
      ((formatUnits(pyth + chainlink, -8) / 2) * (balance ?? 0)) /
      LAMPORTS_PER_SOL,
    [chainlink, pyth]
  );

  const total = useMemo(
    () =>
      data.reduce((acc: any, curr: any) => {
        return acc + Number(curr.token_info?.price_info?.total_price ?? 0);
      }, 0) + sol,
    [data, isLoading, isError, sol]
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
                    {formatUnits(e.token_info.balance, -e.token_info.decimals)}{" "}
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
    </>
  );
}

function SolBalance() {
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
