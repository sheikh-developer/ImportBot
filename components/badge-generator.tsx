"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function BadgeGenerator() {
  const [repoName, setRepoName] = useState("")
  const [badgeUrl, setBadgeUrl] = useState("")
  const [embedCode, setEmbedCode] = useState("")
  const { toast } = useToast()

  const generateBadge = async () => {
    if (!repoName) {
      toast({
        title: "Error",
        description: "Please enter a repository name",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch(`/api/generate-badge?repo=${encodeURIComponent(repoName)}`)
      if (!response.ok) {
        throw new Error("Failed to generate badge")
      }
      const data = await response.json()
      setBadgeUrl(data.badgeUrl)
      setEmbedCode(data.embedCode)

      toast({
        title: "Badge Generated",
        description: "Your badge has been generated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate badge. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="w-full mt-8">
      <CardHeader>
        <CardTitle>Badge Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="repoName">Repository Name</Label>
            <Input
              id="repoName"
              placeholder="Enter repository name"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
            />
          </div>
          <Button onClick={generateBadge}>Generate Badge</Button>
          {badgeUrl && (
            <div className="mt-4">
              <p className="mb-2">Badge Preview:</p>
              <img
                src={badgeUrl || "/placeholder.svg"}
                alt={`${repoName} | ImportBot`}
                style={{ width: "250px", height: "55px" }}
              />
            </div>
          )}
          {embedCode && (
            <div className="mt-4">
              <p className="mb-2">Embed Code:</p>
              <textarea
                className="w-full h-24 p-2 border rounded"
                value={embedCode}
                readOnly
                onClick={(e) => e.currentTarget.select()}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

