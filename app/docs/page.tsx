"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import dynamic from "next/dynamic"

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false })

export default function DocsPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("typescript")

  const codeSnippets = {
    typescript: `import { ImportBot } from '@importbot/sdk';

const bot = new ImportBot({
  token: process.env.GITHUB_TOKEN,
});

// Import repository
await bot.import({
  url: 'https://github.com/user/repo',
  branch: 'main',
  path: './local-path'
});

// Deploy to cloud
await bot.deploy({
  provider: 'vercel',
  env: 'production'
});`,
    json: `{
  "importbot": {
    "port": 3000,
    "github": {
      "token": "your_token",
      "enterprise": false
    },
    "security": {
      "rateLimit": true,
      "cors": ["https://yourdomain.com"],
      "ssl": true
    },
    "features": {
      "preview": true,
      "collaboration": true,
      "analytics": true
    }
  }
}`,
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">ImportBot Documentation</h1>
      <Tabs defaultValue="getting-started" className="space-y-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Usage</TabsTrigger>
          <TabsTrigger value="api">API Reference</TabsTrigger>
        </TabsList>

        <TabsContent value="getting-started">
          <Card>
            <CardHeader>
              <CardTitle>Getting Started with ImportBot</CardTitle>
              <CardDescription>Learn how to install and set up ImportBot</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-semibold">Quick Start</h3>
              <MonacoEditor
                height="200px"
                language="shell"
                theme="vs-dark"
                value={`# Option 1: Quick Install (Recommended)
npx create-importbot-app@latest

# Option 2: Manual Installation
git clone https://github.com/sheikh-developer/ImportBot.git
cd ImportBot
npm install
npm run dev`}
                options={{
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  readOnly: true,
                }}
              />
              <p>Visit http://localhost:3000 to see your ImportBot instance.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>ImportBot Features</CardTitle>
              <CardDescription>Explore ImportBot's powerful features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-semibold">Universal Import System</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>One-click imports from any Git provider</li>
                <li>Secure ZIP file handling</li>
                <li>Automatic dependency resolution</li>
                <li>Smart conflict management</li>
                <li>Batch repository processing</li>
              </ul>
              <h3 className="text-lg font-semibold mt-6">Deployment Integration</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>One-click cloud deployment</li>
                <li>Environment management</li>
                <li>Preview environments</li>
                <li>Rollback capabilities</li>
                <li>Deployment logs</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Usage</CardTitle>
              <CardDescription>Take your ImportBot experience to the next level</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-semibold">Custom Configuration</h3>
              <div className="flex space-x-2 mb-2">
                <Button
                  variant={selectedLanguage === "typescript" ? "default" : "outline"}
                  onClick={() => setSelectedLanguage("typescript")}
                >
                  TypeScript
                </Button>
                <Button
                  variant={selectedLanguage === "json" ? "default" : "outline"}
                  onClick={() => setSelectedLanguage("json")}
                >
                  JSON
                </Button>
              </div>
              <MonacoEditor
                height="300px"
                language={selectedLanguage}
                theme="vs-dark"
                value={codeSnippets[selectedLanguage]}
                options={{
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  readOnly: true,
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Reference</CardTitle>
              <CardDescription>Detailed documentation of ImportBot's API</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>For detailed API documentation, please visit our full API reference guide:</p>
              <Button asChild>
                <Link href="/api-reference">View Full API Reference</Link>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

