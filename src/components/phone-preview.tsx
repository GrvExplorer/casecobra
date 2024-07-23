"use client";

import { cn } from "@/lib/utils";
import { CaseColor } from "@prisma/client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AspectRatio } from "./ui/aspect-ratio";

interface PhonePreviewProps {
  croppedImageUrl: string;
  color: CaseColor;
}

function PhonePreview({ croppedImageUrl, color }: PhonePreviewProps) {
  const ref = useRef<HTMLDivElement>(null);

  const [renderedDimensions, setRenderedDimensions] = useState({
    height: 0,
    width: 0,
  });

  const handleResize = () => {
    if (!ref.current) return;
    const { width, height } = ref.current.getBoundingClientRect();
    setRenderedDimensions({ width, height });
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let caseBackgroundColor = "bg-zinc-950";
  if (color === "blue") caseBackgroundColor = "bg-blue-950";
  if (color === "rose") caseBackgroundColor = "bg-rose-950";

  return (

    // TODO: understand how to use aspect ratio
    <AspectRatio ref={ref} ratio={3000 / 2001} className="relative">

      <div className="absolute z-20 scale-[1.0352]"
      style={{
        left:
          renderedDimensions.width / 2 -
          renderedDimensions.width / (1216 / 121),
        top: renderedDimensions.height / 6.22,
      }}

      >
        <Image
          width={renderedDimensions.width / (3000 / 637)}
          className={cn(
            "phone-skew relative z-20 rounded-b-[10px] rounded-t-[15px] md:rounded-b-[20px] md:rounded-t-[30px]",
            caseBackgroundColor,
          )}
          src={croppedImageUrl}
          alt="preview cover"
          height={renderedDimensions.height}
        />
      </div>
      <div className="relative z-40 h-full w-full">
        <Image
          alt="phone"
          src="/clearphone.png"
          className="pointer-events-none h-full w-full rounded-md antialiased"
          fill
        />
      </div>
    </AspectRatio>
  );
}

export default PhonePreview;
