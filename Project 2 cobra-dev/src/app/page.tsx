import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="font-bold">
      <MaxWidthWrapper className={"pb-24 pt-10 lg:grid  shadow-md"}>
        <section>
          <header>
            <nav className="flex justify-between w-full  items-center">
              <p className="font-bold">
                case<span className="text-green-400">cobra</span>
              </p>

              <ul className="list-none flex gap-4 items-center">
                <li>
                  <Button>Sign Up</Button>
                </li>
                <li>
                  <Button variant={'outline'}>Login</Button>
                </li>
                <li>
                <Button className="bg-green-600 hover:bg-green-500 px-4 py-2">Create case ={">"} </Button>
                </li>
              </ul>
            </nav>
          </header>

          
        </section>
      </MaxWidthWrapper>
    </div>
  );
}
