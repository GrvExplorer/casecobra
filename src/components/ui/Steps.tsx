"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

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
    <div className={`flex flex-col lg:flex-row lg:items-end`}>
      {steps.map((step, i) => {
        // TODO: Need to understand
        const isComplete = steps
          .slice(i + 1)
          .some((step) => path.endsWith(step.path));
        return (
          <div key={i} className="flex lg:px-0">
            <div
              className={`flex w-fit ${isComplete && "border-green-400"} ${activePath === step.path && "border-gray-400"} w-[420px] items-center gap-8 border-l-8 px-6 py-6  shadow-md lg:w-fit lg:border-b-8 lg:border-l-0 lg:shadow-none`}
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

            {/* TODO: Make Right Step Separator And working of i and 0 understand. */}
            {i !== 0 && (
              <div className="absolute hidden w-3 items-center lg:top-36 lg:block">
                <svg
                  className="h-full w-full text-gray-300"
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
            )}
          </div>
        );
      })}
    </div>
  );
}
