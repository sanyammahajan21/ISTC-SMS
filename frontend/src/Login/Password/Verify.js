import { sendEmailVerificationOtpAPI } from "../../Assets/backendAPIs";
import { Button } from "../../Assets/ui/button";
import React from "react";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../../Assets/ui/input-otp"

import { toast } from "react-toastify";

import axios from "axios";

const Verify = () => {
  const [showotp, setShowotp] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    otp: "",

  });
  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  const sendOtpHandler = async () => {
    try {
      const url = sendEmailVerificationOtpAPI;
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
  }

  return (
    <div className="flex flex-col w-screen h-screen">
      <div className="flex flex-col items-center justify-center h-56 bg-black-blue ">
        <div className="font-sans font-semibold text-white text-5xl">
          Indo-Swiss Training Centre
        </div>
        <div className="font-normal text-white text-5xl">CSIR-CSIO</div>

        <div className="text-4xl font-normal text-white pb-2">Chandigarh</div>
      </div>
      <div className="flex flex-col items-center justify-center w-screen h-screen  font-poppins background">

        {/* Email */}
        <div className=" w-[380px] mb-5">
          <label>
            <p className="text-lg font-bold mb-2">
              Email address <sup className="text-pink-500">*</sup>
            </p>

            <input
              required
              type="email"
              value={formData.email}
              onChange={changeHandler}
              placeholder="name@email.com"
              name="email"
              className="text-lg bg-white input-n-button "
            ></input>
          </label>
        </div>
        {/* button */}
        <div className="flex ml-64">
          <Button onClick={sendOtpHandler}> Send OTP</Button>
        </div>
        <div>
          <label>
            <p className="text-lg font-bold mb-1">
              Enter OTP <sup className="text-pink-500">*</sup>
            </p>
            <div className="bg-gray-200 rounded-2xl overflow-hidden mt-2 mb-8">
              <InputOTP maxLength={6}>
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

          <div className="flex justify-center ">
            <Button> Submit </Button>
          </div>
        </div>


      </div>
    </div>
  );
};

export default Verify;
