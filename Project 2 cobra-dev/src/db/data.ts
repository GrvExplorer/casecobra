import { db } from ".";

export async function getImageUrlById(id: string) {
  try {
    const res = await db.configuration.findUnique({
      where: {
        Qid: id,
      },
    });
    if (!res) {
      return {
        message: "some thing went wrong ! try again.",
      };
    }
    return {
      imageUrl: res?.imageUrl,
      message: "Successfully got the image url",
      proportion: {
        width: res.width,
        height: res.height,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      message: "some thing went wrong ! try again",
    };
  }
}
