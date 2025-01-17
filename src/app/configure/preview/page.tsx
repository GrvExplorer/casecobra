import { db } from "@/db";
import { notFound } from "next/navigation";
import PreviewDesign from "./PreviewDesign";

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
      <PreviewDesign configuration={configuration} />
    </div>
  );
}
