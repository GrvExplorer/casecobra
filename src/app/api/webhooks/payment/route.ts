import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils";

export const POST = async (req: Request, res: Response) => {
  try {
    // FIXME: webhook request have different formate of request body, headers, signature.

    const valid = validateWebhookSignature(
      JSON.stringify(req.body),
      req.headers.get("razorpay-signature")!,
      process.env.RAZORPAY_KEY_SECRET!,
    );

    // const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    //   await req.json();

    // const details = razorpay_order_id + "|" + razorpay_payment_id;
    // console.log("🚀 ~ file: route.ts:9 ~ POST ~ details:", details)

    // const crypto = require("crypto");
    // const hmac = crypto
    //   .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    //   .update(details.toString());

    // const generated_signature = hmac.digest("hex");

    // if (generated_signature === razorpay_signature) {
    //   const order = await db.order.update({
    //     where: {
    //       id: razorpay_order_id,
    //     },
    //     data: {
    //       isPaid: true,
    //     },
    //   });

    //   if (!order) {
    //     throw new Error("Something went wrong while updating the order at verification stage.");
    //   }

    //   // TODO: SEND Mail to the user

    //   return new Response('OK', {
    //     status: 200,
    //   });
    // }

    if (valid) {
      console.log("🚀 ~ file: route.ts:49 ~ POST ~ valid:", valid);
      return new Response("OK", {
        status: 200,
      });
    }

    return new Response(`Failed to verify signature`, { status: 500 });
  } catch (error) {
    console.log(error);
    return new Response(`Failed to verify signature ${error}`, { status: 500 });
  }
};