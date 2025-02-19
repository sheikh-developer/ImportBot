"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Octokit } from "@octokit/rest"

export default function CDRuntimeIDE({ githubToken }: { githubToken: string }) {
  const [workflow, setWorkflow] = useState(`name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '14.x'
    - run: npm ci
    - run: npm run build --if-present
    - run: npm test`)

  const [previewResult, setPreviewResult] = useState<string | null>(null)

  const handlePreview = async () => {
    try {
      const octokit = new Octokit({ auth: githubToken })

      const response = await octokit.request("POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches", {
        owner: "OWNER",
        repo: "REPO",
        workflow_id: "preview.yml",
        ref: "main",
        inputs: {
          workflow_yaml: workflow,
        },
      })

      setPreviewResult("Workflow preview started. Check your GitHub Actions tab for results.")
    } catch (error) {
      setPreviewResult(`Error previewing workflow: ${error.message}`)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">GitHub Actions Workflow Editor</h3>
      <Textarea value={workflow} onChange={(e) => setWorkflow(e.target.value)} rows={15} className="font-mono" />
      <Button onClick={handlePreview}>Preview Workflow</Button>
      {previewResult && (
        <Alert>
          <AlertTitle>Preview Result</AlertTitle>
          <AlertDescription>{previewResult}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

