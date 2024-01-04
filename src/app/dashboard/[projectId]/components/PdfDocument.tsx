import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfDocumentProps {
  url: string;
  pageNumber: number;
  zoom?: number;
  scale?: number;
  rotate?: number;
  // onDocumentLoadSuccess: () => void;
}

const PdfDocument = ({ 
  url, 
  pageNumber,
  // onDocumentLoadSuccess
 }: PdfDocumentProps) => {
  return (
    <Document file={url}>
      <Page pageNumber={pageNumber} />
    </Document>
  );
};

export default PdfDocument;
