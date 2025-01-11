import React, { useEffect } from "react";
import { PiStudentThin } from "react-icons/pi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { RiAdminLine } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import {
  addSingleStudentAPI_Admin,
  getCoursesAPI,
} from "../../../Assets/backendAPIs";
import { RotatingLines } from "react-loader-spinner";
// import '../components/Login/LoginModal.css'
import axios from "axios";

function SingleTeacher({ setIsLoggedIn, isLoggedIn }) {
  // const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [courseInputOptions, setCourseInputOptions] = useState("");
  const [showSecondInput, setShowSecondInput] = useState(false);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();

    console.log("Form data of create user is--->", formData);

    // const url = addSingleStudentAPI_Admin;

    // const response = await axios.post(url, formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });
    // toast.success("Successfully Created!");
    // console.log(
    //   "Response after axios.post request in the teacher registration is ----->",
    //   response
    // );
    // console.log("Message in the response is ", response.data.message);
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
        const url = getCoursesAPI;
        const response = await axios.get(url);

        // console.log("course response --> ", response);
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

  // function handlerChange(e) {
  //   e.preventDefault();
  //   setSelectedRole(e.target.value);
  //   console.log("Role on frontend is ---->", selectedRole);
  // }
  return (
    <div className="flex bg-lavender font-poppins text-black-blue">
      <div className="w-full h-screen mt-3 ml-6">
        <div className="flex items-center justify-center">
          <div className="flex items-center w-screen h-20 p-4 m-4 mr-8 text-center bg-white rounded-2xl">
            <div className="flex justify-evenly">
              <h1 className="flex items-center justify-center pb-3 text-4xl font-semibold ml-[780px]">
                <RiAdminLine />
                Admin
              </h1>
            </div>
          </div>
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
          <div className="w-[480px] h-[780px]   flex flex-col justify-center items-start gap-8 mb-11">
            <div className="flex w-screen gap-4">
              <h1 className="flex items-center justify-center gap-4 text-4xl font-extrabold">
                Create New Teacher <PiStudentThin />
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
                    className="text-lg bg-white input-n-button"
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

              <button className="text-white input-n-button bg-[#1E2548] ">
                <h1 className="font-bold">Click here to Add</h1>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleTeacher;
