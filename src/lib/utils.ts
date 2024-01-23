import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 *
 * @param value card number
 * @description Add a space between every 4 characters.
 * @returns string
 */
export function addSpaceBetweenCardNumbers(value: string): string {
  const regex = /(.{4})/g;
  return value.replace(regex, "$1 ");
}
