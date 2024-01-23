import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { addSpaceBetweenCardNumbers } from "@/lib/utils";
import { cardCredentialsSchema, CardCredentials } from "@/validation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CardFormProps {
  setCardCredentials: React.Dispatch<React.SetStateAction<CardCredentials>>;
  setFocusedFiled: React.Dispatch<
    React.SetStateAction<keyof CardCredentials | null>
  >;
  setShowThankYouMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CardForm({
  setCardCredentials,
  setFocusedFiled,
  setShowThankYouMessage,
}: CardFormProps) {
  const form = useForm<z.infer<typeof cardCredentialsSchema>>({
    resolver: zodResolver(cardCredentialsSchema),
    defaultValues: {
      cardHolderName: "",
      cardNumber: "",
      expirationMonth: "",
      expirationYear: "",
      cvc: "",
    },
  });

  function onSubmit(values: z.infer<typeof cardCredentialsSchema>) {
    console.log({ values });
    setShowThankYouMessage(true);
  }

  function handleFormItemChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setCardCredentials((current) => ({
      ...current,
      [name]:
        name === "cardNumber"
          ? addSpaceBetweenCardNumbers(value)
          : (name === "expirationMonth" || name === "expirationYear") &&
            value.length === 1
          ? `0${value}`
          : value,
    }));
  }

  const handleOnFocusCapture = (
    event: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    const name = event.target.name;

    if (!name) return;

    setFocusedFiled(name as keyof CardCredentials);
  };

  const handleOnBlurCapture = () => setFocusedFiled(null);

  return (
    <section className="flex-[0.7] flex items-center justify-center">
      <div className="w-full max-w-[355px] px-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="cardHolderName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CARDHOLDER NAME</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Jane Appleseed"
                      onChangeCapture={handleFormItemChange}
                      onFocusCapture={handleOnFocusCapture}
                      onBlurCapture={handleOnBlurCapture}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CARD NUMBER</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. 0000 0000 0000 0000"
                      onChangeCapture={handleFormItemChange}
                      onFocusCapture={handleFormItemChange}
                      onBlurCapture={handleOnBlurCapture}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-2">
              <div className="flex-[.25]">
                <FormField
                  control={form.control}
                  name="expirationMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>MM</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="00"
                          onChangeCapture={handleFormItemChange}
                          onFocusCapture={handleOnFocusCapture}
                          onBlurCapture={handleOnBlurCapture}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-[.25]">
                <FormField
                  control={form.control}
                  name="expirationYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>YY</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="00"
                          onChangeCapture={handleFormItemChange}
                          onFocusCapture={handleOnFocusCapture}
                          onBlurCapture={handleOnBlurCapture}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-[.5]">
                <FormField
                  control={form.control}
                  name="cvc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>cvc</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. 123"
                          onChangeCapture={handleFormItemChange}
                          onFocusCapture={handleOnFocusCapture}
                          onBlurCapture={handleOnBlurCapture}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type="submit" className="w-full p-6">
              Confirm
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
