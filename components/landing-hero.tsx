import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LandingHero() {
  return (
    <section className="py-20 text-center">
      <h1 className="text-5xl font-bold mb-6 text-gradient">Welcome to ImportBot</h1>
      <p className="text-xl mb-8 max-w-2xl mx-auto">
        Seamlessly import your projects from various sources and manage your repositories with ease.
      </p>
      <div className="flex justify-center space-x-4">
        <Button asChild>
          <Link href="#import">Start Importing</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/history">View Import History</Link>
        </Button>
      </div>
    </section>
  )
}

