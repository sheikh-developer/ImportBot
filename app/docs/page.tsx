import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeSnippet from "@/components/code-snippet"

export default function DocsPage() {
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
              <CodeSnippet
                language="bash"
                code={`
# Option 1: Quick Install (Recommended)
npx create-importbot-app@latest

# Option 2: Manual Installation
git clone https://github.com/sheikh-developer/ImportBot.git
cd ImportBot
npm install
npm run dev
                `}
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
              <h3 className="text-lg font-semibold mt-6">Real-time Collaboration</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Live code editing</li>
                <li>Multi-user sessions</li>
                <li>Integrated chat system</li>
                <li>Activity tracking</li>
                <li>Permission management</li>
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
              <CodeSnippet
                language="json"
                code={`
{
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
}
                `}
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
              <h3 className="text-lg font-semibold">Import Repository</h3>
              <CodeSnippet
                language="typescript"
                code={`
import { ImportBot } from '@importbot/sdk';

const bot = new ImportBot({
  token: process.env.GITHUB_TOKEN,
});

// Import repository
await bot.import({
  url: 'https://github.com/user/repo',
  branch: 'main',
  path: './local-path'
});
                `}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

