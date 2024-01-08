

import { Button } from "@/components/ui/Button";
import { File } from "@prisma/client";
import { format } from "date-fns";
import { Link, Plus, MessageSquare, Loader2, Trash } from "lucide-react";
import { useState } from "react";
import FileListItem from "./ProjectListItem";

interface FileListProps{
    files: {
        id: string;
        name: string;
        avatar: string | null;
        createdAt: string;
        updatedAt: string;
    }[];    
    deleteFile: (id: string) => void;
    currentlyDeletingFile: string | null;
}

const FileList:React.FC<FileListProps> = ({ files, deleteFile, currentlyDeletingFile }) => {
    return (
      <ul className="mt-8 grid gtid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
        {files
          .sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() -
              new Date(a.updatedAt).getTime()
          )
          .map((file) => (
            <FileListItem
              key={file.id}
              file={file}
              deleteFile={deleteFile}
              currentlyDeletingFile={currentlyDeletingFile}
            />
          ))}
      </ul>
    );
  };
  
  export default FileList;