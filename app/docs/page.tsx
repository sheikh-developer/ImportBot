import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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
              <pre className="bg-gray-100 p-4 rounded-md">
                <code>
                  {`# Option 1: Quick Install (Recommended)
npx create-importbot-app@latest

# Option 2: Manual Installation
git clone https://github.com/sheikh-developer/ImportBot.git
cd ImportBot
npm install
npm run dev`}
                </code>
              </pre>
              <p>Visit http://localhost:3000 to see your ImportBot instance.</p>
              <h3 className="text-lg font-semibold mt-6">Installation Methods</h3>
              <h4 className="font-medium">Local Development</h4>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Clone repository</li>
                <li>Install dependencies</li>
                <li>Set up environment</li>
                <li>Start development server</li>
              </ol>
              <h4 className="font-medium mt-4">Docker Deployment</h4>
              <pre className="bg-gray-100 p-4 rounded-md">
                <code>
                  {`# Pull and run ImportBot
docker pull importbot/importbot
docker run -p 3000:3000 importbot/importbot`}
                </code>
              </pre>
              <h4 className="font-medium mt-4">Cloud Installation</h4>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Click any deployment button on the homepage</li>
                <li>Follow provider-specific setup</li>
                <li>Configure environment variables</li>
                <li>Deploy</li>
              </ol>
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
              <h3 className="text-lg font-semibold mt-6">Deployment Integration</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>One-click cloud deployment</li>
                <li>Environment management</li>
                <li>Preview environments</li>
                <li>Rollback capabilities</li>
                <li>Deployment logs</li>
              </ul>
              <h3 className="text-lg font-semibold mt-6">Modern UI/UX</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Dark/Light mode</li>
                <li>Responsive design</li>
                <li>Customizable themes</li>
                <li>Keyboard shortcuts</li>
                <li>Drag-and-drop interface</li>
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
              <pre className="bg-gray-100 p-4 rounded-md">
                <code>
                  {`{
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
}`}
                </code>
              </pre>
              <h3 className="text-lg font-semibold mt-6">API Integration</h3>
              <pre className="bg-gray-100 p-4 rounded-md">
                <code>
                  {`import { ImportBot } from '@importbot/sdk';

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
});`}
                </code>
              </pre>
              <h3 className="text-lg font-semibold mt-6">Analytics Integration</h3>
              <h4 className="font-medium">Usage Tracking</h4>
              <pre className="bg-gray-100 p-4 rounded-md">
                <code>
                  {`import { track } from '@importbot/analytics';

track('repository_import', {
  source: 'github',
  size: '1.2MB',
  duration: '45s'
});`}
                </code>
              </pre>
              <h4 className="font-medium mt-4">Performance Monitoring</h4>
              <pre className="bg-gray-100 p-4 rounded-md">
                <code>
                  {`import { monitor } from '@importbot/analytics';

monitor('api_response_time', {
  endpoint: '/api/import',
  duration: 234,
  status: 200
});`}
                </code>
              </pre>
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

