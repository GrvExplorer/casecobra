"use client";
import HandleComponent from "@/components/ui/HandleComponent";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { BASE_PRICE, PRODUCT_PRICES } from "@/config/product";
import {
  COLORS,
  FINISHES,
  MATERIALS,
  MODELS,
} from "@/constants/options-validation";
import { useSaveConfig } from "@/lib/react query/mutations/queryandmutations";
import { useUploadThing } from "@/lib/upload thing/uploadThing";
import { cn, formatPrice } from "@/lib/utils";
import { RadioGroup } from "@headlessui/react";
import { ArrowRight, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Rnd } from "react-rnd";

// TODO: Price of material and finishing add-up
export default function CheckOnPhone({
  configId,
  imageUrl,
  proportion,
}: {
  configId: string;
  imageUrl: string | undefined;
  proportion: {
    width: number;
    height: number;
  };
}) {
  const router = useRouter();
  const { toast } = useToast();

  const handleCropPart = async () => {
    // TODO: Understand in detail about getting cropped part of image
    try {
      const {
        left: caseLeft,
        top: caseTop,
        width,
        height,
      } = phoneCaseRef.current!.getBoundingClientRect();

      const { left: containerLeft, top: containerTop } =
        containerRef.current!.getBoundingClientRect();

      const leftOffset = caseLeft - containerLeft;
      const topOffset = caseTop - containerTop;

      const actualX = renderPosition.x - leftOffset;
      const actualY = renderPosition.y - topOffset;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      const userImage = new window.Image();
      userImage.crossOrigin = "anonymous";
      userImage.src = imageUrl ? imageUrl : "";
      await new Promise<void>(
        (resolve) => (userImage.onload = () => resolve()),
      );

      ctx?.drawImage(
        userImage,
        actualX,
        actualY,
        renderSize.width,
        renderSize.height,
      );

      const base64 = canvas.toDataURL();
      const base64Data = base64.split(",")[1];
      console.log(base64Data);

      const blob = base64ToBlob(base64Data, "image/png");

      const file = new File([blob], "filename.png", { type: "image/png" });

      await startUpload([file], { configId: configId });
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong",
        description:
          "There was a problem saving your config, please try again.",
        variant: "destructive",
      });
    }
  };
  // const [totalPrice, setTotalPrice] = useState(BASE_PRICE);

  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number];
    model: (typeof MODELS.options)[number];
    material: (typeof MATERIALS.options)[number];
    finish: (typeof FINISHES.options)[number];
  }>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  });

  let totalPrice = BASE_PRICE;
  if (options.finish.value === "textured")
    totalPrice += PRODUCT_PRICES.finish.textured;
  if (options.material.value === "polycarbonate")
    totalPrice += PRODUCT_PRICES.material.polycarbonate;

  const { mutateAsync: saveConfig, isPending } = useSaveConfig(handleCropPart);

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {},
  });

  // Getting Cropped Image Part
  const [renderPosition, setRenderPosition] = useState({ x: 150, y: 205 });
  const [renderSize, setRenderSize] = useState({
    width: proportion?.width,
    height: proportion?.height,
  });
  const phoneCaseRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  function base64ToBlob(base64: string, mimeType: string) {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  }

  // TODO: understand the css going on
  //  TODO: fix css

  return (
    <section className="relative z-10 mb-20 mt-20 grid grid-cols-3 gap-4 pb-20 md:gap-8">
      <div
        ref={containerRef}
        className="col-span-3 flex h-[37.5rem] w-full max-w-4xl items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 lg:col-span-2"
      >
        <div className="pointer-events-none relative aspect-[896/1831] w-60 bg-opacity-50">
          <AspectRatio
            ref={phoneCaseRef}
            ratio={895 / 1831}
            className="pointer-events-none relative z-50 aspect-[896/1831] w-full"
          >
            <Image
              className="pointer-events-none z-50 select-none"
              src="/phone-template.png"
              alt="phone template"
              fill
            />
          </AspectRatio>
          <div
            className={cn(
              "absolute inset-0 bottom-px left-[3px] right-[3px] top-px rounded-[32px]",
              `bg-${options.color.tw}`,
            )}
          />
          <div className="absolute bottom-px left-[3px] right-[3px] top-px z-40 rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />
        </div>
      </div>

      {!!imageUrl && (
        <Rnd
          className="absolute z-20 border-2 border-primary"
          default={{
            x: 150,
            y: 205,
            height: proportion.height / 20,
            width: proportion.width / 20,
          }}
          size={{ width: renderSize.width, height: renderSize.height }}
          position={{ x: renderPosition.x, y: renderPosition.y }}
          onDragStop={(_, data) => {
            const { x, y } = data;
            setRenderPosition({ x, y });
          }}
          onResizeStop={(e, dir, ref, delta, { x, y }) => {
            setRenderSize({
              height: parseInt(ref.style.height.slice(0, -2)),
              width: parseInt(ref.style.width.slice(0, -2)),
            });
            setRenderPosition({ x, y });
          }}
          resizeHandleComponent={{
            bottomRight: <HandleComponent />,
            bottomLeft: <HandleComponent />,
            topRight: <HandleComponent />,
            topLeft: <HandleComponent />,
          }}
        >
          <div className="relative h-full w-full">
            <Image
              src={imageUrl}
              fill
              alt="your image"
              className="pointer-events-none"
            />
          </div>
        </Rnd>
      )}

      <ScrollArea className="relative z-40 w-full lg:overflow-auto">
        <div className=" col-span-full h-[37.5rem] w-full bg-white lg:col-span-1">
          <div className="flex w-full justify-center border-b-2 pb-12 pt-8 lg:w-fit ">
            <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
              Customize your case
            </h2>
          </div>

          <div className=" relative mt-6 flex w-full flex-col gap-8">
            {/* Color */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="color-options" className="font-semibold">
                Color: {options.color.label}
              </Label>
              <div className="flex w-full flex-col gap-6">
                <RadioGroup
                  defaultValue={options.color}
                  onChange={(val) => {
                    setOptions((prev) => ({ ...prev, color: val }));
                  }}
                >
                  <div className="mt-3 flex items-center space-x-3 ">
                    {COLORS.map((color) => (
                      <RadioGroup.Option
                        key={color.value}
                        value={color}
                        className={({ active, checked }) =>
                          cn(
                            "relative flex cursor-pointer items-center justify-center rounded-full border-2 border-transparent p-0.5 focus:outline-none focus:ring-0 active:outline-none active:ring-0",
                            {
                              [`border-${color.tw}`]: active || checked,
                            },
                          )
                        }
                      >
                        <span
                          className={cn(
                            `bg-${color.tw}`,
                            "h-8 w-8 rounded-full border border-black border-opacity-10",
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Models */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone-models" className="font-semibold">
                Models
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger id="phone-models" asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="mt-3 h-12 w-full justify-between"
                  >
                    {options.model.label}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full">
                  {MODELS.options.map((model, i) => (
                    <DropdownMenuCheckboxItem
                      className={cn("flex gap-1 text-sm hover:bg-zinc-100 ", {
                        "bg-zinc-100": model.label === options.model.label,
                      })}
                      key={i}
                      checked={options.model.value === model.value}
                      onCheckedChange={() => {
                        setOptions((prev) => ({ ...prev, model }));
                      }}
                    >
                      {model.label}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Material And Finishing */}
            {[MATERIALS, FINISHES].map((addOn, i) => (
              <RadioGroup
                className={"mt-3"}
                key={i}
                defaultValue={addOn.options[0]}
                onChange={(val) => {
                  setOptions((prev) => ({ ...prev, [addOn.name]: val }));
                }}
              >
                <div className="flex flex-col gap-8">
                  <div className="">
                    <Label className="font-medium capitalize">
                      {addOn.name}
                    </Label>
                    <div className="flex flex-col gap-2">
                      {addOn.options.map((offer, i) => (
                        <RadioGroup.Option
                          key={i}
                          value={offer}
                          className={({ active, checked }) =>
                            cn(
                              "cursor-pointer rounded-lg border px-4 py-4 transition hover:bg-gray-100",
                              {
                                [`border-green-400`]: active || checked,
                              },
                            )
                          }
                        >
                          <div className="flex justify-between">
                            <p className=""> {offer.label} </p>
                            <p className="">{formatPrice(offer.price / 10)}</p>
                          </div>
                          {offer.description ? (
                            <RadioGroup.Description
                              as="span"
                              className="text-gray-500"
                            >
                              <span className="block sm:inline">
                                {offer.description}
                              </span>
                            </RadioGroup.Description>
                          ) : null}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </div>
                </div>
              </RadioGroup>
            ))}
          </div>

          <div className="mt-6 flex w-full items-center justify-between">
            {/* TODO: Fix Totaling */}
            <p className="">{formatPrice(totalPrice / 10)}</p>
            <Button
              disabled={isPending}
              isLoading={isPending}
              isLoadingText="Loading"
              onClick={() => {
                saveConfig({
                  color: options.color.value,
                  model: options.model.value,
                  material: options.material.value,
                  finish: options.finish.value,
                  configId,
                });
              }}
              className="ml-8 grid w-full grid-cols-3"
            >
              <p className="col-span-2">Continue</p>
              <ArrowRight className="ml-1.5 inline h-4 w-4" />
            </Button>
          </div>
        </div>
      </ScrollArea>
    </section>
  );
}
