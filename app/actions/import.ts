"use server"

import { Octokit } from "@octokit/rest"
import { cookies } from "next/headers"

export async function importRepository(repoUrl: string) {
  const token = cookies().get("github-token")?.value

  if (!token) {
    return { error: "Authentication required" }
  }

  const octokit = new Octokit({ auth: token })

  try {
    const [, owner, repo] = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/) || []

    if (!owner || !repo) {
      return { error: "Invalid repository URL" }
    }

    const { data: repoData } = await octokit.repos.get({ owner, repo })

    // For a real import, you might want to fork the repository or perform other actions here
    // This is a simplified version that just returns the repository data

    return {
      name: repoData.name,
      description: repoData.description,
      stars: repoData.stargazers_count,
    }
  } catch (error) {
    console.error("Error importing repository:", error)
    return { error: "Failed to import repository" }
  }
}

