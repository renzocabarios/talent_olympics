import { z } from "zod";

export const SwapSchema = z.object({
  inputMint: z.string().min(8),
  outputMint: z.string().min(8),
  amount: z.coerce.number(),
});

export type SwapSchema = z.infer<typeof SwapSchema>;
