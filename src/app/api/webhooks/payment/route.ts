import ReceivedOrderEmail from "@/components/ReceivedOrderEmail";
import { db } from "@/db";
import { NextApiResponse } from "next";
import { Resend } from "resend";
const crypto = require("crypto");

const resend = new Resend(process.env.EMAIL_SERVER_API_KEY);

export const POST = async (req: Request, res: NextApiResponse) => {
  try {
    // FIXME: webhook request have different formate of request body, headers, signature.

    // !! this is for incoming form webhook request made you razorpay.
    //   const {
    //     payload: {
    //       order: { entity },
    //     },
    //   } = await req.json();
    //   const jsonBody = JSON.stringify(req.body);

    //   const valid = validateWebhookSignature(
    //     JSON.stringify(req.body),
    //     req.headers.get("x-razorpay-signature")!,
    //     '12345678',
    //   );
    //   console.log(JSON.stringify(req.body));

    //   if (valid) {
    //     const order: Order = await db.order.update({
    //       where: {
    //         id: entity.id,
    //       },
    //       data: {
    //         isPaid: true,
    //       },
    //     });

    //     if (!order) return new Response(`Not able to update order in database update it payment is being made ${entity.id}.`, { status: 500 });

    //     console.log("🚀 ~ file: route.ts:49 ~ POST ~ valid:", valid);
    //     return new Response("OK", {
    //       status: 200,
    //     });
    //   }

    //   return new Response(`Failed to verify signature`, { status: 500 });
    // } catch (error) {
    //   console.log(error);
    //   return new Response(`Failed to verify signature ${error}`, { status: 500 });
    // }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();

    const details = razorpay_order_id + "|" + razorpay_payment_id;

    const hmac = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(details.toString());

    const generated_signature = hmac.digest("hex");

    if (generated_signature === razorpay_signature) {
      const orderUpdated = await db.order.update({
        where: {
          id: razorpay_order_id,
        },
        data: {
          isPaid: true,
        },
      });

      const order = await db.order.findFirst({
        where: {
          id: orderUpdated.id,
        },
        include: {
          user: true,
        },
      });

      if (!orderUpdated) {
        throw new Error(
          "Something went wrong while updating the order at verification stage.",
        );
      }

      if (!order) {
        throw new Error(
          "Something went wrong while updating the order at verification stage.",
        );
      }

      // TODO: SEND Mail to the user

      await resend.emails.send({
        from: "CaseCobra <onboarding@resend.dev>",
        // to: order.user.email,
        to: "icodelife307@gmail.com",
        subject: "You Have A New Order",
        react: ReceivedOrderEmail({
          orderDate: order.updatedAt,
          orderId: order.id,
        }),
      });

      return new Response("OK", {
        status: 200,
      });
    }
  } catch (error) {
    return new Response("Failed", {
      status: 500,
    });
  }
};
