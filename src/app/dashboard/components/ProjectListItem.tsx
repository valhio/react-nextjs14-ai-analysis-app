import { Button } from "@/components/ui/Button";
import { File } from "@prisma/client";
import { format } from "date-fns";
import { Loader2, MessageSquare, Plus, Trash } from "lucide-react";
import Link from "next/link";

interface FileListItemProps {
  file: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  }
  deleteFile: (id: string) => void;
  currentlyDeletingFile: string | null;
}

const FileListItem: React.FC<FileListItemProps> = ({
  file,
  deleteFile,
  currentlyDeletingFile,
}) => {
  return (
    <li
      key={file.id}
      className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg">
      <Link href={`/dashboard/${file.id}`} className="flex flex-col gap-2">
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
          onClick={() => deleteFile(file.id)}
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
  );
};

export default FileListItem;
