"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Octokit } from "@octokit/rest"

export default function TokenManager() {
  const [token, setToken] = useState("")
  const [isValid, setIsValid] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const storedToken = localStorage.getItem("github-token")
    if (storedToken) {
      setToken(storedToken)
      validateToken(storedToken)
    }
  }, [])

  const validateToken = async (tokenToValidate: string) => {
    try {
      const octokit = new Octokit({ auth: tokenToValidate })
      await octokit.users.getAuthenticated()
      setIsValid(true)
      setMessage("Token is valid")
      localStorage.setItem("github-token", tokenToValidate)
    } catch (error) {
      setIsValid(false)
      setMessage("Invalid token")
      localStorage.removeItem("github-token")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    validateToken(token)
  }

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="github-token">GitHub Token</Label>
          <Input
            id="github-token"
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Enter your GitHub token"
            required
          />
        </div>
        <Button type="submit">Validate Token</Button>
      </form>
      {message && (
        <Alert className={`mt-4 ${isValid ? "bg-green-100" : "bg-red-100"}`}>
          <AlertTitle>{isValid ? "Success" : "Error"}</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

