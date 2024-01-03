
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@radix-ui/react-hover-card";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";

const HoverCardElement = () => {
  return (
    <HoverCard openDelay={100} closeDelay={300}>
      <HoverCardTrigger asChild>
        <Link
          href="/pricing"
          className=" text-blue-700 underline underline-offset-2 font-semibold text-xs my-auto px-0">
          Upgrade to Premium
        </Link>
      </HoverCardTrigger>
      <HoverCardContent
        side="top"
        align="center"
        className="w-80 bg-white p-3 rounded-lg border text">
        <span className="text-gray-700 text-xs">
          You are currently limited to 5 documents per day and single file with
          a maximum size of 4MB . Upgrade to our{" "}
          <Link
            href="/pricing"
            className="font-semibold text-blue-700 underline underline-offset-2">
            premium plan
          </Link>{" "}
          to get unlimited uploads per day, multiple files upload at once and a
          maximum file size of 10MB.
        </span>
      </HoverCardContent>
    </HoverCard>
  );
};

export default HoverCardElement;
