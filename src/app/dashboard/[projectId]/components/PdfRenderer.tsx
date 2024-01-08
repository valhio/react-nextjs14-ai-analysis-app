"use client";

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import PdfDocument from "./PdfDocument";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import PageControls from "./PageControls";
import ZoomControls from "./ZoomControls";
import RotationControls from "./RotationControls";

interface PdfRendererProps {
  url: string;
}

const PdfRenderer = ({ url }: PdfRendererProps) => {
  const [numPages, setNumPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [showPageControls, setShowPageControls] = useState<boolean>(false);

  const CustomPageValidator = z.object({
    // zod schema for validating the page number. In detail, it must be a number between 1 and the total number of pages. If the user enters input that is not a number, it will be rejected.
    page: z
      .string()
      .refine((val) => Number(val) > 0 && Number(val) <= numPages!),
  });

  type TCustomPageValidator = z.infer<typeof CustomPageValidator>; // Turn the zod schema into a type for use with react-hook-form.

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TCustomPageValidator>({
    defaultValues: {
      page: "1",
    },
    resolver: zodResolver(CustomPageValidator), // what this does is it takes the zod schema and turns it into a resolver for react-hook-form. This is used to validate the input.
  });

  const handlePageSubmit = (data: TCustomPageValidator) => {
    setCurrentPage(Number(data.page));
    setValue("page", String(data.page));
  };

  return (
    <div className="w-full bg-white rounded-md shadow flex flex-col items-center">
      {/* Toolbar for the PDF viewer. It contains buttons for zooming in and out, rotating the page, and showing the page controls. */}
      <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-4">
        {/* Page controls */}
        <PageControls
          currentPage={currentPage}
          numPages={numPages}
          setCurrentPage={setCurrentPage}
          register={register}
          handleSubmit={handleSubmit(handlePageSubmit)}
          errors={errors}
        />

        {/* Zoom controls */}
        <div className="space-x-2">
          <ZoomControls scale={scale} setScale={setScale} />
          <RotationControls setRotation={setRotation} />
        </div>
      </div>

      <div className="flex-1 w-full max-h-screen">
        {/* Document */}
        <PdfDocument
          url={url}
          pageNumber={currentPage}
          setNumPages={setNumPages}
          scale={scale}
          rotation={rotation}
        />
      </div>
    </div>
  );
};

export default PdfRenderer;
