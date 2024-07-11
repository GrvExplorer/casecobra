import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { TiTick } from "react-icons/ti";

export default function Home() {
  // const { userId } = useAuth();

  return (
    <div className="font-bold">
      <MaxWidthWrapper className={"pb-8 lg:grid"}>
        <section className="mt-32 flex flex-col justify-center gap-10 text-center md:mt-40 md:gap-12 lg:gap-16">
          <div className="">
            <Image
              className="ml-10 md:ml-20 lg:ml-4"
              src="/snake-1.png"
              alt="logo"
              width={80}
              height={80}
            />
            <h1 className="text-5xl capitalize leading-[1.1] tracking-wider md:text-6xl lg:text-8xl">
              your image on a{" "}
              <span className="bg-green-400 text-white">custom</span> phone case
            </h1>
          </div>

          <h2 className="-mt-4 text-lg font-medium lg:text-xl">
            Capture your favorite memories with your own,{" "}
            <span className="font-bold">one-of-one</span> phone case. CaseCobra
            allows you to protect your memories not just your phone case.
          </h2>
          <div className="-mt-6"></div>
          <div className="mt-4 flex justify-center">
            <div className=" flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <TiTick className="text-[28px] text-green-400" />
                <p className="text-lg lg:text-xl">
                  High-quality, durable material
                </p>
              </div>
              <div className="flex items-center gap-2">
                <TiTick className="text-[28px] text-green-400" />
                <p className="text-lg lg:text-xl">
                  Modern iPhone models supported
                </p>
              </div>
              <div className="flex items-center gap-2">
                <TiTick className="text-[28px] text-green-400" />
                <p className="text-lg lg:text-xl">5 year print guarantee</p>
              </div>
            </div>
          </div>

          <div className="mt-12 flex justify-center gap-4 md:mt-4">
            <div className="flex">
              <Image
                className="rounded-full"
                src={"/users/user-1.png"}
                alt="user"
                width={48}
                height={40}
              />
              <Image
                className="-ml-[18px] rounded-full outline outline-offset-1 outline-white"
                src={"/users/user-2.png"}
                alt="user"
                width={48}
                height={40}
              />
              <Image
                className="-ml-[18px] rounded-full outline outline-offset-1 outline-white"
                src={"/users/user-3.png"}
                alt="user"
                width={48}
                height={40}
              />
              <Image
                className="-ml-[18px] rounded-full outline outline-offset-1 outline-white"
                src={"/users/user-4.jpg"}
                alt="user"
                width={48}
                height={40}
              />
              <Image
                className="-ml-[18px] rounded-full outline outline-offset-1 outline-white"
                src={"/users/user-5.jpg"}
                alt="user"
                width={48}
                height={40}
              />
            </div>
            <div className=" ">
              <p className="flex text-start">
                <Star className="h-4 w-4 fill-green-600 text-green-600" />
                <Star className="h-4 w-4 fill-green-600 text-green-600" />
                <Star className="h-4 w-4 fill-green-600 text-green-600" />
                <Star className="h-4 w-4 fill-green-600 text-green-600" />
                <Star className="h-4 w-4 fill-green-600 text-green-600" />
              </p>
              <p className="text-lg font-medium">
                <span className="font-bold">1.250</span> happy customers happy
                customer ✨
              </p>
            </div>
          </div>

          <section className=" mb-10 lg:mb-28">
            <MaxWidthWrapper className="flex justify-center text-black mt-10">
              <div className="flex flex-col gap-5 rounded-lg border border-primary px-14 py-4 drop-shadow-lg">
                <div className="flex justify-center">
                  <p className="rounded-lg bg-black px-4 -mt-8 py-2 text-white">Recommended</p>
                </div>
                <div className="mt-8 flex gap-40">
                  <div className="flex w-60 flex-col items-start gap-[86px]">
                    <p className="text-4xl">Pricing</p>
                    <div className="flex w-full flex-col items-start gap-2">
                      <div className="flex w-full justify-between">
                        <p className="">Base Price</p>
                        <p className="text-green-400">+₹140</p>
                      </div>

                      <div className="flex w-full justify-between">
                        <p className="">Soft Polycarbonate</p>
                        <p className="text-green-400">+₹30</p>
                      </div>

                      <div className="flex w-full justify-between">
                        <p className="">Textured Finish</p>
                        <p className="text-green-400">+₹50</p>
                      </div>

                      <div className="-mb-1 mt-1 w-full border bg-gray-400"></div>

                      <div className="flex w-full justify-between">
                        <p className="">Total Price</p>
                        <p className="text-green-400">+₹220</p>
                      </div>
                    </div>

                    <Link href={"/configure/upload"}>
                      <Button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000000,45%,#4ade80,55%,#000000)] bg-[length:200%_100%] px-6 font-medium text-slate-300 transition-colors focus:outline-none">
                        Create Now
                      </Button>
                    </Link>
                  </div>

                  <div className="pointer-events-none relative aspect-[896/1594] w-60 bg-opacity-50 ">
                    <AspectRatio
                      ratio={895 / 183}
                      className="pointer-events-none relative z-50 aspect-[896/1831]"
                    >
                      <Image
                        width={200}
                        height={100}
                        src={"/phone-template.png"}
                        alt="Phone Case"
                        className=""
                      />
                      <div className="absolute top-0 -z-20 h-full w-full">
                        <Image
                          width={200}
                          height={100}
                          src={"/testimonials/1.jpg"}
                          alt="Cover Photo"
                          className="pointer-events-none rounded-[40px]"
                        />
                      </div>
                    </AspectRatio>
                  </div>
                </div>
              </div>
            </MaxWidthWrapper>
          </section>
        </section>
      </MaxWidthWrapper>
    </div>
  );
}
