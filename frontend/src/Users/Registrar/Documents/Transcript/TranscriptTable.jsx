import { ArrowUpDown, Import, MoreHorizontal } from "lucide-react"
import { Button } from "../../../../Assets/ui/button"
import axios from 'axios'; 
import React from 'react'
import { DataTable } from "../../cn/Data-table";

const handleDownloadClick = (rowData , course) => {
    // Use rowData to access the details of the clicked row
    const { rollNo, name, attendance, endSemMarks } = rowData;
    console.log(course)

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
                <ArrowUpDown className="w-4 h-4 ml-2" />
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
                <ArrowUpDown className="w-4 h-4 ml-2" />
            </Button>
        ),
    },
    {
        accessorKey: "endSemMarks",
        header: "Download Transcript",
        cell: ({ row ,course }) => (
            <Button
                variant="ghost"
                onClick={() => handleDownloadClick(row.original,course)}
            >
                Download
            </Button>
        ),
    },
];

// Assume that you have a table component called "DataTable" that uses "columns1" and the data as props.
const TranscriptTable = ({ data ,course }) => {
    return (
        <DataTable
            columns={columns1}
            data={data}
            course={course}
        />
    );
};

export default TranscriptTable;

