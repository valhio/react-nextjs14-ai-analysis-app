import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import { useResizeDetector } from "react-resize-detector";
import SimpleBar from "simplebar-react";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfDocumentProps {
  url: string;
  pageNumber: number;
  zoom?: number;
  scale?: number;
  rotate?: number;
  rotation?: number;
  setNumPages: (numPages: number) => void;
}

const PdfDocument = ({
  url,
  pageNumber,
  setNumPages,
  scale,
  rotation
}: PdfDocumentProps) => {
  const { toast } = useToast();
  const { width, ref } = useResizeDetector();

  return (
    // The purpose of SimpleBar is to ensure that the PDF never gets bigger than it can be displayed. This is because the PDF is rendered as an SVG, which can be very large, and can cause performance issues or even crashes if it gets too big. Also, in the main layout, import "simplebar-react/dist/simplebar.min.css";
    <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]">
      <div ref={ref}>
        <Document
          loading={
            <div className="flex justify-center">
              <Loader2 className="my-24 w-8 h-8 animate-spin text-zinc-500" />
            </div>
          }
          onLoadError={() => {
            toast({
              title: "Error loading PDF",
              description:
                "Failed to load PDF document. Please try again, or contact support if the problem persists.",
              variant: "destructive",
            });
          }}
          onLoadSuccess={({ numPages }) => {
            // destructure numPages from the document
            setNumPages(numPages);
          }}
          file={url}
          className={"max-h-full"}>
          <Page
            width={width ? width : 1}
            pageNumber={pageNumber}
            scale={scale ? scale : 1}
            rotate={rotation ? rotation : 0}
          />
        </Document>
      </div>
    </SimpleBar>
  );
};

export default PdfDocument;
