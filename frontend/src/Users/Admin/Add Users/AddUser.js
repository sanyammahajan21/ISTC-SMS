import React from "react";
import { PiStudentThin } from "react-icons/pi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { addTeacherAPI_Admin, addUserAPI_Admin } from "../../../Assets/backendAPIs";
import axios from "axios";
import { Label } from "../../../Assets/ui/label"
import { RadioGroup, RadioGroupItem } from "../../../Assets/ui/radio-group"





function AddUser() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role:"",
  });

  const submitHandler = async (event) => {
    event.preventDefault()
    try {
      const url = addUserAPI_Admin;

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
    })); console.log(formData)
  }
  return (
    <div>
      <div className="top-0 right-0 flex items-center justify-center overscroll-auto h-screen font-poppins background ">
        <div className="w-[480px] pt-7   flex flex-col justify-center items-start gap-8 mb-40">
          <div className="flex w-screen gap-4">
            <h1 className="flex items-center justify-center gap-4 text-4xl font-extrabold">
              Add New User <PiStudentThin />
            </h1>
          </div>

          <form  className="flex flex-col w-full gap-4">
          

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

            {/* Radio  */}
            <RadioGroup defaultValue="admin" onChange={changeHandler} name="role">
            <Label >Select Role  <sup className="text-pink-500">*</sup> </Label>   

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="admin" id="admin" />
                <Label htmlFor="admin">Admin</Label>     
             
                <RadioGroupItem value="registrar" id="registrar" />
                <Label htmlFor="registrar">Registrar</Label>

               
              </div>
            </RadioGroup>
           


            <button className="text-white input-n-button bg-[#1E2548] " onClick={submitHandler}>
              <h1 className="font-bold">Click here to Add </h1>
            </button>
          </form>
          

        </div>
      </div>
    </div>
  );
}

export default AddUser;
