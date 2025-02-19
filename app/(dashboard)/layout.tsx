import type React from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Navbar from "@/components/layout/navbar"
import Sidebar from "@/components/layout/sidebar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const token = cookies().get("github-token")?.value

  if (!token) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">{children}</main>
      </div>
    </div>
  )
}

