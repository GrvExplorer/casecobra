import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { TiTick } from "react-icons/ti";

export default function Home() {
  return (
    <div className="font-bold">
      <MaxWidthWrapper className={"pb-8 lg:grid"}>
        <section className="w-full py-4 shadow-md">
          <header>
            <nav className="flex w-full items-center justify-between px-8 pb-8 pt-8">
              <p className="text-xl font-bold">
                case<span className="text-green-400">cobra</span>
              </p>

              <ul className="flex list-none items-center gap-4">
                <li>
                  <Button variant={"ghost"}>Sign Up</Button>
                </li>
                <li>
                  <Button variant={"outline"}>Login</Button>
                </li>
                <li>
                  <Button className="bg-green-600 px-4 py-2 hover:bg-green-500">
                    Create case ={">"}{" "}
                  </Button>
                </li>
              </ul>
            </nav>
          </header>
        </section>

        <section className="mt-32 md:mt-40 flex flex-col justify-center gap-10 text-center md:gap-12 lg:gap-16">
          <h1 className="text-5xl capitalize leading-[1.1] tracking-wider md:text-6xl lg:text-8xl">
            your image on a{" "}
            <span className="bg-green-400 text-white">custom</span> phone case
          </h1>

          <h2 className="text-lg font-medium lg:text-xl">
            Capture your favorite memories with your own,{" "}
            <span className="font-bold">one-of-one</span> phone case. CaseCobra
            allows you to protect your memories not just your phone case.
          </h2>

          <div className="mt-4 flex justify-center">
            <div className=" flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <TiTick className="text-[28px] text-green-400" />
                <p className="lg:text-xl">High-quality, durable material</p>
              </div>
              <div className="flex items-center gap-2">
                <TiTick className="text-[28px] text-green-400" />
                <p className="lg:text-xl">Modern iPhone models supported</p>
              </div>
              <div className="flex items-center gap-2">
                <TiTick className="text-[28px] text-green-400" />
                <p className="lg:text-xl">5 year print guarantee</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
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
              <p className="text-start">⭐⭐⭐⭐⭐</p>
              <p className="">12K happy customer ✨</p>
            </div>
          </div>
        </section>
      </MaxWidthWrapper>
    </div>
  );
}
