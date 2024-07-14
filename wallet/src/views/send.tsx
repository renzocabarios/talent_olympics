import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PublicKey } from "@solana/web3.js";
import { getKeypairFromNemomnic, transferSolTransaction } from "@/lib/web3";
import useSendTransaction from "@/hooks/useSendTransaction";
import { SendSolSchema } from "@/lib/schemas/send_sol.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useEffect } from "react";
import { useStore } from "@/lib/store/store";
import { ChevronLeft } from "lucide-react";

export default function SendPage() {
  const { mutate, isSuccess, isPending } = useSendTransaction();

  const { setCurrent } = useStore();

  const form = useForm<SendSolSchema>({
    resolver: zodResolver(SendSolSchema),
  });

  function onSubmit(values: SendSolSchema) {
    const nemonic = localStorage.getItem("nemonic");
    if (nemonic) {
      const from = getKeypairFromNemomnic(nemonic);
      const transaction = transferSolTransaction({
        fromPubkey: from.publicKey,
        toPubkey: new PublicKey(values.address),
        lamports: values.amount,
      });
      mutate(transaction);
    }
  }

  useEffect(() => {
    if (isSuccess) {
      setCurrent("home");
    }
  }, [isSuccess]);

  if (isPending) {
    return (
      <>
        <p>Loading</p>
      </>
    );
  }

  return (
    <Form {...form}>
      <ChevronLeft
        onClick={() => {
          setCurrent("home");
        }}
      ></ChevronLeft>

      <div className="flex items-center justify-center">
        <p className="text-xl font-bold">Send SOL</p>
      </div>

      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="address" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="relative w-full">
        <p className="top-2 right-2 absolute">SOL</p>
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="amount" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <Button
        size={"lg"}
        className="w-full p-2 text-xl text-white sticky bottom-0 right-0"
        onClick={form.handleSubmit(onSubmit)}
      >
        Send Now!
      </Button>
    </Form>
  );
}
