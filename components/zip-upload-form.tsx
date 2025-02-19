"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Octokit } from "@octokit/rest"
import JSZip from "jszip"

type AdvancedOptions = {
  isPrivate: boolean
  enableBranchProtection: boolean
  enableDependabot: boolean
}

export default function ZipUploadForm({
  onImportComplete,
  githubToken,
  advancedOptions,
}: { onImportComplete: (message: string) => void; githubToken: string; advancedOptions: AdvancedOptions }) {
  const [file, setFile] = useState<File | null>(null)
  const [repoName, setRepoName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !repoName) return

    setIsLoading(true)
    setProgress(0)

    try {
      const octokit = new Octokit({ auth: githubToken })

      // Create a new repository
      const { data: repo } = await octokit.repos.createForAuthenticatedUser({
        name: repoName,
        auto_init: true,
        private: advancedOptions.isPrivate,
      })

      setProgress(20)

      // Read and process the ZIP file
      const zip = new JSZip()
      const contents = await zip.loadAsync(file)

      const totalFiles = Object.keys(contents.files).length
      let processedFiles = 0

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

          processedFiles++
          setProgress(20 + (60 * processedFiles) / totalFiles)
        }
      }

      // Set up branch protection if enabled
      if (advancedOptions.enableBranchProtection) {
        await octokit.repos.updateBranchProtection({
          owner: repo.owner.login,
          repo: repo.name,
          branch: "main",
          required_status_checks: null,
          enforce_admins: true,
          required_pull_request_reviews: null,
          restrictions: null,
        })
      }

      // Set up Dependabot if enabled
      if (advancedOptions.enableDependabot) {
        await octokit.repos.createOrUpdateFileContents({
          owner: repo.owner.login,
          repo: repo.name,
          path: ".github/dependabot.yml",
          message: "Add Dependabot configuration",
          content: Buffer.from(`
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
  `).toString("base64"),
        })
      }

      setProgress(100)
      onImportComplete(`Successfully imported ${file.name} to repository ${repoName}`)
    } catch (error) {
      onImportComplete(`Error importing ${file.name}: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="zipFile">Upload ZIP file</Label>
        <Input id="zipFile" type="file" accept=".zip" onChange={(e) => setFile(e.target.files?.[0] || null)} required />
      </div>
      <div>
        <Label htmlFor="repoName">Repository Name</Label>
        <Input id="repoName" type="text" value={repoName} onChange={(e) => setRepoName(e.target.value)} required />
      </div>
      <Button type="submit" disabled={!file || !repoName || isLoading}>
        {isLoading ? "Importing..." : "Import ZIP"}
      </Button>
      {isLoading && <Progress value={progress} className="w-full" />}
    </form>
  )
}

