import { currentUser } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function Admin() {
  const current = await currentUser();

  const referer = headers().get("referer");

  if (current?.id !== process.env.ADMIN_ID) {
    if (!referer) {
      return redirect("/");
    }
    return redirect(referer);
  }

  return (
    <div>
      <h1 className="text-6xl font-extrabold tracking-tighter">
        Welcome Admin
      </h1>
    </div>
  );
}

export default Admin;
