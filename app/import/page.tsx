"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, GitBranch, Upload, LinkIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import CodeSnippet from "@/components/code-snippet"

export default function ImportPage() {
  const [importing, setImporting] = useState(false)
  const [importStatus, setImportStatus] = useState<string | null>(null)
  const { toast } = useToast()

  const handleImport = async (type: string) => {
    setImporting(true)
    setImportStatus(null)

    try {
      // Simulating an import process
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setImportStatus(`Successfully imported from ${type}`)
      toast({
        title: "Import Successful",
        description: `Project imported from ${type}`,
      })
    } catch (error) {
      setImportStatus(`Error importing from ${type}`)
      toast({
        title: "Import Failed",
        description: `Failed to import from ${type}`,
        variant: "destructive",
      })
    } finally {
      setImporting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-4xl font-bold">Import Project</h1>
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>Make sure you have the necessary permissions to import the project.</AlertDescription>
      </Alert>
      <Tabs defaultValue="git" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="git">Git Repository</TabsTrigger>
          <TabsTrigger value="zip">ZIP File</TabsTrigger>
          <TabsTrigger value="url">URL</TabsTrigger>
        </TabsList>
        <TabsContent value="git">
          <Card>
            <CardHeader>
              <CardTitle>Import from Git Repository</CardTitle>
              <CardDescription>Enter the Git repository URL to import your project</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleImport("Git")
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="git-url">Git Repository URL</Label>
                  <Input id="git-url" placeholder="https://github.com/username/repo.git" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="branch">Branch (optional)</Label>
                  <Input id="branch" placeholder="main" />
                </div>
                <Button type="submit" disabled={importing}>
                  {importing ? "Importing..." : "Import from Git"}
                  <GitBranch className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="zip">
          <Card>
            <CardHeader>
              <CardTitle>Import from ZIP File</CardTitle>
              <CardDescription>Upload a ZIP file containing your project</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleImport("ZIP")
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="zip-file">ZIP File</Label>
                  <Input id="zip-file" type="file" accept=".zip" required />
                </div>
                <Button type="submit" disabled={importing}>
                  {importing ? "Importing..." : "Import from ZIP"}
                  <Upload className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="url">
          <Card>
            <CardHeader>
              <CardTitle>Import from URL</CardTitle>
              <CardDescription>Enter the URL of your project to import</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleImport("URL")
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="project-url">Project URL</Label>
                  <Input id="project-url" type="url" placeholder="https://example.com/project" required />
                </div>
                <Button type="submit" disabled={importing}>
                  {importing ? "Importing..." : "Import from URL"}
                  <LinkIcon className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {importStatus && (
        <Alert className="mt-4">
          <AlertTitle>Import Status</AlertTitle>
          <AlertDescription>{importStatus}</AlertDescription>
        </Alert>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Options</CardTitle>
          <CardDescription>Configure advanced import settings</CardDescription>
        </CardHeader>
        <CardContent>
          <CodeSnippet
            language="json"
            code={`
{
  "importSettings": {
    "ignoreFiles": [".DS_Store", "Thumbs.db"],
    "overwriteExisting": false,
    "createBranch": true,
    "branchName": "imported-project"
  }
}
          `}
          />
        </CardContent>
      </Card>
    </div>
  )
}

