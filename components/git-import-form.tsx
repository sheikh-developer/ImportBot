"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Octokit } from "@octokit/rest"

export default function GitImportForm({
  onImportComplete,
  githubToken,
}: { onImportComplete: (message: string) => void; githubToken: string }) {
  const [gitUrl, setGitUrl] = useState("")
  const [repoName, setRepoName] = useState("")
  const [platform, setPlatform] = useState("github")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!gitUrl || !repoName || !platform) return

    setIsLoading(true)

    try {
      const octokit = new Octokit({ auth: githubToken })

      // Create a new repository
      const { data: repo } = await octokit.repos.createForAuthenticatedUser({
        name: repoName,
        auto_init: false,
      })

      // Import the repository
      await octokit.migrations.startImport({
        owner: repo.owner.login,
        repo: repo.name,
        vcs_url: gitUrl,
        vcs: platform === "github" ? "git" : platform,
      })

      onImportComplete(
        `Successfully started import from ${platform} repository ${gitUrl} to ${repoName}. The import process may take a few minutes to complete.`,
      )
    } catch (error) {
      onImportComplete(`Error importing from ${gitUrl}: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="platform">Git Platform</Label>
        <Select value={platform} onValueChange={setPlatform}>
          <SelectTrigger>
            <SelectValue placeholder="Select Git platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="github">GitHub</SelectItem>
            <SelectItem value="gitlab">GitLab</SelectItem>
            <SelectItem value="bitbucket">Bitbucket</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="gitUrl">Repository URL</Label>
        <Input
          id="gitUrl"
          type="url"
          value={gitUrl}
          onChange={(e) => setGitUrl(e.target.value)}
          placeholder="https://github.com/username/repo.git"
          required
        />
      </div>
      <div>
        <Label htmlFor="repoName">New Repository Name</Label>
        <Input id="repoName" type="text" value={repoName} onChange={(e) => setRepoName(e.target.value)} required />
      </div>
      <Button type="submit" disabled={!gitUrl || !repoName || !platform || isLoading}>
        {isLoading ? "Importing..." : "Import from Git"}
      </Button>
    </form>
  )
}

