import React from "react"
import {
  flexRender,
  getCoreRowModel,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"
import { Button } from "../../../Assets/ui/button"
import { Input } from "../../../Assets/ui/input"


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../../Assets/ui/Table"


export function DataTable({ columns, data , course,semester, ...props }) {
  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),

    getPaginationRowModel: getPaginationRowModel(),

    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

  })

  return (
    <>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by name..."
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={event =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
       <div className="border-2 rounded-md border-slate-800">
            <Table {...props} className="">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id} className="text-center">
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => {
                                    // Pass the course prop as part of the cell context
                                    const cellContext = {
                                        ...cell.getContext(),
                                        course, semester,
                                    };

                                    return (
                                        <TableCell
                                            key={cell.id}
                                            className="text-center border border-slate-500"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cellContext
                                            )}
                                        </TableCell>
                                    );
                                })}
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

      {/* Pagination code -------------------------> */}
      <div className="flex items-center justify-end py-4 space-x-2 pb-40">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>

    </>
  )
}
