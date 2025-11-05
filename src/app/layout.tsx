import type React from "react";
import type { Metadata } from "next";
import ClientProvider from "@/providers/ClientProvider";
import HydrationProvider from "@/providers/HydrationProvider";

// This app needs to read cookies during server-side data fetching (HydrationProvider
// prefetches the current user using server actions that access cookies). That
// prevents static (SSG) rendering for routes. Force the app to be dynamic so Next
// doesn't attempt to statically render pages and raise the DYNAMIC_SERVER_USAGE
// error.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Feedple",
  description: "A modern way to learn and share books",
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
        <HydrationProvider>
          <ClientProvider>{children}</ClientProvider>
        </HydrationProvider>
      </body>
    </html>
  );
}
