import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  File as FileIcon,
  Loader2,
  MessageSquare,
  Plus,
  Trash,
} from "lucide-react";
import Link from "next/link";

interface FileListItemProps {
  file: {
    id: string;
    name: string;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
  deleteFile: (id: string) => void;
  currentlyDeletingFile: string | null;
}

const FileListItem: React.FC<FileListItemProps> = ({
  file,
  deleteFile,
  currentlyDeletingFile,
}) => {
  const isFileNew =
    new Date(file.createdAt) > new Date(Date.now() - 1000 * 60 * 60 * 24 * 1); // If the file was created in the last 24 hours, it's new. The *1 is to convert milliseconds to days. (*1 = 1 day, *2 = 2 days, etc.)

  return (
    <li
      key={file.id}
      className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg">
      <Link href={`/dashboard/${file.id}`} className="flex flex-col gap-2">
        <div className="p-4 flex w-full items-center justify-between space-x-6">
          <div
            className={cn(
              "h-14 w-14 flex items-center justify-center flex-shrink-0 rounded-full relative",
              file.avatar || "bg-gradient-to-r from-zinc-500 to-zinc-600"
            )}>
            <FileIcon className="h-5 w-5 text-white" />
            {isFileNew && (
              <span
                className={cn(
                  "absolute -top-2 -right-6 text-[10px] font-medium text-white bg-zinc-800 px-2 py-1 rounded-full border-[2px] border-white",
                  file.avatar
                )}>
                New
              </span>
            )}
          </div>
          <div className="flex-1 truncate">
            <div className="flex items-center space-x-3">
              <div className="flex flex-col items-start">
                <h3 className="truncate text-lg font-medium text-zinc-900">
                  {file.name}
                </h3>
                <h3 className="truncate text-sm text-zinc-500">
                  No description available
                </h3>
              </div>
            </div>
          </div>
        </div>
      </Link>

      <div className="px-6 grid grid-cols-1 sm:grid-cols-3 place-items-center py-2 gap-2 sm:gap-6 text-xs text-zinc-500">
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
