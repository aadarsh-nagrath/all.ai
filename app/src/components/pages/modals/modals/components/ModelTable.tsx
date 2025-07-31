import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ColumnDef, Row, HeaderGroup, Header, Cell, flexRender, Table as TableType } from "@tanstack/react-table"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Model } from "./models"

interface ModelTableProps {
  table: TableType<Model>
  columns: ColumnDef<Model>[]
  onRowClick?: (model: Model) => void
  selectedModel?: Model | null
}

export function ModelTable({ table, columns, onRowClick, selectedModel }: ModelTableProps) {
  const rowCount = table.getRowModel().rows.length
  const showScroll = rowCount > 12
  
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-background">
      {/* Table Header - Fixed */}
      <div className="bg-background border-b border-border">
        <Table className="table-fixed w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup: HeaderGroup<Model>) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header: Header<Model, unknown>) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: `${header.getSize()}px` }}
                      className="h-11"
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <div
                          className={cn(
                            header.column.getCanSort() &&
                              "flex h-full cursor-pointer select-none items-center justify-between gap-2",
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={(e) => {
                            if (
                              header.column.getCanSort() &&
                              (e.key === "Enter" || e.key === " ")
                            ) {
                              e.preventDefault()
                              header.column.getToggleSortingHandler()?.(e)
                            }
                          }}
                          tabIndex={header.column.getCanSort() ? 0 : undefined}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: (
                              <ChevronUp
                                className="shrink-0 opacity-60"
                                size={16}
                                strokeWidth={2}
                                aria-hidden="true"
                              />
                            ),
                            desc: (
                              <ChevronDown
                                className="shrink-0 opacity-60"
                                size={16}
                                strokeWidth={2}
                                aria-hidden="true"
                              />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
        </Table>
      </div>
      
      {/* Table Body - Scrollable */}
      <div className={cn(
        "overflow-y-auto",
        showScroll ? "max-h-[570px]" : "max-h-none" // Reduced to account for header height
      )}>
        <Table className="table-fixed w-full">
          <TableBody>
            {rowCount ? (
              table.getRowModel().rows.map((row: Row<Model>) => (
                <TableRow 
                  key={row.id} 
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    "transition-all duration-300 cursor-pointer hover:bg-muted/50",
                    row.original.quickStart && "bg-primary/5 hover:bg-primary/10 animate-pulse-once",
                    selectedModel?.id === row.original.id && "bg-primary/10 border-l-4 border-l-primary"
                  )}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell: Cell<Model, unknown>) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
} 