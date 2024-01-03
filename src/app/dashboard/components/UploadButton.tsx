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
