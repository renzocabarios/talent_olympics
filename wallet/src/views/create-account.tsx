import { useEffect, useState } from "react";
import * as bip39 from "bip39";
import { Button } from "../components/ui/button";
import { useStore } from "@/lib/store/store";
import { ChevronLeft } from "lucide-react";
import { Keypair } from "@solana/web3.js";

export default function CreateAccountPage() {
  const [nemonic, setnemonic] = useState("");

  const { setCurrent, setPublicKey } = useStore();

  useEffect(() => {
    setnemonic(bip39.generateMnemonic());
  }, []);

  function onSubmit() {
    localStorage.setItem("nemonic", nemonic);

    if (nemonic) {
      const seed = bip39.mnemonicToSeedSync(nemonic, "");
      const keypair = Keypair.fromSeed(seed.subarray(0, 32));
      setPublicKey(keypair.publicKey.toString());
      setCurrent("home");
    }
    setCurrent("home");
  }
  // 0.019985
  return (
    <>
      <ChevronLeft
        onClick={() => {
          setCurrent("");
        }}
      ></ChevronLeft>

      <div className="flex items-center justify-center">
        <p className="text-xl font-bold">Create Account</p>
      </div>

      <div className="flex flex-col gap-2">
        <p>Secret Recovery Phrase</p>
        <p className="bg-gray-900 rounded-xl p-4">{nemonic}</p>
      </div>
      <Button
        size={"lg"}
        className="w-full p-2 text-xl text-white sticky bottom-0 right-0"
        onClick={onSubmit}
      >
        Create Account
      </Button>
    </>
  );
}
