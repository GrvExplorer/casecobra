"use server";

import { BASE_PRICE, PRODUCT_PRICES } from "@/config/product";
import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";

import {
  CaseColor,
  CaseFinish,
  CaseMaterial,
  PhoneModel,
} from "@prisma/client";
import { redirect } from "next/navigation";

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
  redirect(`/configure/preview?id=${configId}`);
}

export async function paymentSession({ configId }: { configId: string }) {
  try {
    const configuration = await db.configuration.findUnique({
      where: {
        Qid: configId,
      },
    });

    if (!configuration) {
      throw new Error("No such configuration found");
    }

    const user = await currentUser();
    if (!user) {
      throw new Error("You need to be logged in");
    }

    const { finish, material } = configuration;

    let totalPrice = BASE_PRICE;
    if (finish === "textured") totalPrice += PRODUCT_PRICES.finish.textured;
    if (material === "polycarbonate")
      totalPrice += PRODUCT_PRICES.material.polycarbonate;

    let order;
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

    // Product Create in razorpay
    // get checkout session in razorpay

    return { url: "" };
  } catch (error) {
    console.log(error);
  }
}
