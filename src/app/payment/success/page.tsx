import ReceivedOrderEmail from "@/components/ReceivedOrderEmail";
import ThankYou from "@/components/thank-you";
import { currentUser } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { Resend } from 'resend'

export default async function Page({
  searchParams,
}: {
  searchParams: {
    orderId: string | undefined
  }
}) {

  // TODO: Send email in webhook if webhook fixed or do it Here

//  const formData = req.formData();
//  console.log("🚀 ~ file: page.tsx:12 ~ formData:", formData)
//  console.log(req);
 
  const user = await currentUser()
  if (!user) {
    return redirect('/')
  }
  

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThankYou orderId={searchParams.orderId} />
    </Suspense>
  );
}
