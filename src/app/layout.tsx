import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/ui/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { QueryProvider } from "@/lib/react query/Provider";
import { ClerkProvider } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import Link from "next/link";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Case Cobra",
  description: "Good quality phone cover in low price",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <html lang="en">
          <body className={bricolage.className}>
            <Toaster />
            <NextSSRPlugin
              /**
               * The `extractRouterConfig` will extract **only** the route configs
               * from the router to prevent additional information from being
               * leaked to the client. The data passed to the client is the same
               * as if you were to fetch `/api/uploadthing` directly.
               */
              routerConfig={extractRouterConfig(ourFileRouter)}
            />

            <Navbar />

            {children}

            <MaxWidthWrapper className={"mt-8 border-t border-gray-200"}>
              <footer className="flex w-full justify-between py-8 ">
                <p className="flex items-center ">2024 All right reserved</p>
                <div className="flex flex-col gap-6">
                  <div className="flex gap-6">
                    <Link href={"/legal/terms-and-conditions"}>
                      <p className="border-b border-transparent hover:border-b hover:border-dashed hover:border-gray-300">
                        Terms And Conditions
                      </p>
                    </Link>
                    <Link href={"/legal/privacy-policy"}>
                      <p className="border-b border-transparent hover:border-b hover:border-dashed hover:border-gray-300">
                        Privacy Policy
                      </p>
                    </Link>
                    <Link href={"/legal/cookies-policy"}>
                      <p className="border-b border-transparent hover:border-b hover:border-dashed hover:border-gray-300">
                        Cookies Policy
                      </p>
                    </Link>
                  </div>
                  <div className="flex justify-center gap-6">
                    <Link href={"/legal/cancellation-and-refund"}>
                      <p className="border-b border-transparent hover:border-b hover:border-dashed hover:border-gray-300">
                        Cancellation And Refund
                      </p>
                    </Link>
                    <Link href={"/legal/shipment-and-delivery"}>
                      <p className="border-b border-transparent hover:border-b hover:border-dashed hover:border-gray-300">
                        Shipment And Delivery
                      </p>
                    </Link>
                  </div>
                </div>
              </footer>
            </MaxWidthWrapper>
          </body>
        </html>
      </QueryProvider>
    </ClerkProvider>
  );
}
