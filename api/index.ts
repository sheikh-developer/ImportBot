import type { VercelRequest, VercelResponse } from "@vercel/node"
import { Octokit } from "@octokit/rest"

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    const { action, token, repoUrl, data } = req.body

    if (!token) {
      return res.status(400).json({ error: "Missing GitHub token" })
    }

    const octokit = new Octokit({ auth: token })

    try {
      switch (action) {
        case "import":
          return await handleImport(octokit, repoUrl, data, res)
        case "analyze":
          return await handleAnalyze(octokit, repoUrl, res)
        case "deploy":
          return await handleDeploy(octokit, repoUrl, data, res)
        default:
          return res.status(400).json({ error: "Invalid action" })
      }
    } catch (error) {
      console.error("Error:", error)
      return res.status(500).json({ error: "Internal server error" })
    }
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

async function handleImport(octokit: Octokit, repoUrl: string, data: any, res: VercelResponse) {
  // Extract owner and repo from the URL
  const [, owner, repo] = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/) || []

  if (!owner || !repo) {
    return res.status(400).json({ error: "Invalid repository URL" })
  }

  // Create a new repository
  const { data: newRepo } = await octokit.repos.createForAuthenticatedUser({
    name: data.newRepoName || repo,
    private: data.isPrivate || false,
  })

  // Clone the repository
  await octokit.repos.createFork({
    owner,
    repo,
    name: newRepo.name,
    organization: newRepo.owner.login,
  })

  return res.status(200).json({ message: "Repository imported successfully", repo: newRepo })
}

async function handleAnalyze(octokit: Octokit, repoUrl: string, res: VercelResponse) {
  // Extract owner and repo from the URL
  const [, owner, repo] = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/) || []

  if (!owner || !repo) {
    return res.status(400).json({ error: "Invalid repository URL" })
  }

  // Fetch repository information
  const { data: repoData } = await octokit.repos.get({ owner, repo })

  // Fetch latest commit
  const { data: commits } = await octokit.repos.listCommits({ owner, repo, per_page: 1 })
  const latestCommit = commits[0]

  // Fetch languages
  const { data: languages } = await octokit.repos.listLanguages({ owner, repo })

  return res.status(200).json({
    name: repoData.name,
    description: repoData.description,
    stars: repoData.stargazers_count,
    forks: repoData.forks_count,
    languages,
    latestCommit: {
      message: latestCommit.commit.message,
      author: latestCommit.commit.author.name,
      date: latestCommit.commit.author.date,
    },
  })
}

async function handleDeploy(octokit: Octokit, repoUrl: string, data: any, res: VercelResponse) {
  // Extract owner and repo from the URL
  const [, owner, repo] = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/) || []

  if (!owner || !repo) {
    return res.status(400).json({ error: "Invalid repository URL" })
  }

  // Create a new deployment
  const { data: deployment } = await octokit.repos.createDeployment({
    owner,
    repo,
    ref: data.branch || "main",
    environment: data.environment || "production",
    auto_merge: false,
  })

  return res.status(200).json({ message: "Deployment initiated", deployment })
}

