import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GitBranch, GitCommit, GitPullRequest } from "lucide-react"
import Link from "next/link"

const projects = [
  { id: 1, name: "Project A", description: "A sample project", commits: 120, branches: 3, pullRequests: 2 },
  { id: 2, name: "Project B", description: "Another sample project", commits: 85, branches: 2, pullRequests: 1 },
  { id: 3, name: "Project C", description: "Yet another sample project", commits: 200, branches: 4, pullRequests: 3 },
]

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button asChild>
          <Link href="/import">Import New Project</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
              <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center">
                  <GitCommit className="mr-1 h-4 w-4" />
                  {project.commits} commits
                </span>
                <span className="flex items-center">
                  <GitBranch className="mr-1 h-4 w-4" />
                  {project.branches} branches
                </span>
                <span className="flex items-center">
                  <GitPullRequest className="mr-1 h-4 w-4" />
                  {project.pullRequests} PRs
                </span>
              </div>
              <Button asChild variant="outline" className="w-full mt-4">
                <Link href={`/projects/${project.id}`}>View Project</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

