import { ArrowUpDown } from "lucide-react";
import { Button } from "../../../../Assets/ui/button";
import axios from "axios";
import React from "react";
import { DataTable } from "../../cn/Data-table";
import { downloadDmcAPI_Registrar } from "../../../../Assets/backendAPIs";
import { toast } from "react-toastify";

const handleDownloadClick = async (rowData, course, semester) => {
  try {
    // Create the URL with query parameters
    const url = `${downloadDmcAPI_Registrar}?course=${course}&rollNo=${rowData.rollNo}&semester=${semester}`;

    // Send a GET request to the server
    const response = await axios.get(url, {
      withCredentials: true,
      responseType: "blob", // Set responseType to 'blob' to handle the file data as a Blob
    });

    // Check if the response status is OK (200)
    if (response.status === 200) {
      // Create a Blob from the response data (PDF data)
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });

      // Create a URL from the Blob
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Create an anchor (a) element
      const downloadLink = document.createElement("a");
      downloadLink.href = pdfUrl;

      // Set the download attribute to specify the filename
      downloadLink.download = `${rowData.rollNo}_DMC.pdf`;

      // Append the anchor to the document body
      document.body.appendChild(downloadLink);

      // Programmatically trigger a click event to start the download
      downloadLink.click();

      // Remove the anchor from the document body after the download starts
      document.body.removeChild(downloadLink);

      // Notify the user that the download was successful
      toast.success("DMC downloaded");
    }
  } catch (error) {
    toast.warning(
      error.response?.data?.message || "An error occurred during the download."
    );
  }
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
    header: "Download DMC ",
    cell: ({ row, course, semester }) => (
      <Button
        variant="ghost"
        onClick={() => handleDownloadClick(row.original, course, semester)}
      >
        Download
      </Button>
    ),
  },
];

// Assume that you have a table component called "DataTable" that uses "columns1" and the data as props.
const DmcTable = ({ data, course, semester }) => {
  return (
    <DataTable
      columns={columns1}
      data={data}
      course={course}
      semester={semester}
    />
  );
};

export default DmcTable;
