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

export default function SendSPLPage() {
  const { mutate, isSuccess, isPending } = useSendSplToken();

  const { setCurrent, tokenPublicKey } = useStore();

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
      <p>Send SPL TOKEN {tokenPublicKey}</p>
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

      <Button onClick={form.handleSubmit(onSubmit)} className="w-full">
        Send
      </Button>
    </Form>
  );
}
