import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../components/ui/form";
import { useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImportSchema } from "../lib/schemas/import.schema";
import { useStore } from "@/lib/store/store";
import { ChevronLeft } from "lucide-react";

export default function ImportPage() {
  const { setCurrent } = useStore();

  const form = useForm<ImportSchema>({
    resolver: zodResolver(ImportSchema),
  });

  function onSubmit(values: ImportSchema) {
    const temp: any = values;

    const nemonic = Array.from({ length: 12 }, (_, i) => i + 1).reduce(
      (acc: any, curr: any) => {
        return `${acc} ${temp[curr]}`;
      },
      ""
    );

    localStorage.setItem("nemonic", nemonic);
    setCurrent("home");
  }

  return (
    <Form {...form}>
      <ChevronLeft
        onClick={() => {
          setCurrent("");
        }}
      ></ChevronLeft>

      <div className="flex items-center justify-center">
        <p className="text-xl font-bold">Input Secret Recovery Phrase</p>
      </div>
      <PhraseForm />
      <Button
        size={"lg"}
        className="w-full p-2 text-xl text-white sticky bottom-0 right-0"
        onClick={form.handleSubmit(onSubmit)}
      >
        Import Wallet
      </Button>
    </Form>
  );
}

function PhraseForm() {
  const form = useFormContext();
  return (
    <Form {...form}>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((e) => {
          return <PhraseInput control={form.control} name={e.toString()} />;
        })}
      </div>
    </Form>
  );
}
function PhraseInput({ control, name }: any) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input placeholder={`${name}. `} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
