"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { Octokit } from "@octokit/rest"

type TrendingRepo = {
  name: string
  fullName: string
  description: string
  stars: number
  forks: number
  language: string
  url: string
}

export default function TrendingRepositories({ githubToken }: { githubToken: string }) {
  const [trendingRepos, setTrendingRepos] = useState<TrendingRepo[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTrendingRepos = async () => {
      const octokit = new Octokit({ auth: githubToken })

      try {
        const { data: trending } = await octokit.search.repos({
          q: "stars:>1000",
          sort: "stars",
          order: "desc",
          per_page: 10,
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
        console.error("Error fetching trending repositories:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrendingRepos()
  }, [githubToken])

  if (isLoading) {
    return <div>Loading trending repositories...</div>
  }

  return (
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
  )
}

