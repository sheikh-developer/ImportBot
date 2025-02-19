"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Octokit } from "@octokit/rest"
import JSZip from "jszip"

export default function UrlImportForm({
  onImportComplete,
  githubToken,
}: { onImportComplete: (message: string) => void; githubToken: string }) {
  const [url, setUrl] = useState("")
  const [repoName, setRepoName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url || !repoName) return

    setIsLoading(true)

    try {
      const octokit = new Octokit({ auth: githubToken })

      // Create a new repository
      const { data: repo } = await octokit.repos.createForAuthenticatedUser({
        name: repoName,
        auto_init: true,
      })

      // Fetch the ZIP file from the URL
      const response = await fetch(url)
      const zipBlob = await response.blob()

      // Read and process the ZIP file
      const zip = new JSZip()
      const contents = await zip.loadAsync(zipBlob)

      // Upload each file to the new repository
      for (const [filename, zipEntry] of Object.entries(contents.files)) {
        if (!zipEntry.dir) {
          const content = await zipEntry.async("text")
          await octokit.repos.createOrUpdateFileContents({
            owner: repo.owner.login,
            repo: repo.name,
            path: filename,
            message: `Add ${filename}`,
            content: Buffer.from(content).toString("base64"),
          })
        }
      }

      onImportComplete(`Successfully imported from ${url} to repository ${repoName}`)
    } catch (error) {
      onImportComplete(`Error importing from ${url}: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="url">Import URL</Label>
        <Input
          id="url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/project.zip"
          required
        />
      </div>
      <div>
        <Label htmlFor="repoName">Repository Name</Label>
        <Input id="repoName" type="text" value={repoName} onChange={(e) => setRepoName(e.target.value)} required />
      </div>
      <Button type="submit" disabled={!url || !repoName || isLoading}>
        {isLoading ? "Importing..." : "Import from URL"}
      </Button>
    </form>
  )
}

