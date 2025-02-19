"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function PreviewDeployments() {
  const [previewUrl, setPreviewUrl] = useState("")
  const [branch, setBranch] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleCreatePreview = async () => {
    if (!branch) {
      toast({
        title: "Error",
        description: "Please enter a branch name",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // In a real application, you would call your backend API to create a preview deployment
      // This is a mock implementation
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const mockPreviewUrl = `https://preview-${branch}-${Math.random().toString(36).substring(7)}.vercel.app`
      setPreviewUrl(mockPreviewUrl)
      toast({
        title: "Preview Deployment Created",
        description: `Your preview deployment is ready at ${mockPreviewUrl}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create preview deployment",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full mt-8">
      <CardHeader>
        <CardTitle>Preview Deployments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="branch">Branch to deploy</Label>
            <Input
              id="branch"
              placeholder="Enter branch name"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            />
          </div>
          <Button onClick={handleCreatePreview} disabled={isLoading}>
            {isLoading ? "Creating Preview..." : "Create Preview Deployment"}
          </Button>
          {previewUrl && (
            <div className="mt-4">
              <p>Preview URL:</p>
              <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {previewUrl}
              </a>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

