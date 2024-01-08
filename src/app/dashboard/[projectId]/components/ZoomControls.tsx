import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus, SearchIcon } from "lucide-react";

interface ZoomControlsProps {
  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({ scale, setScale }) => {
  return (
      <DropdownMenu>
        {/* asChild is used to pass the child element to the DropdownMenuTrigger. Otherwise, there will be a hydration error. */}
        <DropdownMenuTrigger asChild>
          <Button className="gap-1.5" variant="ghost" aria-label="zoom">
            <Plus className="h-4 w-4" />
            {/* <SearchIcon className="h-4 w-4" /> */}
            {scale * 100}% {/* Show the current scale as a percentage */}
            <ChevronDown className="h-3 w-3 opacity-50" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem onSelect={() => setScale(1)}>100%</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setScale(1.5)}>150%</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setScale(2)}>200%</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setScale(2.5)}>250%</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  );
};

export default ZoomControls;
