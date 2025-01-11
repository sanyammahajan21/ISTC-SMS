import React, { useEffect } from "react";
import { PiStudentThin } from "react-icons/pi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiAdminLine } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { addSingleStudentAPI_Admin, getCoursesAPI, getCoursesAPI_Admin } from "../../../Assets/backendAPIs";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";


function AddSingleStudent({ setIsLoggedIn, isLoggedIn }) {

  const [courseInputOptions, setCourseInputOptions] = useState("");
  const [showSecondInput, setShowSecondInput] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    course: courseInputOptions[0],
  });

  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      const url = addSingleStudentAPI_Admin;

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("Successfully Created!");
      }
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
      <div className="w-full h-screen mt-3 ml-6">
        <div className="flex items-center justify-center">

        </div>
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
        <div className="top-0 right-0 flex items-center justify-center overscroll-auto font-poppins ">
          <div className="w-[480px] h-[780px]   flex flex-col justify-center items-start gap-8 mb-40">
            <div className="flex w-screen gap-4">
              <h1 className="flex items-center justify-center gap-4 text-4xl font-extrabold">
                Create New Student <PiStudentThin />
              </h1>
            </div>

            <form
              onSubmit={submitHandler}
              className="flex flex-col w-full gap-4"
            >
              <div className="">
                <label>
                  <p className="text-lg font-bold">
                    Name <sup className="text-pink-500">*</sup>
                  </p>

                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={changeHandler}
                    placeholder="Enter name"
                    name="name"
                    className="text-lg bg-white input-n-button "
                  ></input>
                </label>
              </div>

              <div className="">
                <label>
                  <p className="text-lg font-bold">
                    Email address <sup className="text-pink-500">*</sup>
                  </p>

                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={changeHandler}
                    placeholder="name@email.com"
                    name="email"
                    className="text-lg bg-white input-n-button"
                  ></input>
                </label>
              </div>

              {/* Password */}

              <div>
                <label className="relative w-full">
                  <p className="text-lg font-bold">
                    Create Password <sup className="text-pink-500">*</sup>
                  </p>

                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={changeHandler}
                    placeholder="********"
                    name="password"
                    className="text-lg bg-white input-n-button"
                  ></input>

                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-[38px] cursor-pointer "
                  >
                    {!showPassword ? (
                      <AiOutlineEyeInvisible
                        fontSize={24}
                        fill="#AFB2BF"
                      ></AiOutlineEyeInvisible>
                    ) : (
                      <AiOutlineEye fontSize={24} fill="#AFB2BF"></AiOutlineEye>
                    )}
                  </span>
                </label>
              </div>

              {/* Enter Roll Number
               */}

              <div className="">
                <label>
                  <p className="text-lg font-bold">
                    Roll Number <sup className="text-pink-500">*</sup>
                  </p>

                  <input
                    required
                    type="text"
                    value={formData.rollNo}
                    onChange={changeHandler}
                    placeholder="Roll Number eg: 2110****"
                    name="rollNo"
                    className="text-lg bg-white input-n-button"
                  ></input>
                </label>
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

              <button className="text-white input-n-button bg-[#1E2548] ">
                <h1 className="font-bold">Click here to Register</h1>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSingleStudent;
