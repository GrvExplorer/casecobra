"use server";

import { BASE_PRICE, PRODUCT_PRICES } from "@/config/product";
import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import {
  CaseColor,
  CaseFinish,
  CaseMaterial,
  Order,
  OrderStatus,
  PhoneModel,
} from "@prisma/client";
import { revalidatePath } from "next/cache";
import Razorpay from "razorpay";

export async function getAuthStatus() {
  try {
    const user = await currentUser();
    if (!user) throw new Error("user not logged in");

    const userAtDBExists = await db.user.findFirst({
      where: {
        id: user.id,
      },
    });

    if (!userAtDBExists) {
      await db.user.create({
        data: {
          id: user.id,
          email: user.emailAddresses[0].emailAddress,
        },
      });
    }

    return { success: true };
  } catch (error) {
    console.error(error);
  }
}

export async function revalidateAtClient(path: string) {
  revalidatePath(path, "page");
}

export type SaveConfigArgs = {
  color: CaseColor;
  finish: CaseFinish;
  material: CaseMaterial;
  model: PhoneModel;
  configId: string;
};

export async function saveConfig({
  color,
  finish,
  material,
  model,
  configId,
}: SaveConfigArgs) {
  console.log(configId);
  const updated = await db.configuration.update({
    where: { id: configId },
    data: { color, finish, material, model },
  });
  if (!updated) {
    return;
  }
  return { configId: configId };
}

export async function paymentSession({ configId }: { configId: string }) {
  try {
    const user = await currentUser();
    if (!user) {
      throw new Error("You need to be logged in");
    }

    const configuration = await db.configuration.findUnique({
      where: {
        id: configId,
      },
    });
    if (!configuration) {
      throw new Error("No such configuration found");
    }
    const { finish, material } = configuration;
    let totalPrice = BASE_PRICE;
    if (finish === "textured") totalPrice += PRODUCT_PRICES.finish.textured;
    if (material === "polycarbonate")
      totalPrice += PRODUCT_PRICES.material.polycarbonate;

    let order: Order | undefined;

    const existsOrder = await db.order.findFirst({
      where: {
        configurationId: configId,
        userId: user.id,
      },
    });
    if (existsOrder) {
      order = existsOrder;
    } else {
      order = await db.order.create({
        data: {
          amount: totalPrice / 10,
          configurationId: configId,
          userId: user.id,
        },
      });
      console.log("🚀 ~ file: actions.ts:111 ~ paymentSession ~ order:", order);
    }

    const inst = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    if (process.env.NODE_ENV !== "production") {
      if (existsOrder) {
        const orderOnRazorpay = await inst.orders.fetch(order.id);
        if (!orderOnRazorpay) {
          throw new Error("Something went wrong while fetching the order");
        }
        console.log(
          "🚀 ~ file: actions.ts:91 ~ paymentSession ~ orderOnRazorpay: order already exists",
          orderOnRazorpay,
        );
        return { createdOrder: orderOnRazorpay };
      }
    }

    const createdOrder = await inst.orders.create({
      amount: order.amount ,
      currency: "INR",
      receipt: order.id,
      notes: {
        orderId: order.id,
        userId: user.id,
      },
    });

    order = await db.order.update({
      where: {
        id: order.id,
      },
      data: {
        id: createdOrder.id,
      },
    });

    console.log(
      "🚀 ~ file: actions.ts:97 ~ paymentSession ~ createdOrder:",
      createdOrder,
    );

    if (!createdOrder) {
      throw new Error("Something went wrong while creating the order");
    }

    return { createdOrder };
  } catch (error) {
    console.log("🚀 ~ file: actions.ts ~ paymentSession ~ error:", error);
  }
}

export const getPaymentStatus = async (orderId: string) => {
  const user = await currentUser();

  if (!user)
    throw new Error("Unauthorized you need to login first to see this page");

  const order = await db.order.findFirst({
    where: {
      id: orderId,
      userId: user.id,
    },
    include: {
      configuration: true,
      user: true,
      billingAddress: true,
      shippingAddress: true,
    },
  });

  if (!order) throw new Error("Order not found");

  if (order.isPaid) {
    return order;
  } else {
    return false;
  }
};

export const changeOrderStatus = async ({
  orderId,
  status,
}: {
  orderId: string;
  status: OrderStatus;
}) => {
  const order = await db.order.update({
    where: {
      id: orderId,
    },
    data: {
      status,
    },
  });
  if (!order) {
    throw new Error("Something went wrong while changing the order status");
  }

  return order.status as OrderStatus;
};
