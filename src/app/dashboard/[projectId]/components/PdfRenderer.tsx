"use client";

import PdfDocument from "./PdfDocument";

interface PdfRendererProps {
  url: string
}

const PdfRenderer = ({
  url
}: PdfRendererProps) => {
  return (
    <div>
      <h1>PDF Renderer</h1>
      <PdfDocument url={url} pageNumber={1}/>
    </div>
  );
};

export default PdfRenderer;
