import { MinimalToggle } from "@/components/pages/modals/modals/components/toggles"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Model } from "./models"

interface QuickStartCellProps {
  row: any
  table: any
  toast: any
}

export function QuickStartCell({ row, table, toast }: QuickStartCellProps) {
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked
    const updatedData = table.options.data.map((model: Model) => {
      if (model.id === row.original.id) {
        // Only change status if it's not "Active" or "Maintenance"
        const newStatus = checked ? "Quick Start" : 
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
    
    table.options.meta?.updateData(updatedData)
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