import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const changelogEntries = [
  {
    version: "1.2.0",
    date: "2023-05-15",
    changes: [
      "Added support for multiple cloud deployment options",
      "Improved GitHub token validation process",
      "Enhanced UI/UX for installation page",
    ],
  },
  {
    version: "1.1.0",
    date: "2023-04-01",
    changes: [
      "Introduced partnerships page",
      "Added new Git integration features",
      "Improved overall performance and stability",
    ],
  },
  {
    version: "1.0.0",
    date: "2023-03-01",
    changes: [
      "Initial release of ImportBot",
      "Basic GitHub repository import functionality",
      "Support for ZIP file uploads",
    ],
  },
]

export default function ChangelogPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Changelog</h1>
      <div className="space-y-8">
        {changelogEntries.map((entry) => (
          <Card key={entry.version}>
            <CardHeader>
              <CardTitle>
                Version {entry.version} - {entry.date}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {entry.changes.map((change, index) => (
                  <li key={index}>{change}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

