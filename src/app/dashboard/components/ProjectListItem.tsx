import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
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

  const gradient = getRandomGradient();
  const gradientDirection = getRandomGradientDirection();

  return (
    <li
      key={file.id}
      className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg">
      <Link href={`/dashboard/${file.id}`} className="flex flex-col gap-2">
        <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
          <div className={cn("h-12 w-12 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500", gradient, gradientDirection)} />
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

// Array of gradients to use for the project item avatar:

const gradients = [
  "from-cyan-500 to-blue-500",
  "from-fuchsia-500 to-purple-500",
  "from-rose-500 to-pink-500",
  "from-orange-500 to-amber-500",
  "from-green-500 to-lime-500",
  "from-teal-500 to-cyan-500",
  "from-purple-500 to-rose-500",
  "from-pink-500 to-fuchsia-500",
  "from-amber-500 to-orange-500",
  "from-lime-500 to-green-500",
  "from-cyan-500 to-teal-500",
  "from-rose-500 to-purple-500",
  "from-fuchsia-500 to-pink-500",
  "from-violet-600 to-indigo-600",
  "from-amber-200 to-yellow-400",
  "from-indigo-500 to-blue-500",
  "from-blue-600 to-violet-600",
  "from-neutral-300 to-stone-400",
  "from-red-500 to-orange-500",
  "from-stone-500 to-stone-700",
  "from-violet-200 to-pink-200",
  "from-blue-700 to-indigo-900",
  "from-fuchsia-600 to-purple-600",
  "from-blue-200 to-cyan-200",
  "from-teal-200 to-teal-500",
  "from-fuchsia-600 to-pink-600",
  "from-pink-500 to-rose-500",
  "from-fuchsia-500 via-pink-500 to-rose-500",
  
];

const getRandomGradient = () => {
  return gradients[Math.floor(Math.random() * gradients.length)];
};

const gradientDirection = [
  "bg-gradient-to-r",
  "bg-gradient-to-l",
  "bg-gradient-to-t",
  "bg-gradient-to-b",
  "bg-gradient-to-tr",
  "bg-gradient-to-tl",
  "bg-gradient-to-br",
  "bg-gradient-to-bl"
];

const getRandomGradientDirection = () => {
  return gradientDirection[Math.floor(Math.random() * gradientDirection.length)];
};
