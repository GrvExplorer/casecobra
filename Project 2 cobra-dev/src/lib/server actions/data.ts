import { db } from "@/db";
import { currentUser } from "@clerk/nextjs/server";

export async function getConfigureById({ configId }: { configId: string }) {
  try {
    const configuration = await db.configuration.findUnique({
      where: {
        Qid: configId,
      },
    });

    if (!configuration) {
      throw new Error("No such configuration found");
    }

    const user = currentUser();
    if (!user) {
      throw new Error("You need to be logged in");
    }

    const { finish, material } = configuration;
  } catch (error) {
    console.log(error);
  }
}
