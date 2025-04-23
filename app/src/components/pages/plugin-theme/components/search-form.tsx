import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export function SearchForm() {
  return (
    <div className="p-4 border-b border-gray-800">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        <Input placeholder="Search" className="pl-9 bg-gray-900 border-gray-700" />
      </div>
    </div>
  )
}
