"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export default function SideBySideCollaboration() {
  const [code, setCode] = useState("")
  const [collaboratorCode, setCollaboratorCode] = useState("")
  const [username, setUsername] = useState("")
  const [isJoined, setIsJoined] = useState(false)
  const { toast } = useToast()

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value
    setCode(newCode)
    // In a real-time scenario, you would send this update to other collaborators
    // For now, we'll just update the collaborator's code for demonstration
    setCollaboratorCode(newCode)
  }

  const handleJoin = () => {
    if (username) {
      setIsJoined(true)
      toast({
        title: "Joined Collaboration",
        description: `You have joined the collaboration session as ${username}.`,
      })
    }
  }

  const handleLeave = () => {
    setIsJoined(false)
    setUsername("")
    toast({
      title: "Left Collaboration",
      description: "You have left the collaboration session.",
    })
  }

  return (
    <Card className="w-full mt-8">
      <CardHeader>
        <CardTitle>Side-by-Side Collaboration (Local Demo)</CardTitle>
      </CardHeader>
      <CardContent>
        {!isJoined ? (
          <div className="flex items-center space-x-2 mb-4">
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="flex-grow"
            />
            <Button onClick={handleJoin} disabled={!username}>
              Join Collaboration
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between mb-4">
            <p>Collaborating as: {username}</p>
            <Button onClick={handleLeave} variant="outline">
              Leave Collaboration
            </Button>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="mb-2">Your Code</h3>
            <Textarea
              value={code}
              onChange={handleCodeChange}
              placeholder="Write your code here..."
              className="h-64"
              disabled={!isJoined}
            />
          </div>
          <div>
            <h3 className="mb-2">Collaborator's Code (Local Demo)</h3>
            <Textarea
              value={collaboratorCode}
              placeholder="Collaborator's code will appear here..."
              className="h-64"
              readOnly
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

