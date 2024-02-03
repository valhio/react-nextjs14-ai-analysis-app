import getFileById from "@/actions/getFileById";
import getSession from "@/actions/getSession";
import { notFound, redirect } from "next/navigation";
import PdfRenderer from "./components/PdfRenderer";
import ChatWrapper from "./components/ChatWrapper";
import { getFileUrlFromS3 } from "@/utils/s3/get";
import getCurrentUser from "@/actions/getCurrentUser";

interface PageProps {
  params: {
    projectId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { projectId } = params;

  const user = await getCurrentUser();
  if (!user || !user.id || !user.email) redirect("/");

  const file = await getFileById(projectId);
  if (!file) notFound();
    
  // Can't use user.url because it will throw 403 unauthorized error. This getFileUrlFromS3 function sends a key to the s3 bucket that authorizes the user to access the file. The link that is returned is a temporary link that expires after 5 or 15 minutes(dont remember).
  const fileUrl = await getFileUrlFromS3(file.key, user.id);
  if (!fileUrl) notFound();  

  return (
    <div className="flex-1 justify-between flex flex-col h-[calc(100vh-3.5rem)]">
      <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2">
        {/* Left Side */}
        <div className="flex-1 xl:flex">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            <PdfRenderer url={fileUrl}/>
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
