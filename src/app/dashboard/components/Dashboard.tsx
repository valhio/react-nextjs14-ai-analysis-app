"use client";

import UploadButton from "./UploadButton";
import { trpc } from "@/app/_trpc/client";
import { useState } from "react";
import LoadingFiles from "./FileLoadingSkeleton";
import EmptyState from "./EmptyState";
import FileList from "./ProjectList";

const Dashboard = () => {
  const [currentlyDeletingFile, setCurrentlyDeletingFile] = useState<string | null>(null);

  const utils = trpc.useUtils(); // The useUtils hook allows us to invalidate the query (getUserFiles) and refetch the data. We can use this hook to refetch the data after deleting a file.

  const { data: files, isLoading } = trpc.getUserFiles.useQuery();

  // useMutation is a hook that returns mutate function. We can use the mutate function to call the mutation function and pass the variables to it, in order to delete the file.
  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => {
      utils.getUserFiles.invalidate(); // Invalidate the getUserFiles query after deleting a file. This will cause the query to refetch the data from the server and update the UI.
    },
    onMutate({ id }) {
      // onMutate is a function that is called before the mutation function is called (right when the button is clicked). We can use this function to update the UI before the mutation function is called.
      setCurrentlyDeletingFile(id);
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
