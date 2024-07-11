import { z } from "zod";

export const ImportSchema = z.object({
  "1": z.string().min(3),
  "2": z.string().min(3),
  "3": z.string().min(3),
  "4": z.string().min(3),
  "5": z.string().min(3),
  "6": z.string().min(3),
  "7": z.string().min(3),
  "8": z.string().min(3),
  "9": z.string().min(3),
  "10": z.string().min(3),
  "11": z.string().min(3),
  "12": z.string().min(3),
});

export type ImportSchema = z.infer<typeof ImportSchema>;
