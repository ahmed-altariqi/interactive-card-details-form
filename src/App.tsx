import { useState } from "react";

import { type CardCredentials } from "@/validation";

import { CardPreview } from "@/components/card-preview";
import { CardForm } from "@/components/card-form";
import { ThankYouMessage } from "@/components/thank-you";

const INITIAL_CARD_CREDENTIALS = {
  cardHolderName: "Jane Appleseed",
  cardNumber: "0000 0000 0000 0000",
  expirationMonth: "00",
  expirationYear: "00",
  cvc: "000",
};

const App = () => {
  const [cardCredentials, setCardCredentials] = useState<CardCredentials>(
    INITIAL_CARD_CREDENTIALS
  );
  const [focusedFiled, setFocusedFiled] = useState<
    keyof CardCredentials | null
  >(null);
  const [showThankYouMessage, setShowThankYouMessage] =
    useState<boolean>(false);

  const reset = () => {
    setShowThankYouMessage(false);
    setCardCredentials(INITIAL_CARD_CREDENTIALS);
  };

  return (
    <main className="flex flex-col md:flex-row h-screen overflow-hidden">
      <CardPreview
        cardCredentials={cardCredentials}
        focusedFiled={focusedFiled}
      />
      {showThankYouMessage ? (
        <ThankYouMessage reset={reset} />
      ) : (
        <CardForm
          setCardCredentials={setCardCredentials}
          setFocusedFiled={setFocusedFiled}
          setShowThankYouMessage={setShowThankYouMessage}
        />
      )}
    </main>
  );
};

export default App;
