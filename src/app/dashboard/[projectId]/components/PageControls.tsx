import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { UseFormSetValue } from 'react-hook-form';

interface PageControlsProps {
  currentPage: number;
  numPages: number | undefined;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  setValue: UseFormSetValue<{"page": string}>; 
  register: any; // Adjust the type based on your actual implementation
  handleSubmit: () => void;
  errors: any; // Adjust the type based on your actual implementation
}

const PageControls: React.FC<PageControlsProps> = ({
  currentPage,
  numPages,
  setCurrentPage,
  setValue,
  register,
  handleSubmit,
  errors,
}) => {
  return (
    <div className="flex items-center gap-1.5">
      {/* Button for previous page */}
      <Button
        variant="ghost"
        aria-label="previous page"
        className="p-2"
        disabled={currentPage <= 1 || numPages === undefined}
        onClick={() => {
          setCurrentPage((prev) => (prev - 1 < 1 ? 1 : prev - 1));
          setValue('page', String(currentPage - 1));
        }}>
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Input for page number */}
      <div className="flex items-center gap-1.5">
        <Input
          {...register('page')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
          className={cn('w-12 h-8', errors.page && 'focus-visible:ring-red-500')}
        />
        <p className="text-zinc-700 text-sm space-x-1">
          <span>/</span>
          <span>
            {numPages ?? (
              <span className="animate-pulse text-zinc-700 text-xl ">...</span>
            )}
          </span>
        </p>
      </div>

      {/* Button for next page */}
      <Button
        variant="ghost"
        aria-label="next page"
        className="p-2"
        disabled={currentPage === numPages || !numPages}
        onClick={() => {
          setCurrentPage((prev) =>
            prev + 1 > numPages! ? numPages! : prev + 1
          );
          setValue('page', String(currentPage + 1));
        }}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default PageControls;
