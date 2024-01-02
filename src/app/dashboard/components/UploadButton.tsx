import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import Link from "next/link";
import { useState } from "react";

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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <span className="text-xl font-semibold">Upload PDF</span>
          </DialogTitle>
          <DialogDescription>
            <span className="text-gray-700">
              Upload your PDF document and wait for it to be processed. We will
              notify you when it&apos;s ready.
            </span>
          </DialogDescription>
        </DialogHeader>

        <input type="file" multiple={false} />

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
