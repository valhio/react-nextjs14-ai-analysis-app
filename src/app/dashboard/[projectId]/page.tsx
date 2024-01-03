import getFileById from "@/actions/getFileById";
import getSession from "@/actions/getSession";
import { File } from "@prisma/client";
import { notFound } from "next/navigation";
import PdfRenderer from "./components/PdfRenderer";
import ChatWrapper from "./components/ChatWrapper";

interface PageProps {
  params: {
    projectId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { projectId } = params;

  const file = await getFileById(projectId);

  if (!file) notFound();

  return (
    <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
        {/* Left Side */}
        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            <PdfRenderer />
          </div>
        </div>

        {/* Right Side */}
        <div className="shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
          <ChatWrapper />
        </div>
      </div>
    </div>
  );
};

export default Page;
