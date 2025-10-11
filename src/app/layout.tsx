import type React from "react"
import type { Metadata } from "next"
import AppProvider from "@/components/ServerProvider";

export const metadata: Metadata = {
  title: "Kaitab",
  description: "A modern way to learn and share books",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
