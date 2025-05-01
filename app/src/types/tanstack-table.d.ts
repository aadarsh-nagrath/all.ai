// This file augments the TanStack Table types with our custom meta options
import { Model } from "@/components/pages/modals/modals/components/models"

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends Model> {
    updateData: (data: TData[]) => void
  }
} 