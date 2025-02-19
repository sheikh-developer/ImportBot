"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, GitBranch, Upload } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ImportPage() {
  const [importing, setImporting] = useState(false)
  const [importStatus, setImportStatus] = useState<string | null>(null)

  const handleImport = (type: string) => {
    setImporting(true)
    setImportStatus(null)

    // Simulating an import process
    setTimeout(() => {
      setImporting(false)
      setImportStatus(`Successfully imported from ${type}`)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Import Project</h1>
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>Make sure you have the necessary permissions to import the project.</AlertDescription>
      </Alert>
      <Tabs defaultValue="git">
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
              >
                <div className="space-y-4">
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
                </div>
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
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="zip-file">ZIP File</Label>
                    <Input id="zip-file" type="file" accept=".zip" required />
                  </div>
                  <Button type="submit" disabled={importing}>
                    {importing ? "Importing..." : "Import from ZIP"}
                    <Upload className="ml-2 h-4 w-4" />
                  </Button>
                </div>
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
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-url">Project URL</Label>
                    <Input id="project-url" type="url" placeholder="https://example.com/project" required />
                  </div>
                  <Button type="submit" disabled={importing}>
                    {importing ? "Importing..." : "Import from URL"}
                    <Upload className="ml-2 h-4 w-4" />
                  </Button>
                </div>
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
    </div>
  )
}

