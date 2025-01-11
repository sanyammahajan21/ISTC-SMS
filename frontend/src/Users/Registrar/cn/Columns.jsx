import { ArrowUpDown } from "lucide-react"
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
    accessorKey: "periodical",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Periodicals
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      )
    }
  },
  {
    accessorKey: "assessment",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
         Assessment 
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      )
    }
  },
  {
    accessorKey: "IA",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
         IA
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      )
    }
  },
  {
    accessorKey: "SE",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
         Semester Exam 
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
         Total
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      )
    }
  },
  
]