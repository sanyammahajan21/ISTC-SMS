import { ArrowUpDown, Import, MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { Button } from "../../../../Assets/ui/button"
import axios from 'axios'; 
import React from 'react'
import { DataTable } from "../../cn/Data-table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "../../../../Assets/ui/tooltip"
  

const handleDownloadClick = (rowData) => {
    // Use rowData to access the details of the clicked row
    const { rollNo, name, attendance, endSemMarks } = rowData;
    console.log(rowData)

    // Define the Axios request
    axios.post('https://example.com/api/downloadAdmitCard', {
        rollNo,
        name,
        attendance,
        endSemMarks,
    })
    .then(response => {
        // Handle successful response
        console.log('Admit card downloaded:', response.data);
    })
    .catch(error => {
        // Handle error
        console.error('Error downloading admit card:', error);
    });
};

const columns1 = [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Name
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "rollNo",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Roll No
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "percentage",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Attendance %
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    // {
    //     accessorKey: "",
    //     header: "Download Admit Card",
    //     cell: ({ row }) => (
    //         <Button
    //             variant="ghost"
    //             onClick={() => handleDownloadClick(row.original)}
    //             style={{ color: row.original.percentage < 75 ? 'red' : 'inherit' }}
    //         >
    //             Download
    //         </Button>
    //     ),
    //     rowClassName: (row) => {
    //         console.log("Percentage:", row.original.percentage); // Check the value of percentage
    //         return row.original.percentage < 75 ? 'bg-red-200' : '';
    //     }
    // },
    {
        accessorKey: "",
        header: "Download Admit Card",
        cell: ({ row }) => (
            row.original.percentage < 75 ? (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <Button
                                variant="ghost"
                                onClick={() => handleDownloadClick(row.original)}
                                style={{ color: 'red' }} // You can adjust styles here as needed
                            >
                                Download
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Low Attendance</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ) : (
                <Button
                    variant="ghost"
                    onClick={() => handleDownloadClick(row.original)}
                >
                    Download
                </Button>
            )
        ),
        rowClassName: (row) => {
            console.log("Percentage:", row.original.percentage); // Check the value of percentage
            return row.original.percentage < 75 ? 'bg-red-200' : '';
        }
    },
];

// Assume that you have a table component called "DataTable" that uses "columns1" and the data as props.
const AdmitTable = ({ data }) => {
    return (
        <DataTable
            columns={columns1}
            data={data}
        />
    );
};

export default AdmitTable;
