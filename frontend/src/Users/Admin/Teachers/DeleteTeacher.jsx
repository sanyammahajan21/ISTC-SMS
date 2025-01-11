import React from "react";
import { PiStudentThin } from "react-icons/pi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiAdminLine } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import {
  addSingleStudentAPI_Admin,
  deleteTeacherAPI_Admin
} from "../../../Assets/backendAPIs";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";

function DeleteTeacher() {
  const [courseInputOptions, setCourseInputOptions] = useState("");
  const [showSecondInput, setShowSecondInput] = useState(false);
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      const url = deleteTeacherAPI_Admin;

      const response = await axios.delete(url, {
        data: formData,
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.warning(error.response.data.message);
    }
  };
  return (
    <div className="flex bg-lavender font-poppins text-black-blue background">
      <div className="w-full h-screen ml-6">
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
          <div className="w-[480px] pt-20  flex flex-col justify-center items-start gap-8 mb-40">
            <div className="flex w-screen gap-4">
              <h1 className="flex items-center justify-center gap-4 text-4xl font-extrabold">
                Delete Teacher <PiStudentThin />
              </h1>
            </div>

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
                    onChange={changeHandler}
                    placeholder="name@email.com"
                    name="email"
                    className="text-lg bg-white input-n-button"
                  ></input>
                </label>
              </div>

              {/* Add Courses */}

              <button className="text-white input-n-button bg-[#1E2548] ">
                <h1 className="font-bold">Click here to Delete</h1>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteTeacher;
