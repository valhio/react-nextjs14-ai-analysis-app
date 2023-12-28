"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/Button";
import { ArrowRight } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import getSession from "@/actions/getSession";
const Navbar = () => {
  const session = useSession();

  const handleSignOut = () => {
    signOut({ 
      callbackUrl: `${window.location.origin}/sign-in`,
     });        
  }

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            DocAI
          </Link>

          <div className="hidden items-center space-x-4 sm:flex">
            <>
              <Link
                href="/pricing"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                  className: "",
                })}>
                Pricing
              </Link>
              {session.data?.user ? (
                <Link
                  href="/sign-in"
                  onClick={handleSignOut}
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                    className: "",
                  })}>
                  Sign out
                </Link>
              ) : (
                <Link
                  href="/sign-in"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                    className: "",
                  })}>
                  Sign in
                </Link>
              )}
            </>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
