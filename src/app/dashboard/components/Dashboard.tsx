"use client";

import UploadButton from "./UploadButton";
import { trpc } from "@/app/_trpc/client";
import { useState } from "react";
import LoadingFiles from "./FileLoadingSkeleton";
import EmptyState from "./EmptyState";
import FileList from "./ProjectList";
import { deleteFileFromS3 } from "@/utils/s3/delete";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const session: any = useSession();
  const { toast } = useToast();

  const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<
    string | null
  >(null);

  const utils = trpc.useUtils(); // The useUtils hook allows us to invalidate the query (getUserFiles) and refetch the data. We can use this hook to refetch the data after deleting a file.

  const { data: files, isLoading } = trpc.getUserFiles.useQuery();

  // useMutation is a hook that returns mutate function. We can use the mutate function to call the mutation function and pass the variables to it, in order to delete the file.
  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => {
      utils.getUserFiles.invalidate(); // Invalidate the getUserFiles query after deleting a file. This will cause the query to refetch the data from the server and update the UI.
    },
    onError: (error) => {
      toast({
        title: "Error while deleting file",
        // description: "Please try again later or contact support.",
        description: error.message,
        variant: "destructive",
      });
    },
    onMutate({ id }) {
      setCurrentlyDeletingFile(id);
      const file = files?.find((file) => file.id === id);
      deleteFileFromS3({
        fileKey: file?.key!,
        ownerId: session?.data?.user?.id!,
        onFail: () => {
          // Tried everything to stop the mutation, when s3 delete fails, but nothing worked. So, I'm just going to let the mutation run and handle the S3 deletion later.
          // TODO: In the database, set a property on the file that indicates that the file should be deleted from S3. Then, create a cron job that runs every 5 minutes and deletes all files that have this property set to true.
        },
      });
    },
    onSettled() {
      // onSettled is a function that is called after the mutation function is called (after the file is deleted). We can use this function to update the UI after the mutation function is called.
      setCurrentlyDeletingFile(null);
    },
  });

  return (
    <main className="mx-auto max-w-7xl p-4 md:p-10">
      <div className="mt-8 flex flex-col items-center justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-3xl text-gray-900">My Projects</h1>
        <UploadButton />
      </div>

      {files && files.length > 0 ? (
        <FileList
          files={files}
          deleteFile={(id: string) => deleteFile({ id })}
          currentlyDeletingFile={currentlyDeletingFile}
        />
      ) : isLoading ? (
        <LoadingFiles />
      ) : (
        <EmptyState />
      )}
    </main>
  );
};

export default Dashboard;
