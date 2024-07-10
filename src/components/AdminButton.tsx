"use client";
import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

function AdminButton() {
  const { user } = useUser();
  const router = useRouter()

  if (user) {
    const isAdmin =
      user.emailAddresses[0].emailAddress !== process.env.ADMIN_EMAIL;
    if (isAdmin) return;
    
    return <Button onClick={() => router.push('/admin')} variant={"outline"}>Admin</Button>;
  }

  return;
}

export default AdminButton;
