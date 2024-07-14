import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import useSendSplToken from "@/hooks/useSendSplToken";
import { ChevronLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SendSPLPage() {
  const { mutate, isSuccess, isPending } = useSendSplToken();

  const { setCurrent, tokenPublicKey, tokenName, tokenImage } = useStore();

  const form = useForm<SendSolSchema>({
    resolver: zodResolver(SendSolSchema),
  });

  function onSubmit(values: SendSolSchema) {
    mutate({
      toAddress: values.address,
      mintAddress: tokenPublicKey,
      amount: values.amount,
    });
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

      <div className="flex items-center gap-4 justify-center">
        <Avatar>
          <AvatarImage src={tokenImage} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-xl font-bold">Send {tokenName}</p>
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
