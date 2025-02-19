"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

const CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
const REDIRECT_URI = "https://import-bot.vercel.app/callback?=success"

export function GitHubOAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const token = localStorage.getItem("github-token")
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = () => {
    if (!CLIENT_ID) {
      console.error("GitHub Client ID is not defined")
      toast({
        title: "Error",
        description: "Unable to initiate GitHub login. Please contact support.",
        variant: "destructive",
      })
      return
    }
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=repo,user`
    window.location.href = authUrl
  }

  const handleLogout = () => {
    localStorage.removeItem("github-token")
    setIsAuthenticated(false)
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router.push("/")
  }

  return (
    <div>
      {isAuthenticated ? (
        <Button onClick={handleLogout}>Logout</Button>
      ) : (
        <Button onClick={handleLogin}>Login with GitHub</Button>
      )}
    </div>
  )
}

