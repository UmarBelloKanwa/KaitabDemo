import type React from "react"
import type { Metadata } from "next"
import AppLayout from "@ui/AppLayout";
import "../styles/globals.css"

export const metadata: Metadata = {
  title: "Character AI Dashboard",
  description: "A modern character AI dashboard with dark theme",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  )
}
