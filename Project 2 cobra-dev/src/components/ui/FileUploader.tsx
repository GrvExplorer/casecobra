"use client";
import { useUploadThing } from "@/lib/uploadThing";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Button } from "./button";

export default function FileUpload() {
  //TODO: create loading screen while uploading and disable when one uploading is working
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>("");
  const router = useRouter();

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      setFileUrl("");
      setFile([]);
      router.push("/configure/design");
    },
  });

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];
  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
      startUpload(acceptedFiles);
    },
    [startUpload],
  );
  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
    maxSize: 500000,
  });

  const fileRejectedItems = fileRejections.map(({ file, errors }) => (
    <p key={file.name} className="pt-2 font-semibold text-red-600">
      {errors[0].message}
    </p>
  ));

  return (
    <section className="mb-8 mt-40 flex w-full flex-col items-center justify-center">
      <div className="rounded-lg border bg-gray-200 px-8 py-8 shadow-lg lg:p-10">
        <div
          {...getRootProps()}
          className="flex h-[400px] w-[500px] cursor-pointer flex-col items-center justify-center overflow-hidden border border-dashed border-black bg-gray-100 px-4 py-6 md:w-[600px] lg:h-[600px] lg:w-[800px] 2xl:h-[800px] 2xl:w-[1000px]"
        >
          <input {...getInputProps()} />
          {fileUrl ? (
            <Image
              src={fileUrl}
              alt="Uploaded image"
              width={500}
              height={500}
              style={{
                objectFit: "cover",
              }}
            ></Image>
          ) : (
            <div className="text-center">
              <h3 className="text-light-2 mb-1 mt-6 font-medium">
                Drag photo here
              </h3>
              <p className="text-light-4 mb-4 text-sm">SVG, PNG, JPG</p>
              <Button variant={"outline"}>Select from computer</Button>
            </div>
          )}
          {fileRejectedItems}
        </div>
      </div>
      <aside className="flex justify-center pt-4">
        <p className="text-sm ">
          {" "}
          Image {"("}4MB{")"}
        </p>
      </aside>
    </section>
  );
}
