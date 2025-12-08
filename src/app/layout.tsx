import type React from "react";
import type { Metadata } from "next";
import UserProvider from "@/providers/UserProvider";
import Providers from "@/providers/Providers";
import RouterLoadingListener from "./loader";
import "./global.scss";
// This app needs to read cookies during server-side data fetching (HydrationProvider
// prefetches the current user using server actions that access cookies). That
// prevents static (SSG) rendering for routes. Force the app to be dynamic so Next
// doesn't attempt to statically render pages and raise the DYNAMIC_SERVER_USAGE
// error.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Feedple",
  description: "A social platform to share ideas while training your digital mind.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <UserProvider>
            <RouterLoadingListener/>
            {children}
          </UserProvider>
        </Providers>
      </body>
    </html>
  );
}
