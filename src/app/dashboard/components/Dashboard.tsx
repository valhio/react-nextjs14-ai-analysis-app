"use client";

import { UserRole } from "@/types/enums/UserRole";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import UploadButton from "./UploadButton";
import { trpc } from "@/app/_trpc/client";
import { Ghost, Plus } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "@/components/ui/Button";

const Dashboard = () => {
  const session: any = useSession();

  return (
    <div>
      Dashboard
    </div>
  );
};

export default Dashboard;
