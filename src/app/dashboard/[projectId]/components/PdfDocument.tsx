import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import { useResizeDetector } from "react-resize-detector";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfDocumentProps {
  url: string;
  pageNumber: number;
  zoom?: number;
  scale?: number;
  rotate?: number;
  setNumPages: (numPages: number) => void;
}

const PdfDocument = ({ url, pageNumber, setNumPages }: PdfDocumentProps) => {
  const { toast } = useToast();
  const { width, ref } = useResizeDetector();

  return (
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
        onLoadSuccess={({ numPages }) => { // destructure numPages from the document
          setNumPages(numPages);
        }}
        file={url}
        className={"max-h-full"}>
        <Page width={width ? width : 1} pageNumber={pageNumber} />
      </Document>
    </div>
  );
};

export default PdfDocument;
