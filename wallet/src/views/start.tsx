import { useStore } from "@/lib/store/store";
import { Button } from "@/components/ui/button";

export default function StartPage() {
  const { setCurrent } = useStore();

  return (
    <div className="flex flex-col h-full justify-center gap-10">
      <div className="flex items-center justify-center">
        <p className="text-4xl font-bold">Wallet Demo</p>
      </div>

      <div className="flex flex-col gap-2">
        <Button
          size={"lg"}
          className="w-full p-2 text-xl text-white sticky bottom-0 right-0"
          onClick={() => {
            setCurrent("import");
          }}
        >
          Import Wallet
        </Button>

        <Button
          size={"lg"}
          className="w-full p-2 text-xl text-white sticky bottom-0 right-0"
          onClick={() => {
            setCurrent("create");
          }}
        >
          Create Wallet
        </Button>
      </div>
    </div>
  );
}
