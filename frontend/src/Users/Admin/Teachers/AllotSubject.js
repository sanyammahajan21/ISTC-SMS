import { PiStudentThin } from "react-icons/pi";
import "react-toastify/dist/ReactToastify.css";
import { allotSubjectToTeacherAPI_Admin, getCoursesAPI_Admin, getSubjectsAPI_Admin } from "../../../Assets/backendAPIs";
import React, { useState } from "react";
import { useEffect } from "react";
import { getSubjectsAPI_Registrar } from "../../../Assets/backendAPIs";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
import { toast } from "react-toastify";

function AllotSubject() {
  const [students, setStudents] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [subjectInputOptions, setSubjectInputOptions] = useState("");
  const [courseInputOptions, setCourseInputOptions] = useState("");
  const [semesterOptions, setSemesterOptions] = useState("");
  const [loader, setLoader] = useState(false);
  const [showFirstInput, setShowFirstInput] = useState(false);
  const [showSecondInput, setShowSecondInput] = useState(false);
  const [showThirdInput, setShowThirdInput] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({
    course: "",
    semester: "",
    subject: "",
    email: "",
  });

  useEffect(() => {
    // Make a request to backend for data of field 1 course
    (async () => {
      setLoader(true);
      try {
        const url = getCoursesAPI_Admin;
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
        const url = `${getSubjectsAPI_Admin}?course=${formData.course}&semester=${formData.semester}`;
        const response = await axios.get(url, {
          withCredentials: true,
        });
        const subject = response.data.data;
        setSubjectInputOptions(subject);
        setShowThirdInput(true);
        setShowThirdInput(formData.course.trim() !== "");
        setLoader(false);
      } catch (error) {
        toast.warning(error.response.data.message);
        console.error("Error fetching dropdown options:", error);
        setSubjectInputOptions("");
        setShowThirdInput(false);
      }
    })();
  }, [formData.semester]);

  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      const url = allotSubjectToTeacherAPI_Admin;

      const response = await axios.put(url, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.warning(error.response.data.message);
    }
  };

  function handleChange(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <div className="flex bg-lavender font-poppins text-black-blue background">
      <div className="w-screen h-screen mt-3 ml-6">
        <div className=" flex items-center justify-center overscroll-auto font-poppins ">
          <div className=" pt-4 flex flex-col justify-center gap-8 ">
            <div className="flex w-screen justify-center gap-4">
              <h1 className="flex items-center justify-center gap-4 text-4xl font-extrabold">
                Allot Subjects <PiStudentThin />
              </h1>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-sm p-4 space-y-6 justify-center bg-indigo-50 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-200 dark:border-gray-300">
                <h5 className="text-xl font-medium text-black-blue">
                  Select Fields for Allot
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
                <form
                  onSubmit={submitHandler}
                  className="flex flex-col w-full gap-4"
                >
                  <div className="">
                    <label>
                      <p className="text-lg font-bold">
                        Email address <sup className="text-pink-500">*</sup>
                      </p>

                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@email.com"
                        name="email"
                        className="text-lg bg-white input-n-button"
                      ></input>
                    </label>
                  </div>
                </form>
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
                      htmlFor="semester"
                      className="block mb-2 text-sm font-medium text-black-blue"
                    >
                      Semester{" "}
                    </label>

                    <select
                      id="semester"
                      value={formData.semester}
                      onChange={handleChange}
                      name="semester"
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

                <button onClick={submitHandler} className="text-white input-n-button bg-[#1E2548] ">
                  <h1 className="font-bold" >Click here to Allot</h1>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllotSubject;
