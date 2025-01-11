import React from "react";

import { PiStudentThin } from "react-icons/pi";
import axios from "axios";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";

import { RiAdminLine } from "react-icons/ri";
import { useState } from "react";
import { deleteStudentAPI_Admin } from "../../../Assets/backendAPIs";

function DeleteStudent() {
  const [formData, setFormData] = useState({
    rollNo: "",
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

      const url = deleteStudentAPI_Admin;
      const response = await axios.delete(url, {
        data: formData,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        toast.success(`${response.data.message}`);
      }
    } catch (error) {
      toast.warning(`${error.response.data.message}`);
    }
  };

  return (
    <div className="background">
      <div className="flex items-center justify-center background ">
        
      </div>

      <div className="top-0 right-0 flex items-center justify-center font-poppins background ">
        <div className="w-[480px] h-[580px]   flex flex-col justify-center items-start gap-8 mb-40 background">
          <div className="flex w-screen gap-4">
            <h1 className="flex items-center justify-center gap-4 text-4xl font-extrabold">
              Delete Student <PiStudentThin />
            </h1>
          </div>

          <form onSubmit={submitHandler} className="flex flex-col w-full gap-4">
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

            <div className="">
              <button className="text-white input-n-button bg-[#1E2548] ">
                <h1 className="flex items-center justify-center gap-1 font-bold">
                  Click here to Delete <MdDeleteForever />
                </h1>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DeleteStudent;
