import { z } from "zod";

export const LoginSchema = z.object({
  password: z.string().min(8).max(30),
});

export type LoginSchema = z.infer<typeof LoginSchema>;
