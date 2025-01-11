import {
  sendVerificationOtpAPI,
  verifyEmailAPI,
  verifyOtpAPI,
} from "../../Assets/backendAPIs";
import { Button } from "../../Assets/ui/button";
import React from "react";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../Assets/ui/input-otp";
import { toast } from "react-toastify";
import axios from "axios";
import { PiStudentThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";


const Verify = () => {
  const navigate = useNavigate();
  const [showOTPFields, setShowOTPFields] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });
  // General change handler for form inputs
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Custom handler for OTP input
  const handleOTPChange = (otpValue) => {
    setFormData((prevData) => ({
      ...prevData,
      otp: otpValue,
    }));
    console.log(formData);
  };

  const sendOtpHandler = async (event) => {
    event.preventDefault()
    try {
      const url = sendVerificationOtpAPI;
      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        setShowOTPFields(true);
      }
    } catch (error) {
      toast.warning(error.response.data.message);
    }
  };

  const submitOtpHandler = async (event) => {
    event.preventDefault()
    try {
      event.preventDefault()
      let response = await axios.post(verifyOtpAPI, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        event.preventDefault()
        response = await axios.post(verifyEmailAPI, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }); console.log(response)
      }

      if (response.status === 200) {
        event.preventDefault()
        toast.success(response.data.message);
        // navigate(`/`);
      }
    } catch (error) {
      toast.warning(error.response.data.message);
    }
  };

  return (
    <div className="overflow-auto h-screen">
      <div className="flex flex-col items-center justify-center h-52 bg-black-blue ">
        <div className="font-sans font-semibold text-white text-5xl">
          Indo-Swiss Training Centre
        </div>
        <div className="font-normal text-white text-5xl">CSIR-CSIO</div>

        <div className="text-4xl font-normal text-white pb-2">Chandigarh</div>
      </div>
      <div className="top-0 right-0 flex justify-center h-screen font-poppins background ">
        <div className="w-[480px] pt-7   flex flex-col  gap-8 mb-40">
          <div className="flex w-screen gap-4 mt-8">
            <h1 className="flex items-center justify-center gap-4 text-4xl font-extrabold">
              Verify Your Email <PiStudentThin />
            </h1>
          </div>

          <form className="flex flex-col w-full gap-4">
            {/* email */}
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

            {/* button */}
            <div className="flex ml-96">
              <Button onClick={sendOtpHandler}> Send OTP</Button>
            </div>

            {/* otp */}
            {showOTPFields && (
              <div>
                {" "}
                <div className="">
                  <label>
                    <p className="text-lg font-bold mb-1">
                      Enter OTP <sup className="text-pink-500">*</sup>
                    </p>
                    <div className=" mt-2 mb-8 ">
                      <InputOTP
                        maxLength={6}
                        className=""
                        onChange={handleOTPChange}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </label>
                </div>
                <button className="text-white input-n-button bg-[#1E2548] ">
                  <h1 className="font-bold" onClick={submitOtpHandler}>
                    Submit
                  </h1>
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Verify;
