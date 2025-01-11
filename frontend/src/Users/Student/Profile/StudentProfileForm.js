import React, { useEffect } from "react";
import { useState } from "react";
// import DatePicker from 'react-date-picker';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { ImProfile } from "react-icons/im";
import { toast } from 'react-toastify';
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";

import "react-country-state-city/dist/react-country-state-city.css";

const StudentProfileForm = () => {
  const [image, setImage] = useState(null);
  const [countryid, setCountryid] = useState(101);
  const [stateid, setstateid] = useState(0);

  const [startDate, setStartDate] = useState("04/23/2005");
  const [formData, setFormData] = useState({
    name: "",
   
    contactNo: "",
   gender : "",
    DOB: "",
    fatherName: "",
    motherName: "",
    address: "",
    state: "",
    city: "",
    pinCode: "",
    userId: "",
    image : null
  });


  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  let user = localStorage.getItem("user");
  user = JSON.parse(user);

  function handleChange(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
      userId: user.userId,
    }));
  }



  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      image: file // Store the image file object
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      formData.DOB = startDate;

      const url = "http://localhost:3000/api/v1/student/profile/update";

      const response = await axios.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if(response.status === 200) {
        toast.success(`${response.data.message}`);
      }
      else if(response.status === 400){
        toast.warning(`${response.data.message}`)
      }
    } catch (error) {
      toast.warning(`${error.response.data.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="overflow-hidden">
      <div className="h-screen overflow-auto font-poppins gap-y-2">
        <div className="flex-col justify-center item-center">
          <div className="max-w-[420px] mx-auto">
            <div>
              <h1 className="flex items-center justify-center gap-4 mb-3 text-lg font-bold">
                Create Profile for Student  <ImProfile />
               
              </h1>

              {/* Name of student */}

              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full Name <sup className="text-pink-500">*</sup>
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  name="name"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  required=""
                />
              </div>
              <div className="flex items-start mb-5"></div>
            </div>
            <div>
              {/* Date Of birth */}
              <label
                htmlFor="DOB"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date Of Birth <sup className="text-pink-500">*</sup>
              </label>
              <DatePicker
                className=" bg-gray-50 border border-gray-300 text-gray-900 
            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
             dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
              dark:focus:ring-blue-500 dark:focus:border-blue-500"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />

              <div className="flex items-start mb-5"></div>

              {/* FatherName  */}
              <div>
                <label
                  htmlFor="fatherName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Father Name <sup className="text-pink-500">*</sup>
                </label>
                <input
                  type="text"
                  id="fatherName"
                  value={formData.fatherName}
                  name="fatherName"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div className="flex items-start mb-5"></div>

              {/* Mother's name */}
              <div className="">
                <label
                  htmlFor="motherName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mother Name <sup className="text-pink-500">*</sup>
                </label>
                <input
                  type="text"
                  id="motherName"
                  value={formData.motherName}
                  name="motherName"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div className="flex items-start mb-5"></div>

              {/* contact number */}
              <div>
                <label
                  htmlFor="contactNo"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Contact Number <sup className="text-pink-500">*</sup>
                </label>
                <input
                  type="number"
                  id="contactNo"
                  placeholder="+91"
                  maxLength={10}
                  value={formData.contactNo}
                  name="contactNo"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div className="flex items-start mb-5"></div>

              {/* Gender */}
              <div className="max-w-[420px] mx-auto mb-5">
                <label
                  htmlFor="gender"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Gender <sup className="text-pink-500">*</sup>
                </label>
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  name="gender"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option selected="">Choose</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {/* Address */}
              <div className="mb-5">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address <sup className="text-pink-500">*</sup>
                </label>
                <textarea
                  type="text"
                  id="address"
                  value={formData.address}
                  name="address"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>

              {/* Select state and city */}
              <div>
                <h6>
                  State <sup className="text-pink-500">*</sup>
                </h6>
                <StateSelect
                  countryid={countryid}
                  onChange={(e) => {
                    setstateid(e.id);
                    formData.state = e.name;
                  }}
                  placeHolder="Select State"
                />
                <div className="flex items-start mb-5"></div>
                <h6>
                  City <sup className="text-pink-500">*</sup>
                </h6>
                <CitySelect
                  countryid={countryid}
                  stateid={stateid}
                  onChange={(e) => {
                    formData.city = e.name;
                  }}
                  placeHolder="Select City"
                />
              </div>
              <div className="flex items-start mb-5"></div>

              {/* Pincode */}
              <div>
                <label
                  htmlFor="pinCode"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Pincode <sup className="text-pink-500">*</sup>
                </label>
                <input
                  type="number"
                  id="pinCode"
                  value={formData.pinCode}
                  name="pinCode"
                  onChange={handleChange}
                  maxLength={10}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>


              

              {/* image */}
              <div>
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  IMAGE<sup className="text-pink-500">*</sup>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="image"
                 
                  name="image"
                  onChange={handleImageChange }
                 
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  
                />
              </div>

              <button
                type="submit"
                className="w-[120px] text-white bg-black-blue  focus:ring-4 
                focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5
                 text-center bg-text-black-blue mt-7 mb-36 "
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default StudentProfileForm;
