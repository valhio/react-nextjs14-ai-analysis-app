import { Button } from "@/components/ui/Button";
import { RotateCw, RotateCwIcon } from "lucide-react";

interface RotationControlsProps {
  setRotation: React.Dispatch<React.SetStateAction<number>>;
}

const RotationControls: React.FC<RotationControlsProps> = ({
  setRotation,
}) => {
    return (
        <Button
        onClick={() => setRotation((prev) => prev + 90)}
        variant='ghost'
        aria-label='rotate 90 degrees'>
        <RotateCw className='h-4 w-4' />
      </Button>
    )
};

export default RotationControls;
