import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import Image from "next/image"

export default function Navbar() {
  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between p-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="https://static-00.iconduck.com/assets.00/brand-github-copilot-icon-2048x1775-2h15dc8k.png"
            alt="ImportBot Logo"
            width={40}
            height={40}
          />
          <span className="text-2xl font-bold">ImportBot</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Button asChild variant="ghost">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/install">Install</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/docs">Docs</Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}

