import React from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { toast } from "react-toastify";
import { addMultipleStudentsAPI_Admin, getCoursesAPI_Admin } from "../../../Assets/backendAPIs";
import { useEffect } from "react";
import { ThreeCircles } from "react-loader-spinner";

function AddMultipleStudents(props) {
  const [loading, setLoading] = useState(false);
  const [newFile, setFile] = useState(null);    
  const [courseInputOptions, setCourseInputOptions] = useState("");
  const [loader, setLoader] = useState(false);
  const [showFirstInput, setShowFirstInput] = useState(false);
  const [showSecondInput, setShowSecondInput] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [semesterOptions, setSemesterOptions] = useState("");



  const [formData, setFormData] = useState({
    course: "",
    currentSemester:"",
  });

  useEffect(() => {
    // Make a request to backend for data of field 1 course
    (async () => {
      setLoader(true);
      try {
        const url = getCoursesAPI_Admin;
        const response = await axios.get(url, {withCredentials: true});
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

  const handleChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".xlsx, .xls, .csv",
  });

  const handleUpload = async () => {
    try {
      setLoading(true);
      const formData2 = new FormData();
      formData2.append("file", newFile);
      formData2.append("course", formData.course)
      formData2.append("currentSemester", formData.currentSemester);

      const url = addMultipleStudentsAPI_Admin;
      const response = await axios.post(url, formData2,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success(`${response.data.message}`);
      }
    } catch (error) {
      toast.warning(`${error.response.data.message}`);
    }
  };


  return (
    <div className="flex bg-lavender font-poppins text-black-blue background">
      <div className="w-full h-screen  ml-6">
        <div className="flex items-center justify-center">
          <div className="">
            <h1 className=" text-3xl font-bold ml-30 pt-10">
              Add multiple students to the database
            </h1>

            <div className="">
          <div className="flex flex-col justify-center  pt-6 ">
            
             
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
                  <label
                    htmlFor="semesterNo"
                    className="block mb-2 text-sm font-medium text-black-blue"
                  >
                    Select the course of students{" "}
                  </label>

                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 
                 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400
                 text-black-blue dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
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
                <form className="max-w-sm mx-auto pt-8">
                  <label
                    htmlFor="semesterNo"
                    className="block mb-2 text-sm font-medium text-black-blue"
                  >
                    Select current semester of students{" "}
                  </label>

                  <select
                    id="currentSemester"
                    value={formData.currentSemester}
                    onChange={handleChange}
                    name="currentSemester"
                    className="bg-gray-50 border border-gray-300 
                 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400
                 text-black-blue dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-10" 
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
            
          </div>
        </div>
            {/* File Upload (Result upload in the teacher section*/}
            <div
              className=" cursor-pointer p-6  border-spacing-4 border-r-4 outline-dashed  text-center w-[420px] ml-4"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <p className="font-bold font-poppins">
                {" "}
                Click to select the CSV file<br/>*Name the columns only and only as 'Name', 'RollNo'*
              </p>
            </div>
            {newFile && (
              <div>
                <div className="flex mx-auto mt-4 ml-28">
                  <p>Selected File: {newFile.name}</p>
                </div>
                <div className="flex ml-36">
                  <button
                    className="w-[120px] text-white bg-black-blue  focus:ring-4 
            focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5
             text-center bg-text-black-blue mt-7  "
                    onClick={handleUpload}
                  >
                    Upload
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default AddMultipleStudents;
