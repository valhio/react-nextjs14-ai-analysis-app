"use client";

import Image from "next/image";
import AuthForm from "./components/AuthForm";
import { useState } from "react";

type Variant = "LOGIN" | "REGISTER" | "FORGOT_PASSWORD";

export default function Page() {
  const [selectedVariant, setSelectedVariant] = useState<Variant>("LOGIN");

  return (
    <div className="flex min-h-full flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* <Image
          src="/images/logo.png"
          alt="RilaTalks"
          width={48}
          height={48}
          className="mx-auto w-auto"></Image> */}

        {/* App Title */}
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-gray-900">
            DocAI
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            DocAI is a document interpretation tool that uses AI to extract data from documents.
          </p>
        </div>

        {/* Sign in Section */}
        <div className="mt-12 sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-extrabold tracking-tight text-gray-900">
            {selectedVariant === "LOGIN" && "Sign in to your account"}
            {selectedVariant === "REGISTER" && "Create your account"}
          </h2>
        </div>

        {/* Auth Form */}
        <AuthForm setSelectedVariant={setSelectedVariant} />
      </div>
    </div>
  );
}
