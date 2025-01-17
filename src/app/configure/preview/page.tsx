import { db } from "@/db";
import PreviewDesign from "./PreviewDesign";
import Head from "next/head";
import Script from "next/script";

export default async function Page({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const { id } = searchParams;

  if (!id || typeof id !== "string") return;

  const configuration = await db.configuration.findUnique({
    where: {
      id: id,
    },
  });

  if (!configuration) return;

  return (
    <div>
      <Head>
        <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      </Head>
      <PreviewDesign configuration={configuration} />
    </div>
  );
}
