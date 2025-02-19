import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, GitBranch, GitCommit, GitPullRequest } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GitBranch className="mr-2 h-4 w-4" />
              Recent Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/projects/project-a"
                  className="flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded"
                >
                  <span className="font-medium">Project A</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link
                  href="/projects/project-b"
                  className="flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded"
                >
                  <span className="font-medium">Project B</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </li>
            </ul>
            <Button asChild variant="outline" className="w-full mt-4">
              <Link href="/projects">View All Projects</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GitCommit className="mr-2 h-4 w-4" />
              Recent Commits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span className="font-medium">Update README.md</span>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium">Fix login bug</span>
                <span className="text-sm text-gray-500">5 hours ago</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full mt-4">
              View All Commits
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GitPullRequest className="mr-2 h-4 w-4" />
              Pull Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span className="font-medium">Feature: User Profile</span>
                <span className="text-sm text-green-500">Open</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium">Bugfix: API Response</span>
                <span className="text-sm text-yellow-500">Review</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full mt-4">
              View All PRs
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

