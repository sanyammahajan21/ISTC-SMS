import React from "react";
import { ImSearch } from "react-icons/im";
import { PiStudentThin } from "react-icons/pi";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { RiAdminLine } from "react-icons/ri";
import { useState } from "react";
import { toast } from "react-toastify";

function SearchStudent() {
  const [formData, setFormData] = useState({
    rollNo: "",
    name: "",
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

      let url;

      const response = await axios.post(url, formData, {
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

  return (
    <div>
     

      <div className="top-0 right-0 flex items-center justify-center h-screen w-screen font-poppins background">
        <div className="w-[480px] h-[580px]   flex flex-col justify-center items-start gap-8 mb-40 ">
          <div className="flex w-screen gap-4">
            <h1 className="flex items-center justify-center gap-4 text-4xl font-extrabold">
              Search Student <PiStudentThin />
            </h1>
          </div>

          <form onSubmit={submitHandler} className="flex flex-col w-full gap-4">
            <label>
              <p className="text-lg font-bold">
                Enter Name <sup className="text-pink-500">*</sup>
              </p>

              <input
                required
                type="text"
                value={formData.name}
                onChange={changeHandler}
                placeholder="Enter Your Name..."
                name="name"
                className="text-lg bg-white input-n-button"
              ></input>
            </label>
            <div className="">
              <label>
                <p className="text-lg font-bold">
                  Roll Number <sup className="text-pink-500">*</sup>
                </p>

                <input
                  required
                  type="number"
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
                <h1 className="flex items-center justify-center gap-2 font-bold">
                  Click here to Search <ImSearch />
                </h1>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SearchStudent;
