import ThankYou from "@/components/thank-you";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    orderId: string
  }
}) {

//  const formData = req.formData();
//  console.log("🚀 ~ file: page.tsx:12 ~ formData:", formData)
//  console.log(req);
 

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThankYou orderId={searchParams.orderId} />
    </Suspense>
  );
}
