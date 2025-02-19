"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Octokit } from "@octokit/rest"

type SearchResult = {
  id: number
  full_name: string
  description: string
  html_url: string
}

export default function GitSearch({
  onImportComplete,
  githubToken,
}: { onImportComplete: (message: string) => void; githubToken: string }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery) return

    setIsLoading(true)

    try {
      const octokit = new Octokit({ auth: githubToken })
      const response = await octokit.search.repos({
        q: searchQuery,
        sort: "stars",
        order: "desc",
      })

      setSearchResults(response.data.items)
    } catch (error) {
      console.error("Error searching repositories:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImport = async (repo: SearchResult) => {
    try {
      const octokit = new Octokit({ auth: githubToken })
      await octokit.repos.createFork({
        owner: repo.full_name.split("/")[0],
        repo: repo.full_name.split("/")[1],
      })

      onImportComplete(`Successfully forked ${repo.full_name}`)
    } catch (error) {
      onImportComplete(`Error forking ${repo.full_name}: ${error.message}`)
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <Label htmlFor="searchQuery">Search GitHub Repositories</Label>
          <Input
            id="searchQuery"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter search query"
            required
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </form>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {searchResults.map((repo) => (
          <Card key={repo.id} className="card-hover">
            <CardHeader>
              <CardTitle>{repo.full_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{repo.description}</p>
              <div className="flex justify-between">
                <Button asChild variant="outline">
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    View
                  </a>
                </Button>
                <Button onClick={() => handleImport(repo)}>Fork & Import</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

