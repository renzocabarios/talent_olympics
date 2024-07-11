import { useEffect, useState } from "react";
import * as bip39 from "bip39";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { CreateAccountSchema } from "../lib/schemas/create_account.schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "@/lib/store/store";

export default function CreateAccountPage() {
  const [nemonic, setnemonic] = useState("");

  const { setCurrent } = useStore();

  useEffect(() => {
    setnemonic(bip39.generateMnemonic());
  }, []);

  const form = useForm<CreateAccountSchema>({
    resolver: zodResolver(CreateAccountSchema),
  });

  function onSubmit(values: CreateAccountSchema) {
    localStorage.setItem("password", values.password);
    localStorage.setItem("nemonic", nemonic);
    setCurrent("home");
  }

  return (
    <Form {...form}>
      <CreatePassword />
      <p>Secret Recovery Phrase</p>
      <p>{nemonic}</p>

      <Button onClick={form.handleSubmit(onSubmit)} className="w-full">
        Create Account
      </Button>
    </Form>
  );
}

function CreatePassword() {
  const form = useFormContext();
  return (
    <>
      <Form {...form}>
        <div className="flex flex-col gap-2">
          <p>Create a password</p>

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Form>
    </>
  );
}
