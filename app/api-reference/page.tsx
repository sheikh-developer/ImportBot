"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import dynamic from "next/dynamic"

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

export default function ApiReferencePage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState("import")

  const apiEndpoints = {
    import: `POST /api/import

Request Body:
{
  "token": "your_github_token",
  "repoUrl": "https://github.com/user/repo",
  "newRepoName": "imported-repo",
  "isPrivate": false
}

Response:
{
  "message": "Repository imported successfully",
  "repo": {
    "id": 123456789,
    "name": "imported-repo",
    "full_name": "your-username/imported-repo",
    "private": false,
    ...
  }
}`,
    analyze: `POST /api/analyze

Request Body:
{
  "token": "your_github_token",
  "repoUrl": "https://github.com/user/repo"
}

Response:
{
  "name": "repo-name",
  "description": "Repository description",
  "stars": 42,
  "forks": 10,
  "languages": {
    "JavaScript
  "stars": 42,
  "forks": 10,
  "languages": {
    "JavaScript": 10000,
    "TypeScript": 5000,
    "HTML": 2000
  },
  "latestCommit": {
    "message": "Update README.md",
    "author": "John Doe",
    "date": "2023-05-20T12:34:56Z"
  }
}`,
    deploy: `POST /api/deploy

Request Body:
{
  "token": "your_github_token",
  "repoUrl": "https://github.com/user/repo",
  "branch": "main",
  "environment": "production"
}

Response:
{
  "message": "Deployment initiated",
  "deployment": {
    "id": 987654321,
    "sha": "abc123def456",
    "ref": "main",
    "task": "deploy",
    "environment": "production",
    "description": "Deploy to production",
    ...
  }
}`,
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">API Reference</h1>
      <Card>
        <CardHeader>
          <CardTitle>ImportBot API Endpoints</CardTitle>
          <CardDescription>Detailed documentation of ImportBot's API endpoints</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedEndpoint} onValueChange={setSelectedEndpoint}>
            <TabsList>
              <TabsTrigger value="import">Import</TabsTrigger>
              <TabsTrigger value="analyze">Analyze</TabsTrigger>
              <TabsTrigger value="deploy">Deploy</TabsTrigger>
            </TabsList>
            <TabsContent value={selectedEndpoint}>
              <MonacoEditor
                height="400px"
                language="json"
                theme="vs-dark"
                value={apiEndpoints[selectedEndpoint]}
                options={{
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  readOnly: true,
                }}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

