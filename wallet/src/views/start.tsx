import { useStore } from "@/lib/store/store";
import { Button } from "@/components/ui/button";

export default function StartPage() {
  const { setCurrent } = useStore();

  return (
    <>
      <p>Wallet Demo</p>
      <Button
        className="w-full"
        onClick={() => {
          setCurrent("import");
        }}
      >
        Import Wallet
      </Button>
      <Button
        className="w-full"
        onClick={() => {
          setCurrent("create");
        }}
      >
        Create Wallet
      </Button>
    </>
  );
}
