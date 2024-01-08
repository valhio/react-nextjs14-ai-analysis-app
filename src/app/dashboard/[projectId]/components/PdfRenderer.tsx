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

interface PdfRendererProps {
  url: string;
}

const PdfRenderer = ({ url }: PdfRendererProps) => {
  const [numPages, setNumPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [zoom, setZoom] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [rotate, setRotate] = useState<number>(0);
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
      <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-4">
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            aria-label="previous page"
            className="p-2"
            disabled={currentPage <= 1 || numPages === undefined}
            onClick={() => {
              setCurrentPage((prev) => (prev - 1 < 1 ? 1 : prev - 1));
            }}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1.5">
            <Input
              {...register("page")}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // handleSubmit((data) => {
                  //   setCurrentPage(Number(data.page));
                  // })();
                  handleSubmit(handlePageSubmit)();
                }
              }}
              className={cn("w-12 h-8",errors.page && "focus-visible:ring-red-500")}
            />
            <p className="text-zinc-700 text-sm space-x-1">
              <span>/</span>
              <span>
                {numPages ?? (
                  <span className="animate-pulse text-zinc-700 text-xl ">
                    ...
                  </span>
                )}
              </span>
            </p>
          </div>
          <Button
            variant="ghost"
            aria-label="next page"
            className="p-2"
            disabled={currentPage === numPages || !numPages}
            onClick={() => {
              setCurrentPage((prev) =>
                prev + 1 > numPages! ? numPages! : prev + 1
              );
            }}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 w-full max-h-screen">
        <PdfDocument
          url={url}
          pageNumber={currentPage}
          setNumPages={setNumPages}
        />
      </div>
    </div>
  );
};

export default PdfRenderer;
