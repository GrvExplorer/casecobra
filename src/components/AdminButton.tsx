"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";

function AdminButton() {
  const { user } = useUser();

  const isAdmin =
    user?.emailAddresses[0].emailAddress === process.env.ADMIN_EMAIL;

  if (!isAdmin) return null;

  return (
    <li>
      <Button variant={"outline"}>Admin</Button>
    </li>
  );
}

export default AdminButton;
