import { z } from "zod";

export const cardCredentialsSchema = z.object({
  cardHolderName: z
    .string()
    .min(1, { message: "Card holder name is required." })
    .refine((value) => /^[a-zA-Z0-9]+\s[a-zA-Z0-9]+$/.test(value), {
      message: "Invalid card holder name.",
    }),
  cardNumber: z
    .string()
    .min(1, { message: "Card number is required." })
    .refine((value) => isValidCardNumber(value), {
      message: "Invalid card number.",
    })
    .refine((value) => value.length <= 16, { message: "Invalid card number." }),
  expirationMonth: z
    .string()
    .min(1, { message: "Exp. month is required." })
    .refine((value) => /^[0-9]{1,2}$/.test(value), {
      message: "Invalid month.",
    })
    .refine((value) => (value.length === 1 ? 0 + value : value)),
  expirationYear: z
    .string()
    .min(1, {
      message: "Exp. year is required.",
    })
    .refine((value) => /^[0-9]{1,2}$/.test(value), {
      message: "Invalid year.",
    })
    .refine((value) => (value.length === 1 ? 0 + value : value)),
  cvc: z.string().refine((value) => /^[0-9]{1,3}$/.test(value), {
    message: "Invalid CVC.",
  }),
});

function isValidCardNumber(cardNumber: string) {
  // TODO: Add card validation.
  console.log({ cardNumber });
  return true;
}

export type CardCredentials = z.infer<typeof cardCredentialsSchema>;
