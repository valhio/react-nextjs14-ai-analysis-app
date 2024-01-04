"use client";

import { redirect } from "next/navigation";
import { Document, Page, pdfjs } from "react-pdf";

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfRendererProps {
  url: string
}

const PdfRenderer = ({
  url
}: PdfRendererProps) => {
  return (
    <div>
      <h1>PDF Renderer</h1>
      <Document file={url}>
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default PdfRenderer;
