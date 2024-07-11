import { useEffect } from "react";
import { useStore } from "./lib/store/store";
import CreateAccountPage from "./views/create-account";
import HomePage from "./views/home";
import ImportPage from "./views/import";
import LoginPage from "./views/login";
import StartPage from "./views/start";
import * as bip39 from "bip39";
import { Keypair } from "@solana/web3.js";

// TODOs
// Create Wallet
// Create See Assets

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
    <div className="w-[360px] flex flex-col gap-4">
      {current == "" && <StartPage />}
      {current == "import" && <ImportPage />}
      {current == "create" && <CreateAccountPage />}
      {current == "login" && <LoginPage />}
      {current == "home" && <HomePage />}
    </div>
  );
}

export default App;
