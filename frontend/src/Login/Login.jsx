import React from "react";
import "./Login.css";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "../Assets/ui/button";
import axios from "axios";
import { toast } from "react-toastify";
import { loginAPI, verifyTokenAPI } from "../Assets/backendAPIs";
import "reactjs-popup/dist/index.css";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../Assets/ui/alert-dialog";

function LoginModal({ setIsLoggedIn, isLoggedIn, setUserRole }) {
  const [selectedRole, setSelectedRole] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const userRole = formData.role;
    setUserRole(userRole);
  }, []);

  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      formData.role = selectedRole;

      const url = loginAPI;
      const response = await axios.post(url, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      localStorage.setItem(
        "accessToken",
        JSON.stringify(response.data.accessToken)
      );

      if (response.data.data === true) {
        setIsLoggedIn(true);
        toast.success(`${response.data.message}`);
        navigate(`/${response.data.user.role}`); 
      }
    } catch (error) {
      if (error.response.data.data === false) {
        setShowAlert(true);
      }
      toast.warning(`${error.response.data.message}`);
    }
  };

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function handlerChange(e) {
    e.preventDefault();
    setSelectedRole(e.target.value);
    setUserRole(e.target.value);
  }

  return (
    <div className="flex flex-col w-screen h-screen overflow-auto">
      <div className="flex flex-col items-center justify-center h-96 bg-black-blue">
     

        {/* <Button
          className="flex justify-end ml-[1600px]"
          onClick={() => navigate("/registration")}
        >
          {" "}
          Registration{" "}
        </Button> */}
        <div className="font-sans font-semibold text-white text-8xl">
          Indo-Swiss Training Centre
        </div>
        <div className="font-normal text-white text-7xl">CSIR-CSIO</div>

        <div className="text-4xl font-normal text-white pb-2">Chandigarh</div>
      </div>

      <div className="flex items-center justify-center w-screen h-screen py-10 font-poppins background">
        <div className="flex flex-col items-start justify-center gap-8 modal-box bg-[#9fa4d2] ">
          <div className="flex w-full gap-4">
            <h1 className="text-4xl font-medo">Login As</h1>
            <select
              className="bg-inherit"
              name="role"
              id="role"
              value={selectedRole}
              onChange={handlerChange}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="registrar">Registrar</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </div>

          <form onSubmit={submitHandler} className="flex flex-col w-full gap-4">
            <div>
              <label>
                <p className="">
                  Email address <sup className="text-pink-500">*</sup>
                </p>

                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={changeHandler}
                  placeholder="name@email.com"
                  name="email"
                  className="bg-transparent input-n-button input-field"
                ></input>
              </label>
            </div>

            <div>
              <label className="relative">
                <p>
                  Password <sup className="text-pink-500">*</sup>
                </p>

                <input
                  required
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={changeHandler}
                  placeholder="********"
                  name="password"
                  autoComplete="on"
                  className="relative input-n-button"
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

                <p
                  className="ml-auto text-xs text-blue-100 max-w-max cursor-pointer mt-3 "
                  onClick={() => navigate("/reset")}
                >
                  Forgot Password
                </p>
              </label>
            </div>

            <div>
              {" "}
              <button
                className="text-white input-n-button bg-black-blue"
                onClick={() => {
                  isLoggedIn = true;
                }}
              >
                {" "}
                Login{" "}
              </button>{" "}
            </div>
          </form>
        </div>
      </div>

      {showAlert && (
        <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Your Email is not Verified</AlertDialogTitle>
              <AlertDialogDescription>
                Please Verify Your Email
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setShowAlert(false)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction onClick={() => navigate("/verify")}>
                Verify
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}

export default LoginModal;
