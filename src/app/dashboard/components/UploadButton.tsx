"use client";

import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import Link from "next/link";
import { useState } from "react";
import HoverTooltip from "./HoverCard";
import HoverCardElement from "./HoverCard";
import Dropzone from "react-dropzone";
import { Cloud, File, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/Progress";
import { useSession } from "next-auth/react";
import { deleteFileFromS3, uploadFileToS3 } from "@/utils/s3";
import prisma from "@/lib/prismadb";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const UploadDropzone = () => {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const { toast } = useToast();

  const session: any = useSession();

  // Simulate a file upload progress
  const startSimulatedProgress = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 95) {
          clearInterval(interval);
          return prevProgress;
        }
        return prevProgress + 5;
      });
    }, 500);

    return interval;
  };

  const { mutate: uploadFile } = trpc.uploadFile.useMutation({
    onSuccess: (res) => {
      toast({
        title: "File uploaded",
        description: "Your file has been uploaded successfully",
      });
      router.push(`/dashboard/${res.id}`);
    },
    onError: (err, file) => {
      toast({
        title: "File upload failed",
        description: "Your file could not be uploaded. If this problem persists, please contact support or try again later.",
        variant: "destructive",
      });
      setIsUploading(false);
      setUploadProgress(0);
      deleteFileFromS3(file.name, session.data?.user?.id); // Delete file from S3
    },
  });

  const handleUpload = async (file: any) => {
    setIsUploading(true);
    setUploadProgress(0);

    // const progressInterval = startSimulatedProgress();

    const fileName = file.name;
    const ownerId = session.data?.user?.id;

    // Upload file to S3 with progress tracking, on success create a new file in the database
    await uploadFileToS3(file, {
      fileName,
      ownerId,
      onProgress: async (percentage) => {
        setUploadProgress(percentage);
      },
      onSuccess: (res) => {
        uploadFile({
          key: ownerId + "/" + fileName,
          name: fileName,
          url: res.Location, // res.Location is the URL of the file on S3
        });
        return res;
      },
      onFail: (error) => {
        toast({
          title: "File upload failed",
          description:
            "Your file could not be uploaded. If this problem persists, please contact support or try again later.",
          variant: "destructive",
        });
        setIsUploading(false);
        setUploadProgress(0);
      },
    });

    // clearInterval(progressInterval);
    setUploadProgress(100);
  };

  return (
    <Dropzone
      multiple={false}
      onDrop={async (acceptedFile) => handleUpload(acceptedFile[0])}>
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className="border h-64 m-4 border-dashed border-gray-300 rounded-lg">
          <div className="flex items-center justify-center h-full w-full">
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Cloud className="h-10 w-10 text-zinc-500 mb-2" />
                <p className="mb-2 text-xs text-zinc-700">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop your PDF file here
                </p>
                <p className="text-xs text-zinc-500">
                  Maximum PDF file size: 4MB
                </p>
              </div>

              {acceptedFiles && acceptedFiles[0] ? (
                <div className="max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
                  <div className="px-3 py-2 h-full grid place-items-center">
                    <File className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="px-3 py-2 h-full text-sm truncate">
                    {acceptedFiles[0].name}
                  </div>
                  {/* File size */}
                  <div className="px-3 py-2 h-full text-sm">
                    {/* If KB display in KB, if MB display in MB and round to 2 decimal point with Math.round(val*100)/100 */}
                    {acceptedFiles[0].size < 1000000
                      ? `${Math.round(acceptedFiles[0].size / 1000)} KB`
                      : `${
                          Math.round((acceptedFiles[0].size / 1000000) * 100) /
                          100
                        } MB`}
                  </div>
                </div>
              ) : null}

              {isUploading ? (
                <div className="w-full mt-4 max-w-xs mx-auto">
                  <Progress
                    indicatorColor={
                      uploadProgress === 100 ? "bg-green-500" : "bg-blue-500"
                    }
                    value={uploadProgress}
                    className="h-1 w-full bg-zinc-200"
                  />
                  {uploadProgress === 100 ? (
                    <div className="flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pt-2">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Redirecting...
                    </div>
                  ) : null}
                </div>
              ) : null}
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  );
};

const UploadButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Upload PDF</Button>
      </DialogTrigger>

      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className="flex flex-row gap-2">
            <span className="text-xl font-semibold">Upload PDF</span>
            <HoverCardElement />
          </DialogTitle>
          <DialogDescription>
            <span className="text-gray-700">
              Upload your PDF document and wait for it to be processed. We will
              notify you when it&apos;s ready.
              <br />
            </span>
          </DialogDescription>
        </DialogHeader>

        <UploadDropzone />

        <DialogFooter>
          <Button type="submit" className="w-full">
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
