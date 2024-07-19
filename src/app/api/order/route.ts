import Razorpay from "razorpay";

export const POST = async (req: Request, res: Response) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || "",
      key_secret: process.env.RAZORPAY_SECRET || "",
    });

    const options = await req.json();
    console.log("🚀 ~ file: route.ts:11 ~ POST ~ options:", options)


    const order = await razorpay.orders.create(options);
    console.log("🚀 ~ file: route.ts:14 ~ POST ~ order:", order)


    if (!order) {
      console.log("🚀 ~ file: route.ts:14 ~ POST ~ order:", order)
      throw new Error("Something went wrong while creating the order");

    }


    return new Response(JSON.parse(JSON.stringify(order)), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(`Failed to create order ${error}`, { status: 500 });
  }
};
