import { SplitGradientButton } from "@/components/ui/gradient-button"
import { Cpu, Zap, Brain, Clock, Server } from "lucide-react"

export function ModelHeader() {
  return (
    <header className="border-b p-4 bg-transparent from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full shadow-sm">
                Live
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">GPT-4 Turbo</h1>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                  Latest
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <span className="flex items-center gap-1">
                  <Zap className="h-3.5 w-3.5" />
                  <span>128k context</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Server className="h-3.5 w-3.5" />
                  <span>OpenAI</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Mar 2024</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-white/60 dark:bg-gray-800/60 rounded-lg p-3 shadow-sm backdrop-blur-sm">
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Performance</p>
                <p className="font-semibold text-sm mt-1">97.5% <span className="text-xs text-green-500">↑3.2%</span></p>
              </div>
              <div className="text-center">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Response Time</p>
                <p className="font-semibold text-sm mt-1">0.7s <span className="text-xs text-green-500">↓0.2s</span></p>
              </div>
              <div className="text-center">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Cost</p>
                <p className="font-semibold text-sm mt-1">$0.01/1K <span className="text-xs text-amber-500">↑$0.002</span></p>
              </div>
            </div>
          </div>


          <SplitGradientButton 
            icon={<Cpu className="h-4 w-4" />}
          >
            Try Local Model
          </SplitGradientButton>
        </div>
      </div>
    </header>
  )
} 