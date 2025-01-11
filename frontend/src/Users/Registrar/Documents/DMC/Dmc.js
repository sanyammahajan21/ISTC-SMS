import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import DmcTable, { columns } from "./DmcTable";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
import { toast } from "react-toastify";
import { downloadMultipleDMCsAPI_Registrar, getCoursesAPI_Registrar, getStudentsForDmcAPI_Registrar } from "../../../../Assets/backendAPIs";
import { Button } from "../../../../Assets/ui/button";


const Dmc = () =>  {
    const [showTable, setShowTable] = useState(false);      
    const [students, setStudents] = useState([]);
    const [courseInputOptions, setCourseInputOptions] = useState("");
    const [semesterOptions, setSemesterOptions] = useState("");
    const [loader, setLoader] = useState(false);
    const [showFirstInput, setShowFirstInput] = useState(false);
    const [showSecondInput, setShowSecondInput] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [formData, setFormData] = useState({
      course: "",
      semesterNo: "",
    });
  
    useEffect(() => {
      // Make a request to backend for data of field 1 course
      (async () => {
        setLoader(true);
        try {
          const url = getCoursesAPI_Registrar;
          const response = await axios.get(url, {
            withCredentials: true
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
          console.log(courseInputOptions);
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
  
    // Handler function to update formdata
    const handleChange = (event) => {
      setFormData((prevData) => ({
        ...prevData,
        [event.target.name]: event.target.value,
      }));
    };
  
    const extractRollNos = (data) => {
      // Create an array of roll numbers using map
      const rollNos = data.map((student) => student.rollNo);
      return rollNos;
    };
    const downloadMultipleHandler = async () => {
      console.log("download multiple handler");
      try {
  
        const rollNumbersArray = extractRollNos(students);
        const apiUrl = downloadMultipleDMCsAPI_Registrar;
  
        const response = await axios.get(apiUrl, {
          withCredentials: true,
          params: { semester: formData.semesterNo,
            rollNos: rollNumbersArray },
          responseType: "blob",
        });
  
        console.log("response --> ", response);
  
        const url = window.URL.createObjectURL(
          new Blob([response.data], { type: "application/pdf" })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "DMCs.pdf"); // Set the filename
        document.body.appendChild(link);
        link.click();
        link.remove();
  
        toast.success(response.data.message);
      } catch (error) {
        toast.warning(error.response.data.message);
      }
    };
    const handleFormSubmit = () => {
      (async () => {
        try {
  
          const url = `${getStudentsForDmcAPI_Registrar}?course=${formData.course}&currentSemester=${formData.semesterNo}`;
          const response = await axios.get(url, {
            withCredentials: true,
          });
  
          setStudents(response.data.data);
  
          if (response.status === 200) {
            setShowTable(true);
            toast.success(response.data.message);
          }
  
        } catch (error) {
          toast.warning(error.response.data.message);
          console.error("Error fetching dropdown options:", error);
        }
      })();
    };
  
    return (
      <div className="flex justify-center w-screen h-screen overflow-auto bg-lavender font-poppins text-black-blue background ">
        {!showTable ? (
          <div className="">
            <div className="flex justify-center mt-6">
              <div className="w-full max-w-sm p-4 space-y-6 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-200 dark:border-gray-300">
                <h5 className="text-xl font-medium text-black-blue">
                  Select Fields for DMC Download
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
                      {semesterOptions.map((semester) => (
                        <option key={semester} value={semester}>
                          {semester}
                        </option>
                      ))}
                    </select>
                  </form>
                )}
  
                {/* 3rd input 
                {showThirdInput && (
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
                )} */}
  
            
  
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
          </div>
        ) : (
          <div className="w-[55rem] ">
            <div className="flex justify-center pt-10">
              <Button  onClick={downloadMultipleHandler}> Download for All Students </Button>
            </div>
            <div className="container justify-center overflow-auto mb-11 py-7">
              {/* <DataTable columns={columns} data={studentsData} /> */}
              <DmcTable data={students} course={formData.course} semester={formData.semesterNo} />
            </div>
          </div>
        )}
      </div>
    );
  };

export default Dmc