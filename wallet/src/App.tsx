import { useEffect } from "react";
import { useStore } from "./lib/store/store";
import CreateAccountPage from "./views/create-account";
import HomePage from "./views/home";
import ImportPage from "./views/import";
import LoginPage from "./views/login";
import StartPage from "./views/start";
import * as bip39 from "bip39";
import { Keypair } from "@solana/web3.js";
import SendPage from "./views/send";
import SendSPLPage from "./views/send-spl";
import SwapPage from "./views/swap";

function App() {
  const { current, setCurrent, setPublicKey } = useStore();

  useEffect(() => {
    const nemonic = localStorage.getItem("nemonic");
    if (nemonic) {
      const seed = bip39.mnemonicToSeedSync(nemonic, "");
      const keypair = Keypair.fromSeed(seed.subarray(0, 32));
      setPublicKey(keypair.publicKey.toString());
      setCurrent("home");
    }
  }, []);

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="relative p-4 border overflow-auto rounded-xl shadow-2xl  w-[360px] flex flex-col gap-4 h-[400px]">
        {current == "swap" && <SwapPage />}
        {current == "send" && <SendPage />}
        {current == "send-spl" && <SendSPLPage />}
        {current == "" && <StartPage />}
        {current == "import" && <ImportPage />}
        {current == "create" && <CreateAccountPage />}
        {current == "login" && <LoginPage />}
        {current == "home" && <HomePage />}
      </div>
    </div>
  );
}

export default App;
