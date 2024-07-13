import { z } from "zod";

export const SendSolSchema = z.object({
  address: z.string(),
  amount: z.coerce.number(),
});

export type SendSolSchema = z.infer<typeof SendSolSchema>;
