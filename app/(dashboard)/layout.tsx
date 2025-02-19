import type React from "react"
import Navbar from "@/components/layout/navbar"
import Sidebar from "@/components/layout/sidebar"
import { TokenProvider } from "@/components/providers/token-provider"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TokenProvider>
      <div className="min-h-screen">
        <Navbar />
        <div className="flex h-[calc(100vh-4rem)]">
          <Sidebar />
          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">{children}</main>
        </div>
      </div>
    </TokenProvider>
  )
}

