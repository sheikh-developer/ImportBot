import type { NextRequest } from "next/server"
import { handleGitHubCallback } from "@/app/actions/auth"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")

  if (!code) {
    return new Response("No code provided", { status: 400 })
  }

  try {
    await handleGitHubCallback(code)
    return new Response("Authentication successful", { status: 200 })
  } catch (error) {
    console.error("Error handling GitHub callback:", error)
    return new Response("Authentication failed", { status: 500 })
  }
}

