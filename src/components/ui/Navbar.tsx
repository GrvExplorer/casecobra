import AdminButton from "@/components/AdminButton";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";

export default function Navbar() {
  return (
    <MaxWidthWrapper className={"sticky top-0 z-20 w-full py-2 shadow-md"}>
      <header>
        <nav className="flex w-full items-center justify-between px-8 pb-8 pt-8">
          <Link href={"/"}>
            <p className="text-xl font-bold">
              case<span className="text-green-400">cobra</span>
            </p>
          </Link>

          <ul className={"flex list-none items-center gap-4"}>
            <SignedIn>
              {/* TODO: to be fixed (should show admin button for admin only.) */}
              <li>
                <div className="flex items-center gap-4">
                  {/* TODO: On sign out redirect url check configuration present and stay in that page */}
                  {/* <UserButton afterSignOutUrl="/auth-callback" /> */}
                  {/* TODO: Data on Deleting account */}

                  
                  <UserButton />
                  <p className="text-lg lg:text-xl">Dashboard ✨</p>
                </div>
              </li>
              <li>
                <Link href={"/configure/upload"}>
                  <Button>Create case ={">"} </Button>
                </Link>
              </li>
            </SignedIn>
            <li>
              <SignedOut>
                <SignUpButton>
                  <Button variant={"ghost"}>Sign Up</Button>
                </SignUpButton>
              </SignedOut>
            </li>
            <li>
              <SignedOut>
                <SignInButton>
                  <Button variant={"outline"}>Login</Button>
                </SignInButton>
              </SignedOut>
            </li>
          </ul>
        </nav>
      </header>
    </MaxWidthWrapper>
  );
}
