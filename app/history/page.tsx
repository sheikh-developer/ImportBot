import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getImportHistory } from "@/app/actions/history"

export default async function HistoryPage() {
  const history = await getImportHistory()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Import History</h1>
      {history.length === 0 ? (
        <p>No import history found.</p>
      ) : (
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
      )}
    </div>
  )
}

