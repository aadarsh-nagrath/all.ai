import { MinimalToggle } from "@/components/pages/modals/modals/components/toggles"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Model } from "./models"
import { Row, Table } from "@tanstack/react-table"

interface QuickStartCellProps {
  row: Row<Model>
  table: Table<Model>
  toast: any
}

export function QuickStartCell({ row, table, toast }: QuickStartCellProps) {
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked
    const updatedData = table.options.data.map((model: Model) => {
      if (model.id === row.original.id) {
        // Only change status if it's not "Active" or "Maintenance"
        const newStatus: Model["status"] = checked ? "Quick Start" : 
          (model.status === "Active" ? "Active" : 
           model.status === "Maintenance" ? "Maintenance" : "Ready")
        return { 
          ...model, 
          quickStart: checked,
          status: newStatus
        }
      }
      return model
    })
    // Update UI immediately
    table.options.meta?.updateData(updatedData)
    // Get all quick start model ids
    const quickStartIds = updatedData.filter((m: Model) => m.quickStart).map((m: Model) => m.id)
    // Store in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('quick_start_models', JSON.stringify(quickStartIds))
      // Dispatch custom event for same-tab updates
      window.dispatchEvent(new Event('quickstart-updated'))
    }
    // Sync with backend (fire and forget)
    fetch('/api/user', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quick_start: quickStartIds })
    })
    toast({
      variant: "success",
      title: checked ? "Added to Quick Start" : "Removed from Quick Start",
      description: `${row.original.name} has been ${checked ? 'added to' : 'removed from'} Quick Start.`,
    })
  }

  return (
    <div className="flex items-center justify-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <MinimalToggle
              id={`quick-start-${row.original.id}`}
              checked={row.original.quickStart}
              onChange={handleToggle}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.original.quickStart ? "Remove from Quick Start" : "Add to Quick Start"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
} 