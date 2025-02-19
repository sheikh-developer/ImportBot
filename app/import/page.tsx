"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { importRepository } from "@/app/actions/import"

export default function ImportPage() {
  const [repoUrl, setRepoUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await importRepository(repoUrl)
      if (result.error) {
        throw new Error(result.error)
      }
      toast({
        title: "Import Successful",
        description: `Imported ${result.name} with ${result.stars} stars`,
      })
    } catch (error) {
      toast({
        title: "Import Failed",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Import Repository</CardTitle>
        <CardDescription>Enter the URL of the GitHub repository you want to import</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleImport}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="repoUrl">Repository URL</Label>
              <Input
                id="repoUrl"
                placeholder="https://github.com/username/repo"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Importing..." : "Import Repository"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

