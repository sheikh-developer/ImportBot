"use server"

import { Octokit } from "@octokit/rest"
import { cookies } from "next/headers"

type ImportRecord = {
  id: string
  repoName: string
  importType: "zip" | "url" | "git"
  status: "success" | "failure"
  timestamp: string
}

export async function getImportHistory(): Promise<ImportRecord[]> {
  const token = cookies().get("github-token")?.value

  if (!token) {
    throw new Error("Authentication required")
  }

  const octokit = new Octokit({ auth: token })

  try {
    const { data: repos } = await octokit.repos.listForAuthenticatedUser()

    // For demonstration, we'll create import history based on the repos
    // In a real application, you'd fetch this data from your database
    const importHistory = repos.slice(0, 5).map(
      (repo): ImportRecord => ({
        id: repo.id.toString(),
        repoName: repo.name,
        importType: "git",
        status: "success",
        timestamp: repo.created_at,
      }),
    )

    return importHistory
  } catch (error) {
    console.error("Error fetching import history:", error)
    throw new Error("Failed to fetch import history")
  }
}

