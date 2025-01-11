import React from "react";
import { PiStudentThin } from "react-icons/pi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import {  addTeacherAPI_Admin} from "../../../Assets/backendAPIs";
import axios from "axios";

function AddTeacher() {
    const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const submitHandler = async () => {
    try {
     
      const url = addTeacherAPI_Admin;
      

      const response = await axios.post(url, formData, {
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
  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }
  return (
    <div>
      <div className="top-0 right-0 flex items-center justify-center overscroll-auto h-screen font-poppins background ">
        <div className="w-[480px] pt-7   flex flex-col justify-center items-start gap-8 mb-40">
          <div className="flex w-screen gap-4">
            <h1 className="flex items-center justify-center gap-4 text-4xl font-extrabold">
              Add New Teacher <PiStudentThin />
            </h1>
          </div>

          <form onSubmit={submitHandler} className="flex flex-col w-full gap-4">
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

            <button className="text-white input-n-button bg-[#1E2548] ">
              <h1 className="font-bold">Click here to Add </h1>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTeacher;
