import { db } from "@/db";
import { notFound } from "next/navigation";
import PreviewDesign from "./PreviewDesign";

export default async function Page({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const { id } = searchParams;

  if (!id || typeof id !== "string") {
    return notFound();
  }

  const configuration = await db.configuration.findUnique({
    where: {
      Qid: id,
    },
  });

  if (!configuration) {
    return notFound();
  }

  return (
    <div>
      <PreviewDesign configuration={configuration} />
    </div>
  );
}
