import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatUnits(value: string | number, decimals: string | number) {
  return Number(value) * 10 ** Number(decimals);
}

export function truncateAddress(address: string) {
  return `${address.slice(0, 5)}...${address.slice(-5)}`;
}
