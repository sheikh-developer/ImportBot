import { NextResponse } from "next/server"

const CLIENT_ID = process.env.GITHUB_CLIENT_ID
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

export async function POST(request: Request) {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    return NextResponse.json({ error: "Missing GitHub OAuth credentials" }, { status: 500 })
  }

  const { code } = await request.json()

  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
    }),
  })

  const data = await response.json()

  if (data.error) {
    console.error("GitHub OAuth error:", data.error)
    return NextResponse.json({ error: data.error }, { status: 400 })
  }

  return NextResponse.json({ access_token: data.access_token })
}

