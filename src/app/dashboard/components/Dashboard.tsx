"use client";

import { UserRole } from "@/types/enums/UserRole";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import UploadButton from "./UploadButton";
import { trpc } from "@/app/_trpc/client";
import { Ghost, Plus, MessageSquare, Trash, Loader2 } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

const Dashboard = () => {
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
    onMutate({ id }) {
      // onMutate is a function that is called before the mutation function is called (right when the button is clicked). We can use this function to update the UI before the mutation function is called.
      setCurrentlyDeletingFile(id);
    },
    onSettled() {
      setCurrentlyDeletingFile(null);
    }, // onSettled is a function that is called after the mutation function is called (after the file is deleted). We can use this function to update the UI after the mutation function is called.
  });

  return (
    <main className="mx-auto max-w-7xl sm:p-3 md:p-10">
      <div className="mt-8 flex flex-col items-center justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-3xl text-gray-900">My Projects</h1>
        <UploadButton />
      </div>

      {files && files.length > 0 ? (
        <ul className="mt-8 grid gtid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
          {files
            .sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
            )
            .map((file) => (
              <li
                key={file.id}
                className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg">
                <Link
                  href={`/dashboard/${file.id}`}
                  className="flex flex-col gap-2">
                  <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="truncate text-lg font-medium text-zinc-900">
                          {file.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="px-6 mt-4 grid grid-cols-1 sm:grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
                  <div className="flex items-center text-center gap-2">
                    <Plus className="h-6 w-6" />
                    {format(new Date(file.createdAt), "dd-MMM-yyyy p")}
                  </div>

                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    {/* The amount of questions asked in this project out of the total questions limit. (free tier: 10 questions, paid tier: unlimited) */}
                    <div className="text-xs text-zinc-500">0/10</div>
                  </div>

                  <Button
                    onClick={() => deleteFile({ id: file.id })}
                    size="sm"
                    className="w-full bg-red-50 text-red-600 hover:bg-red-100"
                    variant="destructive">
                    {currentlyDeletingFile === file.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      ) : isLoading ? (
        <Skeleton height={100} className="my-2" count={3} />
      ) : (
        <div className="mt-16 flex flex-col items-center gap-2">
          <Ghost className="w-8 h-8 text-zinc-800" />
          <h1 className="font-bold text-xl">No projects yet</h1>
          <p className="text-lg">Upload your first project now.</p>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
