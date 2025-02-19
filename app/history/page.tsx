"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type ImportRecord = {
  id: string
  repoName: string
  importType: "zip" | "url" | "git"
  status: "success" | "failure"
  timestamp: string
}

export default function HistoryPage() {
  const [history, setHistory] = useState<ImportRecord[]>([])

  useEffect(() => {
    // In a real application, you would fetch this data from a backend API
    const mockHistory: ImportRecord[] = [
      { id: "1", repoName: "project-alpha", importType: "zip", status: "success", timestamp: "2023-05-01T12:00:00Z" },
      { id: "2", repoName: "awesome-app", importType: "git", status: "failure", timestamp: "2023-05-02T15:30:00Z" },
      { id: "3", repoName: "cool-website", importType: "url", status: "success", timestamp: "2023-05-03T09:45:00Z" },
    ]
    setHistory(mockHistory)
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Import History</h1>
      <div className="grid gap-4">
        {history.map((record) => (
          <Card key={record.id}>
            <CardHeader>
              <CardTitle>{record.repoName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Import Type: {record.importType}</p>
              <p>Status: {record.status}</p>
              <p>Timestamp: {new Date(record.timestamp).toLocaleString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

