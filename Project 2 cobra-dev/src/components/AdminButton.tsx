"use client";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";

function AdminButton() {
  const { user } = useUser();
  // const [Admin, setAdmin] = useState(false)

  if (user) {
    const isAdmin =
      user.emailAddresses[0].emailAddress !== process.env.ADMIN_EMAIL;
    console.log(user?.emailAddresses[0].emailAddress, isAdmin, process.env.ADMIN_EMAIL);
    return <div>Admin</div>;
  }

  return <div></div>;
}

export default AdminButton;
