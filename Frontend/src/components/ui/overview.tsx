"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Line, LineChart, ResponsiveContainer } from "recharts"

const data = [{ value: 40 }, { value: 20 }, { value: 60 }, { value: 30 }, { value: 70 }, { value: 40 }, { value: 50 }]

export function Overview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-x-4">
            <span className="text-sm text-muted-foreground">Critical</span>
            <span className="text-sm text-red-500">Error</span>
            <span className="text-sm text-orange-500">Warning</span>
          </div>
        </div>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

