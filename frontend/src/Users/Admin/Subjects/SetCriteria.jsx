

import { PiStudentThin } from "react-icons/pi";
import "react-toastify/dist/ReactToastify.css";
import { allotSubjectToTeacherAPI_Admin, getCoursesAPI_Admin, getSubjectsAPI_Admin } from "../../../Assets/backendAPIs";
import React, { useState } from "react";
import { useEffect } from "react";
import { getSubjectsAPI_Registrar } from "../../../Assets/backendAPIs";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
import { toast } from "react-toastify";

function SetCriteria() {
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    course: "",
    semester: "",
    subject: "",
    email: "",
  });



  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      setLoader(true);
      const url = allotSubjectToTeacherAPI_Admin;

      const response = await axios.put(url, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        setLoader(false);
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
                Set Attendance Criteria <PiStudentThin />
              </h1>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-sm p-4 space-y-6 justify-center bg-indigo-50 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-200 dark:border-gray-300">
               

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
                      <p className="text-lg font-bold mb-6">
                        Set Attendance % <sup className="text-pink-500">*</sup>
                      </p>

                      <input
                        required
                        type="number"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="75"
                        name="email"
                        className="text-lg bg-white input-n-button  text-center "
                      ></input>
                    </label>
                  </div>
                </form>
               

                <button onClick={submitHandler} className="text-white input-n-button  bg-[#1E2548] ">
                  <h1 className="font-bold" >Submit</h1>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetCriteria;
