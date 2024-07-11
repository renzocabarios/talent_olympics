import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { CreateAccountSchema } from "../lib/schemas/create_account.schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../lib/schemas/login.schema";

export default function LoginPage() {
  const form = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  function onSubmit(values: CreateAccountSchema) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <div className="flex flex-col gap-2">
        <p>Enter your password</p>

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

      <Button onClick={form.handleSubmit(onSubmit)} className="w-full">
        Unlock
      </Button>
    </Form>
  );
}
