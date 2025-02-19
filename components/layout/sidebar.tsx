"use client"

import Link from "next/link"
import { Home, GitBranch, Settings, Book, BarChart } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

const sidebarItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Projects", href: "/projects", icon: GitBranch },
  { name: "Analytics", href: "/analytics", icon: BarChart },
  { name: "Documentation", href: "/docs", icon: Book },
  { name: "Settings", href: "/settings", icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {sidebarItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    pathname === item.href
                      ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                  )}
                >
                  <item.icon
                    className={cn(
                      pathname === item.href
                        ? "text-gray-500 dark:text-gray-300"
                        : "text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300",
                      "mr-3 flex-shrink-0 h-6 w-6",
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

