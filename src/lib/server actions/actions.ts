"use server";

import { BASE_PRICE, PRODUCT_PRICES } from "@/config/product";
import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";
import {
  CaseColor,
  CaseFinish,
  CaseMaterial,
  Order,
  PhoneModel,
} from "@prisma/client";
import { revalidatePath } from "next/cache";
import Razorpay from "razorpay";

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
    where: { Qid: configId },
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
        Qid: configId,
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
          userId: user.id,
          configurationId: configId,
        },
      });
    }

    const inst = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID || "",
      key_secret: process.env.RAZORPAY_SECRET || "",
    });

    const createdOrder = await inst.orders.create({
      amount: order.amount,
      currency: "INR",
      receipt: order.id,
      notes: {
        key1: "value3",
        key2: "value2",
      },
    });
    console.log("🚀 ~ file: actions.ts:97 ~ paymentSession ~ createdOrder:", createdOrder)


    if (!createdOrder) {
      return undefined;
      throw new Error("Something went wrong while creating the order");
    }

    return { createdOrder};
  } catch (error) {
    console.log("🚀 ~ file: actions.ts:142 ~ paymentSession ~ error:", error);
  }
}

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
