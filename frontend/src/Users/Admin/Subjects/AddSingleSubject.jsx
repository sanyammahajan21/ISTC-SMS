import React, { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SlBookOpen } from "react-icons/sl";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import {
  addSingleSubjectAPI_Admin,
  getCoursesAPI,
  getCoursesAPI_Admin,
} from "../../../Assets/backendAPIs";
import { RotatingLines } from "react-loader-spinner";
// import '../components/Login/LoginModal.css'
import axios from "axios";

function AddSingleSubject({ setIsLoggedIn, isLoggedIn }) {
  // const [selectedRole, setSelectedRole] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    semester: "",
    type: "",
    code: "",
    course: "",
  });
  const [courseInputOptions, setCourseInputOptions] = useState("");
  const [showSecondInput, setShowSecondInput] = useState(false);
  const [loader, setLoader] = useState(false);

  const submitHandler = async (event) => {
    try {
      event.preventDefault();

      const url = addSingleSubjectAPI_Admin;

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.warning(error.response.data.message);
    }
  };

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }
  useEffect(() => {
    // Make a request to backend when component mounts
    (async () => {
      try {
        setLoader(true);
        const url = getCoursesAPI_Admin;
        const response = await axios.get(url, {withCredentials: true});

        const courses = response.data.data;
        setCourseInputOptions(courses);
        setShowSecondInput(true);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
        setCourseInputOptions("");
        setShowSecondInput(false);
      }
    })();
  }, []);

  return (
    <div className="flex overflow-scroll bg-lavender font-poppins text-black-blue background">
      <div className="h-screen ">
        <div className="flex flex-col gap-1"></div>
      </div>
      <div className="w-full h-screen mt-3 ml-6">
      
        {loader && (
          <RotatingLines
            visible={true}
            height="96"
            width="96"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        )}
        <div className="top-0 right-0 flex items-center justify-center font-poppins ">
          <div className="w-[480px] pt-20   flex flex-col justify-center items-start gap-8 mb-40">
            <div className="flex w-screen gap-4">
              <h1 className="flex items-center justify-center gap-4 text-4xl font-extrabold">
                Create New Subject <SlBookOpen />
              </h1>
            </div>

            <form
              onSubmit={submitHandler}
              className="flex flex-col w-full gap-4"
            >
              <div className="">
                <label>
                  <p className="text-lg font-bold">
                    Name of Subject <sup className="text-pink-500">*</sup>
                  </p>

                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={changeHandler}
                    placeholder="Enter name"
                    name="name"
                    className="text-lg bg-white input-n-button"
                  ></input>
                </label>
              </div>

              <div className="">
                <label>
                  <p className="text-lg font-bold">
                    Code <sup className="text-pink-500">*</sup>
                  </p>

                  <input
                    required
                    type="text"
                    value={formData.code}
                    onChange={changeHandler}
                    placeholder="Enter code"
                    name="code"
                    className="text-lg bg-white input-n-button"
                  ></input>
                </label>
              </div>

              <form className="mx-auto ">
                <label htmlFor="semester" className="text-lg font-bold">
                  Semester <sup className="text-pink-500">*</sup>
                </label>
                <select
                  id="semester"
                  value={formData.semester}
                  onChange={changeHandler}
                  name="semester"
                  className="bg-gray-50 border border-gray-300 
                 text-sm rounded-lg 
                 block w-[480px] p-2.5  "
                >
                  <option> 1</option>
                  <option> 2</option>
                  <option> 3</option>
                  <option> 4</option>
                  <option> 5</option>
                  <option> 6</option>
                  <option> 7</option>
                  <option> 8</option>
                </select>
              </form>

              <div className="mx-auto ">
                <label htmlFor="type" className="mb-4 text-lg font-bold">
                  Type Of Subject <sup className="text-pink-500">*</sup>
                </label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={changeHandler}
                  name="type"
                  className="bg-gray-50 border border-gray-300 
                 text-sm rounded-lg 
                 block w-[480px] p-2.5  "
                >
                  <option> THEORY</option>
                  <option> PRAC</option>
                </select>
              </div>

              {/* Add Courses */}
              {showSecondInput && (
                <div>
                  <h1 className="text-lg font-bold">
                    {" "}
                    Select Courses <sup className="text-pink-500">*</sup>
                  </h1>

                  <select
                    name="course"
                    id="course"
                    value={formData.course}
                    onChange={changeHandler}
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

              <button className="text-white input-n-button bg-[#1E2548] font-bold">
                Click here to add subject
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSingleSubject;
