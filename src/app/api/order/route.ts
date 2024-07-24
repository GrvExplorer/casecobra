import Razorpay from "razorpay";

export const POST = async (req: Request, res: Response) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || "",
      key_secret: process.env.RAZORPAY_SECRET || "",
    });

    const options = await req.json();



    const order = await razorpay.orders.create(options);



    if (!order) {

      throw new Error("Something went wrong while creating the order");

    }


    return new Response(JSON.parse(JSON.stringify(order)), { status: 200 });
  } catch (error) {
    return new Response(`Failed to create order ${error}`, { status: 500 });
  }
};
