import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ProjectCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          <li>
            <div className="flex justify-between items-center">
              <span className="font-medium">Project A</span>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/projects/project-a">
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </li>
          <li>
            <div className="flex justify-between items-center">
              <span className="font-medium">Project B</span>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/projects/project-b">
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}

