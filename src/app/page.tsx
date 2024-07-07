import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Star } from "lucide-react";
import Image from "next/image";
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

          <h2 className="text-lg font-medium lg:text-xl">
            Capture your favorite memories with your own,{" "}
            <span className="font-bold">one-of-one</span> phone case. CaseCobra
            allows you to protect your memories not just your phone case.
          </h2>

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
        </section>
      </MaxWidthWrapper>
    </div>
  );
}
