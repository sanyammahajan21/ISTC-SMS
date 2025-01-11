import React, { useState } from "react";

import { Button } from "../../../Assets/ui/button";
import { FaEye, FaCloudUploadAlt, FaPrint } from "react-icons/fa";
import axios from "axios";

import { toast } from "react-toastify";
import { downloadMarksAPI_Teacher, enterOldMarksAPI_Registrar } from "../../../Assets/backendAPIs";

const OldEntry = ({ studentsdata, index , subject ,semester }) => {
    // State to manage the current page and rows per page for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const [editableStudents, setEditableStudents] = useState(studentsdata);
    const [sortDirection, setSortDirection] = useState(null);
    const [sortColumn, setSortColumn] = useState(null);
    const [modalStudent, setModalStudent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showReview, setshowReview] = useState(false);

    // Calculate paginated data based on current page and rows per page
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = editableStudents.slice(startIndex, endIndex);

    const handleNameClick = (student) => {
        setShowModal(true);
        setModalStudent(student);
    };

    const handleReviewClick = () => {
        setshowReview(true);
    };

    const handleSubmitMarks = async () => {
        try {
            const url = `${enterOldMarksAPI_Registrar}?semester=${semester}&subject=${subject}`;

            const response = await axios.put(url, editableStudents, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                toast.success(`${response.data.message}`);
            }
        } catch (error) {
            toast.warning(`${error.response.data.message}`);
        }
    };

    const handleInputChange = (event, index, field) => {
        const updatedStudents = [...editableStudents];
        updatedStudents[index][field] = event.target.value;
        setEditableStudents(updatedStudents);
    };

    const handleNextButtonClick = () => {
        const currentIndex = studentsdata.findIndex(
            (student) => student === modalStudent
        );
        const nextIndex = (currentIndex + 1) % studentsdata.length;
        setModalStudent(studentsdata[nextIndex]);
    };

    const handlePrevButtonClick = () => {
        const currentIndex = studentsdata.findIndex(
            (student) => student === modalStudent
        );
        const nextIndex = (currentIndex - 1 + studentsdata.length) % studentsdata.length;
        setModalStudent(studentsdata[nextIndex]);
    };

    const sortByColumn = (column) => {
        let sortedStudents = [...editableStudents];
        if (sortColumn === column) {
            sortedStudents.reverse();
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            sortedStudents.sort((a, b) => {
                if (a[column] < b[column]) return sortDirection === "asc" ? -1 : 1;
                if (a[column] > b[column]) return sortDirection === "asc" ? 1 : -1;
                return 0;
            });
            setSortColumn(column);
            setSortDirection("asc");
        }
        setEditableStudents(sortedStudents);
    };

    const downloadCsvHandler = async () => {
        try {
            const url = `${downloadMarksAPI_Teacher}?index=${index}`;

            const response = await axios.get(url, {
                withCredentials: true,
                responseType: 'blob', // Set responseType to 'blob' to handle the file data as a Blob
            });

            if (response.status === 200) {
                const csvBlob = new Blob([response.data], { type: 'text/csv' });
                const csvUrl = URL.createObjectURL(csvBlob);

                const downloadLink = document.createElement('a');
                downloadLink.href = csvUrl;
                downloadLink.download = `Marks.csv`;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                toast.success('Marks CSV downloaded');
            }
        } catch (error) {
            toast.warning(error.response?.data?.message || 'An error occurred during the download.');
        }
    };

    return (
        <div className="  pb-40 h-screen ">
            <div className="flex justify-center">
                <table className="mt-10 " style={{ border: "1px solid black", borderCollapse: "collapse" }}>
                    <thead className="text-sm text-left rtl:text-right text-slate-900">
                        <tr>
                            <th
                                style={{ border: "1px solid black", padding: "5px" }}
                                onClick={() => sortByColumn("name")}
                                className="text-center "
                            >
                                Name {sortColumn === "name" && sortDirection === "asc" && "↑"}
                                {sortColumn === "name" && sortDirection === "desc" && "↓"}
                            </th>
                            <th
                                style={{ border: "1px solid black", padding: "5px" }}
                                onClick={() => sortByColumn("rollNo")}
                            >
                                Roll No.
                                {sortColumn === "rollNo" && sortDirection === "asc" && "↑"}
                                {sortColumn === "rollNo" && sortDirection === "desc" && "↓"}
                            </th>
                            <th
                                style={{ border: "1px solid black", padding: "5px" }}
                                onClick={() => sortByColumn("Periodical")}
                                className="text-center"
                            >
                                Periodicals
                                {sortColumn === "Periodical" && sortDirection === "asc" && "↑"}
                                {sortColumn === "Periodical" && sortDirection === "desc" && "↓"}
                            </th>
                            <th
                                style={{ border: "1px solid black", padding: "5px" }}
                                onClick={() => sortByColumn("Assessment")}
                                className="text-center"
                            >
                                Assessment
                                {sortColumn === "Assessment" && sortDirection === "asc" && "↑"}
                                {sortColumn === "Assessment" && sortDirection === "desc" && "↓"}
                            </th>
                            <th
                                style={{ border: "1px solid black", padding: "5px" }}
                                onClick={() => sortByColumn("IA")}
                                className="text-center"
                            >
                                IA
                                {sortColumn === "IA" && sortDirection === "asc" && "↑"}
                                {sortColumn === "IA" && sortDirection === "desc" && "↓"}
                            </th>
                            <th
                                style={{ border: "1px solid black", padding: "5px" }}
                                onClick={() => sortByColumn("SE")}
                                className="text-center"
                            >
                                SE
                                {sortColumn === "SE" && sortDirection === "asc" && "↑"}
                                {sortColumn === "SE" && sortDirection === "desc" && "↓"}
                            </th>
                            <th
                                style={{ border: "1px solid black", padding: "5px" }}
                                onClick={() => sortByColumn("Total")}
                                className="text-center"
                            >
                                Total
                                {sortColumn === "Total" && sortDirection === "asc" && "↑"}
                                {sortColumn === "Total" && sortDirection === "desc" && "↓"}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((student, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-indigo-200" : ""}>
                                <td
                                    onClick={() => handleNameClick(student)}
                                    className="text-blue-500 cursor-pointer text-center w-52"
                                    style={{ border: "1px solid black", padding: "5px" }}
                                >
                                    {student.name}
                                </td>
                                <td style={{ border: "1px solid black", padding: "10px" }}>
                                    {student.rollNo}
                                </td>
                                <td  style={{ border: "1px solid black", padding: "5px" }}>
                                    <input
                                        type="text"
                                        value={student.periodical}
                                        className="text-center cursor-pointer "
                                        onChange={(event) =>
                                            handleInputChange(event, index, "periodical")
                                        }
                                    />
                                </td>
                                <td  style={{ border: "1px solid black", padding: "5px" }}>
                                    <input
                                        type="text"
                                        value={student.assessment}
                                        className="text-center cursor-pointer"
                                        onChange={(event) =>
                                            handleInputChange(event, index, "assessment")
                                        }
                                    />
                                </td>
                                <td className="w-20 text-center" style={{ border: "1px solid black", padding: "5px" }}>
                                    {parseInt(student.periodical) + parseInt(student.assessment)}
                                </td>
                                <td  style={{ border: "1px solid black", padding: "5px" }}>
                                    <input
                                        type="text"
                                        className="text-center cursor-pointer"
                                        value={student.SE}
                                        onChange={(event) =>
                                            handleInputChange(event, index, "SE")
                                        }
                                    />
                                </td>
                                <td className="w-20 text-center" style={{ border: "1px solid black", padding: "5px" }}>
                                    {parseInt(student.periodical) + parseInt(student.assessment) + parseInt(student.SE)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* {showReview && <Preview setshowReview={setshowReview} students={studentsdata} />} */}

            {/* Pagination controls */}
            <div className="flex justify-center mt-4">
                {/* Previous Page Button */}
                <Button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(editableStudents.length / rowsPerPage)))}
                    disabled={currentPage === Math.ceil(editableStudents.length / rowsPerPage)}
                >
                    Next
                </Button>

                {/* Rows Per Page Selector */}
                <span className="ml-4">
                    Rows per page:
                    <select value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))}>
                        {[5, 10, 15, 20].map((value) => (
                            <option key={value} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </span>
            </div>

            <div className="flex justify-between mx-auto mt-10 max-w-[600px] pb-40">
                {/* <Button onClick={handleReviewClick} className="flex items-center justify-center">
                    <FaEye className="mr-2" /> Preview
                </Button> */}
                <Button onClick={handleSubmitMarks}>
                    <FaCloudUploadAlt /> Submit Marks
                </Button>
                <Button onClick={downloadCsvHandler}>
                    <FaPrint /> Download CSV
                </Button>
            </div>
        </div>
    );
};

export default OldEntry;
