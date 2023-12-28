// What this file does is that it provides the session to the entire app. So, if you want to access the session anywhere in the app, you can just import this context and use the useSession hook to get the session. This is a very common pattern in Next.js apps.
// The session could be used to check if the user is authenticated or not. If the user is authenticated, you can show the user's profile picture and name. If not, you can show the login button.
// Or you can use the session to check if the user is an admin or not. If the user is an admin, you can show the admin dashboard. If not, you can show the user dashboard.
// Restricting access to certain pages is also possible with the session. You can check if the user is authenticated or not. If the user is not authenticated, you can redirect the user to the login page. If the user is authenticated, you can redirect the user to the dashboard/home page.
// And so on.

"use client";

import { Session } from "inspector";
import { SessionProvider } from "next-auth/react";

interface AuthContextProps {
  children: React.ReactNode;
}

export default function AuthContext({ children }: AuthContextProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
