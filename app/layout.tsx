import type React from "react"
import type { Metadata } from "next"
import AppLayout from "@ui/AppLayout";
import "../styles/globals.css"

export const metadata: Metadata = {
  title: "Kaitab",
  description: "A modern way to learn and share books",
  generator: "v0.app",
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
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  )
}
