"use client";

import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "@/app/_trpc/client";

// This is a wrapper component that will be used to wrap the entire app. It will provide the trpc client and the react-query client to the app. 
const Providers = ({
  children, // if the component only receives children, you can use PropsWithChildren as the type or you can do {children}:{children:ReactNode}
}: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [httpBatchLink({ url: "http://localhost:3000/api/trpc" })],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    </trpc.Provider>
  );
};

export default Providers;
