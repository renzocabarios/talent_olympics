import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect } from "react";
import { useStore } from "@/lib/store/store";
import useGetSwap from "@/hooks/useGetSwap";
import { SwapSchema } from "@/lib/schemas/swap.schema";
import { ArrowDown, Check, ChevronLeft, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const tokens = [
  { label: "SOL", value: "So11111111111111111111111111111111111111112" },
  { label: "USDC", value: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" },
  { label: "USDT", value: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB" },
  { label: "PYSUD", value: "2b1kV6DkPAnxd5ixfnxCpjxmKwqjjaYmCZfHsFu24GXo" },
] as const;

export default function SwapPage() {
  const { mutate, isPending, isSuccess } = useGetSwap();
  const { setCurrent } = useStore();

  const form = useForm<SwapSchema>({
    resolver: zodResolver(SwapSchema),
  });

  function onSubmit(values: SwapSchema) {
    mutate({
      inputMint: values.inputMint,
      outputMint: values.outputMint,
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

      <div className="flex items-center justify-center">
        <p className="text-xl font-bold">Swap Tokens</p>
      </div>

      <FormField
        control={form.control}
        name="inputMint"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? tokens.find(
                          (language) => language.value === field.value
                        )?.label
                      : "Select Token"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className=" p-0">
                <Command>
                  <CommandInput placeholder="Search tokens..." />
                  <CommandEmpty>No tokens found.</CommandEmpty>
                  <CommandGroup>
                    {tokens.map((language) => (
                      <CommandItem
                        value={language.label}
                        key={language.value}
                        onSelect={() => {
                          form.setValue("inputMint", language.value);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            language.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {language.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="relative w-full">
        <p className="top-3 right-2 absolute text-xs">
          {tokens.find((e) => e.value == form.watch("inputMint"))?.label ?? ""}
        </p>
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

      <div className="w-full flex items-center justify-center">
        <ArrowDown size={15} />
      </div>

      <FormField
        control={form.control}
        name="outputMint"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "w-full justify-between",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value
                      ? tokens.find(
                          (language) => language.value === field.value
                        )?.label
                      : "Select Token"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className=" p-0">
                <Command>
                  <CommandInput placeholder="Search tokens..." />
                  <CommandEmpty>No tokens found.</CommandEmpty>
                  <CommandGroup>
                    {tokens.map((language) => (
                      <CommandItem
                        value={language.label}
                        key={language.value}
                        onSelect={() => {
                          form.setValue("outputMint", language.value);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            language.value === field.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {language.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button
        size={"lg"}
        className="w-full p-2 text-xl text-white sticky bottom-0 right-0"
        onClick={form.handleSubmit(onSubmit)}
      >
        Swap Now!
      </Button>
    </Form>
  );
}
