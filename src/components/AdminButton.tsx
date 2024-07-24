"use client";

const dynamic = "force-dynamic";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

function AdminButton() {
  const { user } = useUser();
  console.log("🚀 ~ file: AdminButton.tsx:9 ~ AdminButton ~ user:", user);

  const router = useRouter();

  const isAdmin =
    user?.emailAddresses[0].emailAddress === process.env.ADMIN_EMAIL;

  if (!isAdmin) return;

  return (
    <>
      <Button onClick={() => router.push("/admin")} variant={"outline"}>
        Admin
      </Button>
    </>
  );
}

export default AdminButton;
