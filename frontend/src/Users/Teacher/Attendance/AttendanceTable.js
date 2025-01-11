import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "../../../Assets/ui/button";
import { downloadAttendanceAPI_Teacher, enterAttendanceAPI_Teacher } from "../../../Assets/backendAPIs";

const AttendanceTable = ({ students, index }) => {
    const [editableStudents, setEditableStudents] = useState(students);
    const [totalAttendance, setTotalAttendance] = useState(students[0].total);
    const [sortOrder, setSortOrder] = useState({ field: null, order: "asc" });
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    let accessToken = JSON.parse(localStorage.getItem("accessToken"));

    useEffect(() => {
        console.log("editableStudents", editableStudents);
    }, [editableStudents]);

    // Calculate the paginated data based on current page and rows per page
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = editableStudents.slice(startIndex, endIndex);

    // Function to handle page changes
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    // Function to handle changing rows per page
    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(Number(event.target.value));
        setCurrentPage(1); // Reset to the first page when changing rows per page
    };

    const handleInputChange = (event, index, field) => {
        const updatedStudents = [...editableStudents];
        updatedStudents[index][field] = event.target.value;

        // Calculate the new percentage if present days are updated
        if (field === "present" && totalAttendance) {
            const present = parseInt(updatedStudents[index].present);
            const percentage = ((present / totalAttendance) * 100).toFixed(2);
            updatedStudents[index].percentage = percentage;
        }

        setEditableStudents(updatedStudents);
        console.log(editableStudents);
    };

    const handleTotalAttendanceChange = (e) => {
        const total = parseInt(e.target.value);
        setTotalAttendance(total);

        // Update the total field and recalculate percentage for each student in editableStudents
        const updatedStudents = editableStudents.map((student) => {
            // Calculate the new percentage based on the new totalAttendance
            let percentage = 0;
            if (total !== 0) { // Prevent division by zero
                percentage = ((student.present / total) * 100).toFixed(2);
            }

            return {
                ...student,
                total: total, // Update the total field
                percentage: percentage // Update the percentage
            };
        });

        setEditableStudents(updatedStudents);
        console.log(editableStudents);
    };

    const sortByName = () => {
        const sortedStudents = [...editableStudents].sort((a, b) => {
            const nameA = a.name.toUpperCase();
            const nameB = b.name.toUpperCase();
            return sortOrder.order === "asc"
                ? nameA.localeCompare(nameB)
                : nameB.localeCompare(nameA);
        });
        setEditableStudents(sortedStudents);
        setSortOrder({
            field: "name",
            order: sortOrder.order === "asc" ? "desc" : "asc",
        });
    };

    const sortByRollNo = () => {
        const sortedStudents = [...editableStudents].sort((a, b) => {
            return sortOrder.order === "asc"
                ? a.rollNo - b.rollNo
                : b.rollNo - a.rollNo;
        });
        setEditableStudents(sortedStudents);
        setSortOrder({
            field: "rollNo",
            order: sortOrder.order === "asc" ? "desc" : "asc",
        });
    };

    const sortByAttendance = () => {
        const sortedStudents = [...editableStudents].sort((a, b) => {
            return sortOrder.order === "asc"
                ? a.attendance - b.attendance
                : b.attendance - a.attendance;
        });
        setEditableStudents(sortedStudents);
        setSortOrder({
            field: "attendance",
            order: sortOrder.order === "asc" ? "desc" : "asc",
        });
    };

    const submitHandler = async () => {
        try {
            const url = `${enterAttendanceAPI_Teacher}?index=${index}`;
            const response = await axios.put(url, editableStudents, {
                withCredentials: true,
                headers: {
                    // Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                toast.success(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.warning(error.response.data.message);
        }
    };

    const downloadCsvHandler = async () => {
        try {
            const url = `${downloadAttendanceAPI_Teacher}?index=${index}`;

            const response = await axios.get(url, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                responseType: 'blob',
            });

            if (response.status === 200) {
                const csvBlob = new Blob([response.data], { type: 'text/csv' });
                const csvUrl = URL.createObjectURL(csvBlob);

                const downloadLink = document.createElement('a');
                downloadLink.href = csvUrl;
                downloadLink.download = `Attendance.csv`;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                toast.success('Attendance CSV downloaded');
            }
        } catch (error) {
            toast.warning(error.response?.data?.message || 'An error occurred during the download.');
        }
    };

    return (
        <div className="flex flex-col justify-center overflow-auto mx-auto">
            <div className="flex mt-10 justify-center">
                <h1 className="text-xl font-bold">Enter Total number of Days</h1>
                <input
                    className="ml-10 text-xl font-bold text-center bg-slate-100"
                    type="number"
                    value={totalAttendance}
                    onChange={handleTotalAttendanceChange}
                    placeholder="Total Attendance"
                />
                <h1 className="ml-10 text-xl font-bold">Attendance Criteria &lt; 75 %</h1>
            </div>
            <table className="container max-w-[55rem] text-xl mt-11" style={{ border: "1px solid black", borderCollapse: "collapse" }}>
                <thead className="text-blue-800">
                    <tr>
                        <th
                            onClick={sortByName}
                            style={{ cursor: "pointer", border: "1px solid black", padding: "5px" }}
                        >
                            Name
                            {sortOrder.field === "name" && (sortOrder.order === "asc" ? "↑" : "↓")}
                        </th>
                        <th
                            onClick={sortByRollNo}
                            style={{ cursor: "pointer", border: "1px solid black", padding: "5px" }}
                        >
                            Roll No.
                            {sortOrder.field === "rollNo" && (sortOrder.order === "asc" ? "↑" : "↓")}
                        </th>
                        <th
                            onClick={sortByAttendance}
                            style={{ cursor: "pointer", border: "1px solid black", padding: "5px" }}
                        >
                            Present Days
                            {sortOrder.field === "attendance" && (sortOrder.order === "asc" ? "↑" : "↓")}
                        </th>
                        <th
                            onClick={sortByAttendance}
                            style={{ cursor: "pointer", padding: "5px" }}
                        >
                            Total Days
                            {sortOrder.field === "attendance" && (sortOrder.order === "asc" ? "↑" : "↓")}
                        </th>
                        <th
                            onClick={sortByAttendance}
                            style={{ cursor: "pointer", border: "1px solid black", padding: "5px" }}
                        >
                            Percentage %
                            {sortOrder.field === "attendance" && (sortOrder.order === "asc" ? "↑" : "↓")}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((student, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-indigo-200" : ""}>
                            <td className="justify-center w-64" style={{ border: "1px solid black", padding: "5px" }}>
                                {student.name}
                            </td>
                            <td className="justify-center" style={{ border: "1px solid black", padding: "5px" }}>
                                {student.rollNo}
                            </td>
                            <td  style={{ border: '1px solid black', padding: '5px' }}>
                                <input
                                    type="number"
                                    value={student.present}
                                    className="text-center"
                                    onChange={(event) =>
                                        handleInputChange(event, index, "present")
                                    }
                                />
                            </td>
                            <td value={student.total} style={{ border: '1px solid black', padding: '5px' }}>
                                /{totalAttendance}
                            </td>
                            <td value={student.percentage} className={`${parseInt(student.percentage) > 75 ? 'bg-green-300' : ' bg-red-400'} justify-center`} onChange={(event) => handleInputChange(event, index, "percentage")}  style={{ border: "1px solid black", padding: "5px" }}>
                                {
                                    totalAttendance !== 0 // Prevent division by zero
                                        ?
                                        `${(parseInt(student.present) / totalAttendance * 100).toFixed(2)}%`
                                        : ""
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
                {/* Previous Page Button */}
                <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                
                {/* Page Info */}
                <span className="mx-2">
                    Page {currentPage} of {Math.ceil(editableStudents.length / rowsPerPage)}
                </span>

                {/* Next Page Button */}
                <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === Math.ceil(editableStudents.length / rowsPerPage)}
                >
                    Next
                </Button>

                {/* Rows Per Page Selector */}
                <span className="ml-4">
                    Rows per page:
                    <select value={rowsPerPage} onChange={handleRowsPerPageChange} className="ml-2">
                        {[5, 10, 20].map((value) => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </span>
            </div>

            <div className="flex justify-center gap-16 mx-auto mt-11">
                <Button onClick={submitHandler}>Submit</Button>
                <Button onClick={downloadCsvHandler}>Download CSV</Button>
            </div>
        </div>
    );
};

export default AttendanceTable;
