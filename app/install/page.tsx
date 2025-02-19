"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle, Copy, Terminal, Cloud, Server } from "lucide-react"
import { DeployButton } from "@/components/deploy-button"

export default function InstallPage() {
  const [token, setToken] = useState("")
  const [validating, setValidating] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const validateToken = async () => {
    setValidating(true)
    try {
      const response = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `token ${token}`,
        },
      })

      if (response.ok) {
        localStorage.setItem("github-token", token)
        toast({
          title: "Success",
          description: "GitHub token validated successfully",
        })
        router.push("/dashboard")
      } else {
        toast({
          title: "Error",
          description: "Invalid GitHub token",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to validate token",
        variant: "destructive",
      })
    } finally {
      setValidating(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "Installation command copied successfully",
    })
  }

  const installScript = `curl -fsSL https://importbot.dev/install.sh | bash`

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Install ImportBot</h1>

      <Alert className="mb-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>You'll need a GitHub token with appropriate permissions to use ImportBot.</AlertDescription>
      </Alert>

      <Tabs defaultValue="token" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="token">1. GitHub Token</TabsTrigger>
          <TabsTrigger value="install">2. Installation</TabsTrigger>
          <TabsTrigger value="deploy">3. Deploy</TabsTrigger>
        </TabsList>

        <TabsContent value="token">
          <Card>
            <CardHeader>
              <CardTitle>GitHub Token Setup</CardTitle>
              <CardDescription>Generate a GitHub token with repo and user scopes to get started.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="token">GitHub Token</Label>
                <Input
                  id="token"
                  type="password"
                  placeholder="Enter your GitHub token"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                />
              </div>
              <Button onClick={validateToken} disabled={!token || validating} className="w-full">
                {validating ? "Validating..." : "Validate Token"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="install">
          <Card>
            <CardHeader>
              <CardTitle>Installation</CardTitle>
              <CardDescription>Choose your preferred installation method.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Option 1: Local Installation</h3>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 flex items-center justify-between">
                  <code className="text-sm">{installScript}</code>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(installScript)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <Button className="w-full" onClick={() => copyToClipboard(installScript)}>
                  <Server className="mr-2 h-4 w-4" />
                  Install Locally
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Option 2: Cloud Installation</h3>
                <Button className="w-full" onClick={() => router.push("/deploy")}>
                  <Cloud className="mr-2 h-4 w-4" />
                  Install on Cloud
                </Button>
              </div>

              <Alert>
                <Terminal className="h-4 w-4" />
                <AlertTitle>Next Steps</AlertTitle>
                <AlertDescription>
                  After installation, run <code className="text-sm">importbot start</code> to launch ImportBot.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deploy">
          <Card>
            <CardHeader>
              <CardTitle>Deploy to Cloud</CardTitle>
              <CardDescription>Choose your preferred cloud platform to deploy ImportBot.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <DeployButton platform="vercel" />
                <DeployButton platform="netlify" />
                <DeployButton platform="railway" />
                <DeployButton platform="heroku" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

