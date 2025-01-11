import React, { useState } from "react";
import { useEffect } from "react";
import { columns } from "./Columns";
import { DataTable } from "../cn/Data-table";
import { useLocation } from "react-router-dom";
import {
  downloadAttendanceAPI_Registrar,
  getCoursesAPI,
  getCoursesAPI_Registrar,
  getSubjectsAPI,
  getSubjectsAPI_Registrar,
  showAttendanceAPI_Registrar,
} from "../../../Assets/backendAPIs";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
import { toast } from "react-toastify";
import { Button } from "../../../Assets/ui/button";

function Attendance() {
  const [students, setStudents] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [subjectInputOptions, setSubjectInputOptions] = useState("");
  const [courseInputOptions, setCourseInputOptions] = useState("");
  const [semesterOptions, setSemesterOptions] = useState("");
  const [loader, setLoader] = useState(false);
  const [showFirstInput, setShowFirstInput] = useState(false);
  const [showSecondInput, setShowSecondInput] = useState(false);
  const [showThirdInput, setShowThirdInput] = useState(false);
  const [showFourthInput, setShowFourthInput] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({
    course: "",
    semesterNo: "",
    subject: "",
    currentSemester: "",
  });

  useEffect(() => {
    // Make a request to backend for data of field 1 course
    (async () => {
      setLoader(true);
      try {
        const url = getCoursesAPI_Registrar;
        const response = await axios.get(url, {
          withCredentials: true,
        });
        const courses = response.data.data;
        setCourseInputOptions(courses);
        setShowFirstInput(true);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
        setCourseInputOptions("");
        setShowFirstInput(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (isMounted) {
      (() => {
        setShowSecondInput(formData.course.trim() !== "");

        const selectedCourseName = formData.course;
        const course = courseInputOptions.find(
          (c) => c.name === selectedCourseName
        );

        // If a course is selected, calculate the number of semesters
        if (course) {
          const numSemesters = course.duration * 2;

          // Create an array of semester options
          const options = Array.from(
            { length: numSemesters },
            (_, index) => index + 1
          );

          // Update the state with the calculated options and selected course
          setSemesterOptions(options);
        }
      })();
    } else {
      setIsMounted(true);
    }
  }, [formData.course]);

  useEffect(() => {
    // Make a request to backend for data of field 3 Subject
    (async () => {
      setLoader(true);
      try {
        setLoader(true);
        const url = `${getSubjectsAPI_Registrar}?course=${formData.course}&semesterNo=${formData.semesterNo}`;
        const response = await axios.get(url, {
          withCredentials: true,
        });
        const subject = response.data.data;
        setSubjectInputOptions(subject);
        setShowFourthInput(formData.course.trim() !== "");
        setLoader(false);
      } catch (error) {
        toast.warning(error.response.data.message);
        console.error("Error fetching dropdown options:", error);
        setSubjectInputOptions("");
        setShowThirdInput(false);
      }
    })();
  }, [formData.semesterNo]);

  useEffect(() => {
    setLoader(true);
    setShowThirdInput(formData.course.trim() !== "");
    setLoader(false);
  }, [formData.currentSemester]);

  const handleChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFormSubmit = () => {
    (async () => {
      try {
        const url = `${showAttendanceAPI_Registrar}?course=${formData.course}&subject=${formData.subject}&semester=${formData.semesterNo}&currentSemester=${formData.currentSemester}`;
        const response = await axios.get(url, {
          withCredentials: true,
        });

        setStudents(response.data.data);
        setShowTable(true);
      } catch (error) {
        toast.warning(error.response.data.message);
        console.error("Error fetching dropdown options:", error);
      }
    })();
  };

  const downloadCsvHandler = async () => {
    try {
      // Create the URL with query parameters
      const url = `${downloadAttendanceAPI_Registrar}?course=${formData.course}&semester=${formData.semesterNo}&subject=${formData.subject}&currentSemester=${formData.currentSemester}`;

      // Send a GET request to the server
      const response = await axios.get(url, {
        withCredentials: true,
        responseType: "blob", // Set responseType to 'blob' to handle the file data as a Blob
      });

      // Check if the response status is OK (200)
      if (response.status === 200) {
        // Create a Blob from the response data (CSV data)
        const csvBlob = new Blob([response.data], { type: "text/csv" });

        // Create a URL from the Blob
        const csvUrl = URL.createObjectURL(csvBlob);

        // Create an anchor (a) element
        const downloadLink = document.createElement("a");
        downloadLink.href = csvUrl;

        // Set the download attribute to specify the filename
        downloadLink.download = `Attendance_${formData.course}_Semester_${formData.semesterNo}_${formData.subject}.csv`;

        // Append the anchor to the document body
        document.body.appendChild(downloadLink);

        // Programmatically trigger a click event to start the download
        downloadLink.click();

        // Remove the anchor from the document body after the download starts
        document.body.removeChild(downloadLink);

        // Notify the user that the download was successful
        toast.success("Attendance CSV downloaded");
      }
    } catch (error) {
      // Handle any errors that may occur
      toast.warning(
        error.response?.data?.message ||
          "An error occurred during the download."
      );
    }
  };

  return (
    <div className="flex w-screen h-screen bg-lavender overflow-auto font-poppins text-black-blue background">
      <div className="w-screen h-screen">
        <div>
          {!showTable ? (
            <div className="flex justify-center mt-6">
              <div className="w-full max-w-sm p-4 space-y-6 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-200 dark:border-gray-300">
                <h5 className="text-xl font-medium text-black-blue">
                  Select Fields for Attendance
                </h5>

                {loader && (
                  <ThreeCircles
                    visible={true}
                    height="100"
                    width="100"
                    color="#5247ba"
                    ariaLabel="three-circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                )}

                {/* 1st input  */}
                {showFirstInput && (
                  <div>
                    <h1> Select Course </h1>

                    <select
                      id="course"
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 
   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
   block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400
   text-black-blue dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="">--Select an option--</option>
                      {courseInputOptions.map((course, index) => (
                        <option key={index} value={course.name}>
                          {course.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* 2nd input  */}
                {showSecondInput && (
                  <form className="max-w-sm mx-auto">
                    <label
                      htmlFor="currentSemester"
                      className="block mb-2 text-sm font-medium text-black-blue"
                    >
                      Current Semester{" "}
                    </label>

                    <select
                      id="currentSemester"
                      value={formData.currentSemester}
                      onChange={handleChange}
                      name="currentSemester"
                      className="bg-gray-50 border border-gray-300 
   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
   block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400
   text-black-blue dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="">--Select an option--</option>
                      {semesterOptions.map((semester) => (
                        <option key={semester} value={semester}>
                          {semester}
                        </option>
                      ))}
                    </select>
                  </form>
                )}

                {/* 3rd input  */}
                {showThirdInput && (
                  <form className="max-w-sm mx-auto">
                    <label
                      htmlFor="semesterNo"
                      className="block mb-2 text-sm font-medium text-black-blue"
                    >
                      Semester{" "}
                    </label>

                    <select
                      id="semesterNo"
                      value={formData.semesterNo}
                      onChange={handleChange}
                      name="semesterNo"
                      className="bg-gray-50 border border-gray-300 
                 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400
                 text-black-blue dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="">--Select an option--</option>
                      {semesterOptions
                        .filter(
                          (semester) => semester <= formData.currentSemester
                        )
                        .map((semester) => (
                          <option key={semester} value={semester}>
                            {semester}
                          </option>
                        ))}
                    </select>
                  </form>
                )}
                {/* 4th input  */}
                {showFourthInput && (
                  <div>
                    <h1> Select Subject </h1>

                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 
   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
   block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400
   text-black-blue dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="">--Select an option--</option>
                      {subjectInputOptions.map((option) => (
                        <option key={option.index} value={option.value}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <button
                  onClick={handleFormSubmit}
                  type="submit"
                  className="w-full text-white bg-black-blue  focus:ring-4 
focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5
text-center bg-text-black-blue "
                >
                  Submit
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex  justify-center items-center pt-4">
                <Button onClick={downloadCsvHandler}> Download CSV </Button>
              </div>
              <div className=" container max-w-[65rem] mx-auto">
                <DataTable columns={columns} data={students} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Attendance;
