import { ArrowUpDown, Import, MoreHorizontal } from "lucide-react"
import { Button } from "../../../Assets/ui/button"
export const columns = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      )
    },
  },
  {
    accessorKey: "rollNo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Roll No
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      )
    }
  },
  {
    accessorKey: "present",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Present Days
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      )
    }
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Days
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      )
    }
  },
  {
    accessorKey: "percentage",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Percentage %
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      )
    }
  },
 
]