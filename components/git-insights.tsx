"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Octokit } from "@octokit/rest"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

type InsightData = {
  date: string
  commits: number
  pullRequests: number
  issues: number
}

type TrendingRepo = {
  name: string
  fullName: string
  description: string
  stars: number
  forks: number
  language: string
  url: string
}

export default function GitInsights() {
  const [insightData, setInsightData] = useState<InsightData[]>([])
  const [trendingRepos, setTrendingRepos] = useState<TrendingRepo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchInsights = async () => {
      const githubToken = localStorage.getItem("github-token")
      if (!githubToken) {
        console.error("GitHub token not found")
        setIsLoading(false)
        return
      }

      const octokit = new Octokit({ auth: githubToken })

      try {
        const { data: user } = await octokit.users.getAuthenticated()
        const { data: repos } = await octokit.repos.listForUser({ username: user.login })

        const recentRepo = repos[0]

        const [commits, pullRequests, issues] = await Promise.all([
          octokit.repos.listCommits({ owner: user.login, repo: recentRepo.name }),
          octokit.pulls.list({ owner: user.login, repo: recentRepo.name, state: "all" }),
          octokit.issues.listForRepo({ owner: user.login, repo: recentRepo.name, state: "all" }),
        ])

        const data: InsightData[] = commits.data.slice(0, 7).map((commit, index) => ({
          date: new Date(commit.commit.author?.date || "").toISOString().split("T")[0],
          commits: commits.data.slice(0, index + 1).length,
          pullRequests: pullRequests.data.filter(
            (pr) => new Date(pr.created_at) <= new Date(commit.commit.author?.date || ""),
          ).length,
          issues: issues.data.filter(
            (issue) => new Date(issue.created_at) <= new Date(commit.commit.author?.date || ""),
          ).length,
        }))

        setInsightData(data.reverse())

        // Fetch trending repositories
        const { data: trending } = await octokit.search.repos({
          q: "stars:>1000",
          sort: "stars",
          order: "desc",
          per_page: 5,
        })

        const trendingData: TrendingRepo[] = trending.items.map((repo) => ({
          name: repo.name,
          fullName: repo.full_name,
          description: repo.description || "",
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language || "Unknown",
          url: repo.html_url,
        }))

        setTrendingRepos(trendingData)
      } catch (error) {
        console.error("Error fetching Git insights:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchInsights()
  }, [])

  if (isLoading) {
    return <div>Loading Git insights...</div>
  }

  return (
    <div className="space-y-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Git Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={insightData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="commits" stroke="#8884d8" />
              <Line type="monotone" dataKey="pullRequests" stroke="#82ca9d" />
              <Line type="monotone" dataKey="issues" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Trending Repositories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trendingRepos.map((repo) => (
              <div key={repo.fullName} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="text-lg font-semibold">{repo.name}</h3>
                  <p className="text-sm text-gray-500">{repo.description}</p>
                  <div className="flex space-x-4 mt-2">
                    <span>⭐ {repo.stars}</span>
                    <span>🍴 {repo.forks}</span>
                    <span>{repo.language}</span>
                  </div>
                </div>
                <Button asChild variant="outline">
                  <a href={repo.url} target="_blank" rel="noopener noreferrer">
                    View <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

