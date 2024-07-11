import { z } from "zod";

export const CreateAccountSchema = z.object({
  password: z.string().min(8).max(30),
});

export type CreateAccountSchema = z.infer<typeof CreateAccountSchema>;
