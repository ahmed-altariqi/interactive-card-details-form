import { cn } from "@/lib/utils";
import { type CardCredentials } from "@/validation";

interface CardPreviewProps {
  cardCredentials: CardCredentials;
  focusedFiled: keyof CardCredentials | null;
}

export const CardPreview = ({
  cardCredentials,
  focusedFiled,
}: CardPreviewProps) => {
  const { cardHolderName, cardNumber, expirationMonth, expirationYear, cvc } =
    cardCredentials;

  return (
    <section className=" relative  flex-[0.3] bg-main-mobile lg:bg-main-desktop bg-no-repeat bg-cover *:bg-cover *:bg-no-repeat *:bg-center p-2 text-white">
      <div className=" relative size-20  left-1/2 -translate-x-1/2 top-1/2 lg:left-[80%] -translate-y-1/2 *:h-[150px] *:w-[270px]  md:*:h-[223px] md:*:w-[380px] lg:*:w-[400px] *:bg-center *:bg-contain *:bg-no-repeat">
        {/* - - - - - - - - - - - - card back - - - - - - - - - - - - - - - - */}
        <article className="rounded-md bg-card-back  right-[-125px] absolute top-[65px] -translate-y-1/2 lg:top-[195px] lg:left-[-10px]">
          <p
            className={cn(
              "absolute text-l left-[210px] top-[61px] lg:top-[98px] lg:left-[330px]",
              focusedFiled === "cvc" && "outline"
            )}
          >
            {cvc}
          </p>
        </article>
        {/* - - - - - - - - - - - - card front - - - - - - - - - - - - - - - - */}
        <article className="rounded-md p-4 bg-card-front  absolute z-10 left-[-120px] top-[75px] flex flex-col justify-between shadow-2xl lg:left-[-70px] lg:top-[-170px]">
          <div className="size-full *:flex-[0.5] flex flex-col md:gap-20">
            <div className="flex items-center gap-4">
              <div className="rounded-full size-8 bg-white" />
              <div className="rounded-full size-4 outline outline-white/80" />
            </div>

            <div className="md:space-y-2 text-white/80">
              <div>
                <p
                  className={cn(
                    "text-[20px] tracking-wide",
                    focusedFiled === "cardNumber" && "outline"
                  )}
                >
                  {cardNumber}
                </p>
              </div>
              <div className="flex justify-between  px-1">
                <p
                  className={cn(
                    " uppercase",
                    focusedFiled === "cardHolderName" && "outline"
                  )}
                >
                  {cardHolderName}
                </p>
                <p>
                  <span
                    className={cn(
                      focusedFiled === "expirationMonth" && "outline"
                    )}
                  >
                    {expirationMonth}
                  </span>
                  /
                  <span
                    className={cn(
                      focusedFiled === "expirationYear" && "outline"
                    )}
                  >
                    {expirationYear}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};
