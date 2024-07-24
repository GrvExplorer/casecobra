import { getImageUrlById } from "@/db/data";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import CheckOnPhone from "./CheckOnPhone";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    id: string;
  };
}) {


  if (!searchParams.id) notFound();

  const { message, imageUrl, proportion } = await getImageUrlById(
    searchParams.id,
  );



  return (
    <div className="mt-10">
      <Link href={"upload"} className="flex items-center gap-4">
        <IoArrowBackCircleOutline className="text-4xl" />
        <span className="text-2xl">Back</span>
      </Link>
      <CheckOnPhone
        configId={searchParams.id}
        imageUrl={imageUrl}
        proportion={proportion!}
      />
    </div>
  );
}
