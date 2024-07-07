import { db } from "@/db";
import sharp from "sharp";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ input }) => {
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { configId } = metadata.input;

      // Getting the Height and width form the image
      const image = await fetch(file.url);
      const buffer = await image.arrayBuffer();

      const imageProperties = await sharp(buffer).metadata();

      const { width, height } = imageProperties;

      if (!configId) {
        const configuration = await db.configuration.create({
          data: {
            id: "",
            imageUrl: file.url,
            width: width || 500,
            height: height || 500,
          },
        });
        return { configId: configuration.Qid };
      } else {
        const updateConfiguration = await db.configuration.update({
          where: {
            Qid: configId,
          },
          data: {
            croppedImageUrl: file.url,
          },
        });
        return { configId: updateConfiguration.Qid };
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
