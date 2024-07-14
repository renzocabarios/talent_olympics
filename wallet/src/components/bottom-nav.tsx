import { useStore } from "@/lib/store/store";
import { Button } from "../components/ui/button";
import { House, Activity, BarChart, ArrowRightLeft } from "lucide-react";

export default function BottomNav({ setpage }: any) {
  const { setCurrent } = useStore();
  return (
    <div className="grid grid-cols-4 gap-2 sticky bottom-0 right-0">
      <Button
        size={"lg"}
        className="w-full p-2 text-xl text-white "
        onClick={() => {
          setpage(0);
        }}
      >
        <House />
      </Button>
      <Button
        size={"lg"}
        className="flex items-center justify-center gap-2 w-full p-2 text-xl text-white sticky bottom-0 right-0"
        onClick={() => {
          setCurrent("swap");
        }}
      >
        <ArrowRightLeft />
      </Button>
      <Button
        size={"lg"}
        className="w-full p-2 text-xl text-white"
        onClick={() => {
          setpage(1);
        }}
      >
        <BarChart />
      </Button>

      <Button
        size={"lg"}
        className="w-full p-2 text-xl text-white"
        onClick={() => {
          setpage(2);
        }}
      >
        <Activity />
      </Button>
    </div>
  );
}
