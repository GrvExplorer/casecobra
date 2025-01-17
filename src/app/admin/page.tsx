import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Progress } from "@/components/ui/procress";
import { StatusDropdown } from "@/components/ui/status-dropdown";
import { db } from "@/db";
import { formatPrice } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

async function Admin() {
  const current = await currentUser();

  const referer = headers().get("referer");

  // TODO: Check if the user is admin not working properly in production 
  // if (!current) {
  //   return notFound()
  // }

  // if (current.id !== process.env.ADMIN_ID) {
  //   if (!referer) {
  //     return redirect("/");
  //   }
  //   return redirect(referer);
  // }

  // TODO: getting the order based on number of days like for 7d, 30d, 90d ( option to change it )

  const orders = await db.order.findMany({
    where: {
      isPaid: true,
      // gte = greater than
      createdAt: {
        // Means: Greater Than Value ( Todays value is more than yesterday )
        // We get the date of 7days ago form now And Get the all orders from that day
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      shippingAddress: true,
      billingAddress: true,
    },
  });

  const totalPaidAmtOf7d = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)),
      },
    },
    _sum: {
      amount: true,
    },
  });

  const totalPaidAmtOf30d = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
    },
    _sum: {
      amount: true,
    },
  });


  const WEEKLY_GOAL = 500;
  const MONTHLY_GOAL = 2500;

  return (
    <MaxWidthWrapper className={"pt-8 min-h-screen w-full bg-muted/40"}>
      <h1 className="mb-12 text-6xl font-extrabold tracking-tighter">
        Welcome Admin
      </h1>
      <div className="flex flex-col gap-16">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Last Week</CardDescription>
              <CardTitle className="text-4xl">
                {formatPrice(totalPaidAmtOf7d._sum.amount ?? 0 / 100)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                of {formatPrice(WEEKLY_GOAL)} goal
              </div>
            </CardContent>
            <CardFooter>
              <Progress
                value={
                  ((totalPaidAmtOf7d._sum.amount ?? 0) * 100) / WEEKLY_GOAL
                }
              />
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Last Month</CardDescription>
              <CardTitle className="text-4xl">
                {formatPrice(totalPaidAmtOf30d._sum.amount ?? 0)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                of {formatPrice(MONTHLY_GOAL)} goal
              </div>
            </CardContent>
            <CardFooter>
              <Progress
                value={
                  ((totalPaidAmtOf30d._sum.amount ?? 0) * 100) / MONTHLY_GOAL
                }
              />
            </CardFooter>
          </Card>
        </div>

        <h1 className="text-4xl font-bold tracking-tight">Incoming orders</h1>

        <Table>
          <TableCaption>
            <p className="w-full text-end text-sm text-muted-foreground">
              {orders.length} orders
            </p>
          </TableCaption>

          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Order ID</TableHead>
              <TableHead className="text-left">Date</TableHead>
              <TableHead className="text-left hidden sm:table-cell">User Email</TableHead>
              <TableHead className="text-left">Amount</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="text-left">{order.id}</TableCell>
                <TableCell className="text-left">
                  {new Date(order.updatedAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="hidden text-left sm:table-cell">
                  {order.user.email}
                </TableCell>
                <TableCell className="text-left">
                  {formatPrice(order.amount)}
                </TableCell>
                <TableCell className="hidden text-left sm:table-cell">
                  <StatusDropdown
                    orderId={order.id}
                    orderStatus={order.status}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </MaxWidthWrapper>
  );
}

export default Admin;
