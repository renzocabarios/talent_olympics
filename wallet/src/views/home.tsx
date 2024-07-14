import { useEffect, useState } from "react";
import { useStore } from "@/lib/store/store";
import { useSocket } from "@/components/socket-provider";
import BottomNav from "@/components/bottom-nav";
import Main from "./main";
import SolPrice from "./sol-price";
import Transactions from "./transactions";

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
      {page === 2 && <Transactions />}
    </>
  );
}
