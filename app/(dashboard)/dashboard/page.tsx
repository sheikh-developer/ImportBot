"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToken } from "@/components/providers/token-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GitBranch, GitCommit, GitPullRequest } from "lucide-react"

export default function DashboardPage() {
  const { token, validateToken } = useToken()
  const router = useRouter()

  useEffect(() => {
    const checkToken = async () => {
      const isValid = await validateToken()
      if (!isValid) {
        router.push("/")
      }
    }
    checkToken()
  }, [validateToken, router])

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GitCommit className="mr-2 h-4 w-4" />
              Recent Commits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Update README.md</span>
                <span className="text-sm text-muted-foreground">2h ago</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Fix login bug</span>
                <span className="text-sm text-muted-foreground">5h ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GitBranch className="mr-2 h-4 w-4" />
              Active Branches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>feature/user-auth</span>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
              <div className="flex justify-between items-center">
                <span>fix/api-response</span>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </div>
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
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Add user settings</span>
                <span className="text-sm text-green-500">Open</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Update dependencies</span>
                <span className="text-sm text-yellow-500">Review</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

