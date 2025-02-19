"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Octokit } from "@octokit/rest"
import { useSocket } from "@/lib/socket-provider"

type AdvancedOptions = {
  isPrivate: boolean
  enableBranchProtection: boolean
  enableDependabot: boolean
}

export default function ThirdPartyGitImportForm({
  onImportComplete,
  githubToken,
  advancedOptions,
}: { onImportComplete: (message: string) => void; githubToken: string; advancedOptions: AdvancedOptions }) {
  const [repoUrl, setRepoUrl] = useState("")
  const [repoName, setRepoName] = useState("")
  const [vcs, setVcs] = useState("git")
  const [isLoading, setIsLoading] = useState(false)
  const socket = useSocket()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!repoUrl || !repoName || !vcs) return

    setIsLoading(true)

    try {
      const octokit = new Octokit({ auth: githubToken })

      // Create a new repository
      const { data: repo } = await octokit.repos.createForAuthenticatedUser({
        name: repoName,
        private: advancedOptions.isPrivate,
        auto_init: false,
      })

      // Start the import process
      const { data: import_data } = await octokit.migrations.startImport({
        owner: repo.owner.login,
        repo: repo.name,
        vcs_url: repoUrl,
        vcs,
      })

      // Emit the import start event
      if (socket) {
        socket.emit("import-start", { import_id: import_data.id, repo: repoName })
      }

      onImportComplete(`Started import for ${repoName} from ${repoUrl}`)

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
    } catch (error) {
      onImportComplete(`Error importing from ${repoUrl}: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="repoUrl">Third-Party Repository URL</Label>
        <Input
          id="repoUrl"
          type="url"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="https://bitbucket.org/user/repo.git"
          required
        />
      </div>
      <div>
        <Label htmlFor="repoName">New Repository Name</Label>
        <Input id="repoName" type="text" value={repoName} onChange={(e) => setRepoName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="vcs">Version Control System</Label>
        <Select value={vcs} onValueChange={setVcs}>
          <SelectTrigger>
            <SelectValue placeholder="Select VCS" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="git">Git</SelectItem>
            <SelectItem value="subversion">Subversion</SelectItem>
            <SelectItem value="mercurial">Mercurial</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" disabled={!repoUrl || !repoName || !vcs || isLoading}>
        {isLoading ? "Importing..." : "Import Repository"}
      </Button>
    </form>
  )
}

