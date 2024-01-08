"use client";

import PdfDocument from "./PdfDocument";

interface PdfRendererProps {
  url: string;
}

const PdfRenderer = ({ url }: PdfRendererProps) => {
  return (
    <div className="w-full bg-white rounded-md shadow flex flex-col items-center">
      <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-4">
        <div className="flex items-center gap-1.5">top bar</div>
      </div>

      <div className="flex-1 w-full max-h-screen">
          <PdfDocument url={url} pageNumber={1} />
      </div>
    </div>
  );
};

export default PdfRenderer;
