"use client";

import Image from "next/image";
import { useParams, usePathname } from "next/navigation";

export default function Steps() {
  const path = usePathname();
  const activePath = path.split("configure")[1];

  const steps = [
    {
      name: "Step 1: Add image",
      description: "Choose an image for your case",
      path: "/upload",
    },
    {
      name: "Step 2: Customize design",
      description: "Make the case yours",
      path: "/design",
    },
    {
      name: "Step 3: Summary",
      description: "Review your final design",
      path: "/preview",
    },
  ];

  return (
    <div className={`flex`}>
      {steps.map((step, i) => {
        return (
          <div key={i} className="flex">
            <div
              className={`flex w-fit ${activePath === step.path && "border-green-400"} items-center justify-center gap-8 border-b-8 px-6 py-6 shadow-md`}
            >
              <Image
                src={`/snake-${i + 1}.png`}
                alt="snake"
                width={80}
                height={80}
              />
              <div className="">
                <p className="text-xl font-semibold">{step.name} </p>
                <p className="">{step.description}</p>
              </div>
            </div>

            {/* TODO: Make Right Step Separator */}
            <div className="relative flex h-20 w-2 items-center">
              <svg
                className="absolute top-12 h-full w-full text-gray-300"
                viewBox="0 0 12 82"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M0.5 0V31L10.5 41L0.5 51V82"
                  stroke="currentcolor"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}
