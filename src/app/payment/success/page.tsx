import ThankYou from "@/components/thank-you";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    orderId: string;
  };
}) {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThankYou orderId={searchParams.orderId} />
    </Suspense>
  );
}
