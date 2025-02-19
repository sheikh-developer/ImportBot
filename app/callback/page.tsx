"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export default function CallbackPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get("code")

    if (code) {
      setIsLoading(true)
      // Exchange the code for an access token
      fetch("/api/github-oauth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.access_token) {
            localStorage.setItem("github-token", data.access_token)
            toast({
              title: "Success",
              description: "Successfully authenticated with GitHub",
            })
            router.push("/dashboard")
          } else {
            throw new Error("Failed to authenticate")
          }
        })
        .catch((error) => {
          console.error("Authentication error:", error)
          toast({
            title: "Error",
            description: "Failed to authenticate with GitHub",
            variant: "destructive",
          })
          router.push("/")
        })
    } else {
      setIsLoading(false)
      toast({
        title: "Error",
        description: "No authorization code received from GitHub",
        variant: "destructive",
      })
      router.push("/")
    }
  }, [router, toast])

  return (
    <div className="flex justify-center items-center h-screen">
      {isLoading ? (
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      ) : (
        <div>Authentication failed. Redirecting...</div>
      )}
    </div>
  )
}

