import { AspectRatio } from "@/components/ui/aspect-ratio";
import { BASE_PRICE, PRODUCT_PRICES } from "@/config/product";
import { COLORS } from "@/constants/options-validation";
import { cn, formatPrice } from "@/lib/utils";
import { Configuration } from "@prisma/client";
import Image from "next/image";
import CreatePaymentPage from "./CreatePaymentPage";
import Confetti from "@/components/ui/Confetti";

export default function PreviewDesign({
  configuration,
}: {
  configuration: Configuration;
}) {
  const { color, model, finish, croppedImageUrl, material, Qid } =
    configuration;

  let totalPrice = BASE_PRICE;
  if (finish === "textured") totalPrice += PRODUCT_PRICES.finish.textured;
  if (material === "polycarbonate")
    totalPrice += PRODUCT_PRICES.material.polycarbonate;

  const tw = COLORS.find(
    (supportedColor) => supportedColor.value === color,
  )?.tw;

  return (
    <>
    {/* TODO: Add confetti */}
    {/* <Confetti /> */}
    <div className="mb-6 mt-20 grid w-full gap-20 md:grid-cols-3">
      <div className="flex justify-center md:col-span-1">
        <div className="pointer-events-none relative aspect-[896/1831] w-60 bg-opacity-50 ">
          <AspectRatio
            ratio={895 / 1831}
            className="pointer-events-none relative z-50 aspect-[896/1831]"
          >
            <Image
              className="pointer-events-none z-50 select-none "
              src="/phone-template.png"
              alt="phone template"
              fill
            />
            <div
              className={cn(
                "absolute inset-0 bottom-px left-[3px] right-[3px] top-px rounded-[32px]",
                `bg-${tw}`,
              )}
            />
            <div className="relative h-full w-full">
              <Image
                src={croppedImageUrl!}
                fill
                alt="your image"
                className="pointer-events-none rounded-[40px]"
              />
            </div>
          </AspectRatio>
        </div>
      </div>
      <div className="col-span-2">
        <h3 className="text-4xl font-bold tracking-wide text-black md:text-start">
          Your {model} Case
        </h3>
        <p className="mt-3 flex gap-4 font-semibold text-green-400">
          ✅<span className="text-center">In stock and ready to ship</span>
        </p>

        <div className="mt-8 grid grid-cols-2 gap-10 border-b-4 pb-20 ">
          <div className="">
            <p className="mb-4 font-semibold">Highlights</p>
            <ul className="ml-4 list-disc">
              <li>Wireless charging compatible</li>
              <li>TPU shock absorption</li>
              <li>Packaging made from recycled materials</li>
              <li>5 year print warranty</li>
            </ul>
          </div>
          <div className="">
            <p className="mb-4 font-semibold">Material</p>
            <ul className="ml-4 list-disc">
              <li>High-quality, durable material</li>
              <li>Scratch and fingerprint resistant coasting</li>
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex flex-col gap-4 border-b-4 pb-8">
            <div className="flex w-full justify-between">
              <p className="">Base price</p>
              <p className="text-green-400">+{formatPrice(BASE_PRICE / 10)} </p>
            </div>
            <div className="flex w-full justify-between">
              {finish === "textured" ? (
                <>
                  <p className="">Textured finish</p>{" "}
                  <p className="text-green-400">
                    +{formatPrice(PRODUCT_PRICES.finish.textured / 10)}
                  </p>
                </>
              ) : (
                <>
                  <p className="">Smooth finish</p>{" "}
                  <p className="text-green-400">
                    +{formatPrice(PRODUCT_PRICES.finish.smooth / 10)}
                  </p>
                </>
              )}
            </div>
            <div className="flex w-full justify-between">
              {material === "polycarbonate" ? (
                <>
                  <p className="">Polycarbonate material</p>{" "}
                  <p className="text-green-400">
                    +{formatPrice(PRODUCT_PRICES.material.polycarbonate / 10)}
                  </p>
                </>
              ) : (
                <>
                  <p className="">Silicon material</p>{" "}
                  <p className="text-green-400">
                    +{formatPrice(PRODUCT_PRICES.material.silicone / 10)}
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="mt-2 flex justify-between text-xl font-bold">
            <p className="">Order total</p>
            <p className="text-green-400">{formatPrice(totalPrice / 10)}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <CreatePaymentPage configId={Qid} />
        </div>
      </div>
    </div>
    </>
  );
}
