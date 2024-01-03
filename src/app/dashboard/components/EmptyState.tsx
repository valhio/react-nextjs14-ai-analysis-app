import { Ghost } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="mt-16 flex flex-col items-center gap-2">
      <Ghost className="w-8 h-8 text-zinc-800" />
      <h1 className="font-bold text-xl">No projects yet</h1>
      <p className="text-lg">Upload your first project now.</p>
    </div>
  );
};

export default EmptyState;
