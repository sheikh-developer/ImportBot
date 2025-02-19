import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { name: "Jan", commits: 400 },
  { name: "Feb", commits: 300 },
  { name: "Mar", commits: 200 },
  { name: "Apr", commits: 278 },
  { name: "May", commits: 189 },
  { name: "Jun", commits: 239 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Commit Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="commits" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Project Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Total Commits</h3>
                <p className="text-3xl font-bold">1,606</p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Active Projects</h3>
                <p className="text-3xl font-bold">12</p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Contributors</h3>
                <p className="text-3xl font-bold">25</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

