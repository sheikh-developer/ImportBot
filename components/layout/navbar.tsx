"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { GitHubOAuth } from "@/components/github-oauth"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Projects", href: "/projects" },
  { name: "Import", href: "/import" },
  { name: "Install", href: "/install" },
  { name: "Documentation", href: "/docs" },
  { name: "Settings", href: "/settings" },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-full items-center">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-6 h-6">
            <linearGradient
              id="nav-gradient"
              x1="37.087"
              x2="10.76"
              y1="10.967"
              y2="37.294"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#6560fe" />
              <stop offset="1" stopColor="#8251fe" />
            </linearGradient>
            <circle cx="23.924" cy="24.13" r="18.615" fill="url(#nav-gradient)" />
          </svg>
          <span>ImportBot</span>
        </Link>
        <nav className="flex items-center gap-2 ml-6">
          {navItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn("text-sm", pathname === item.href && "bg-muted")}
            >
              <Link href={item.href}>{item.name}</Link>
            </Button>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <GitHubOAuth />
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}

