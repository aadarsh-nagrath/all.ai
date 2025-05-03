import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ModelSidebar() {
  return (
    <div className="space-y-4">
      {/* Performance Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-gauge"
            >
              <path d="m12 14 4-4" />
              <path d="M3.34 19a10 10 0 1 1 17.32 0" />
            </svg>
            Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground">Response Time</p>
              <p className="font-medium">0.5s average</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Accuracy</p>
              <p className="font-medium">98.5%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Uptime</p>
              <p className="font-medium">99.99%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Limits Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-shield"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            </svg>
            Usage Limits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Daily Tokens</p>
              <p className="font-medium">100,000 / 1,000,000</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Requests per Minute</p>
              <p className="font-medium">60</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Concurrent Requests</p>
              <p className="font-medium">10</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 