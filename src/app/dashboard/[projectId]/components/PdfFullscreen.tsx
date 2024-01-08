import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent } from "@/components/ui/Dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Expand } from "lucide-react";
import { useState } from "react";
import SimpleBar from "simplebar-react";
import PdfDocument from "./PdfDocument";

interface PdfFullscreenProps {
  url: string;
  numPages: number;
  rotation?: number;
}

const PdfFullscreen = ({ url, numPages, rotation }: PdfFullscreenProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(visability) => {
        if (!visability) {
          setIsOpen(visability);
        }
      }}>
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button variant="ghost" className="gap-1.5" aria-label="full screen">
          <Expand className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-7xl w-full">
        <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)] mt-6">
          <PdfDocument
            url={url}
            renderAllPages={true}
            numPages={numPages}
            rotation={rotation ?? 0}
          />
        </SimpleBar>
      </DialogContent>
    </Dialog>
  );
};

export default PdfFullscreen;
