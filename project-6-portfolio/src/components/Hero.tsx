import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import React from "react";
import { FaLocationArrow } from "react-icons/fa";
import MagicBtn from "./ui/MagicBtn";
import { Spotlight } from "./ui/Spotlight";
import { FloatingNav } from "./ui/floating-navbar";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const navItems = [
  {
    name: "Home",
    link: "/",
    icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "About",
    link: "/about",
    icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    name: "Contact",
    link: "/contact",
    icon: <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];

function Hero() {
  return (
    <div className="pb-20 pt-36">
      <div className="relative w-full">
        <FloatingNav navItems={navItems} />
      </div>
      <div className="">
        <Spotlight
          className="-left-10 -top-40 h-screen md:-left-32 md:-top-20"
          fill="white"
        />
        <Spotlight
          className="top-30 left-10 h-[80vh] w-[80vw] md:-left-32 md:top-20 md:h-screen md:w-screen"
          fill="none"
        />
        <Spotlight
          className="left-full top-10 h-[80vh] w-[50vw]"
          fill="purple"
        />
        <Spotlight
          className="left-80 top-20 h-[80vh] w-[50vw] lg:left-40 lg:top-10 lg:w-screen"
          fill="blue"
        />
      </div>
      <div className="flex flex-col items-center justify-center text-center">
        <div className="dark:bg-grid-white/[0.1] bg-grid-black/[0.1] dark:bg-black-100 absolute -z-10 flex h-screen w-full items-center justify-center bg-white">
          {/* Radial gradient for the container to give a faded look */}
          <div className="dark:bg-black-100 pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        </div>
        <h2 className="max-w-80 text-xs uppercase tracking-widest dark:text-blue-100">
          Dynamic Web Magic with next .js
        </h2>
        <h1>
          <TextGenerateEffect
            className="text-[40px] md:text-5xl lg:text-6xl"
            words="
        Transforming Concepts into Seamless User Experiences
        "
          />
          <p className="mb-4 text-sm md:text-lg md:tracking-wider lg:text-2xl">
            Hi I&apos;m Gaurav, full stack developer based in India.
          </p>
          <a href="#about">
            <MagicBtn
              title="See my work"
              position="right"
              icon={<FaLocationArrow />}
              otherClasses="gap-2"
            />
          </a>
        </h1>
      </div>
    </div>
  );
}

export default Hero;
