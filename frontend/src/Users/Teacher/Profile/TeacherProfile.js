import React from "react";
import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { ImProfile } from "react-icons/im";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { CitySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import {
  showProfileDetails_Teacher,
  checkProfileEditAllowed_Teacher,
  updateProfileAPI_Teacher,
} from "../../../Assets/backendAPIs";
import { Button } from "../../../Assets/ui/button";

function TeacherProfile() {
  const [countryid, setCountryid] = useState(101);
  const [stateid, setstateid] = useState(0);
  const [isdisabled, setIsDisabled] = useState(true);
  const [startDate, setStartDate] = useState("04/23/2005");
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    motherName: "",
    contactNo: "",
    DOB: "",
    email: "",
    gender: "",
    address: "",
    state: "",
    city: "",
    pinCode: "",
    image: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const url = showProfileDetails_Teacher;
        const response = await axios.get(url, {
          withCredentials: true,
        });
        const data = response.data.data;
        // console.log("profile daata", data.name);
        setFormData({
          name: data.name || "",
          fatherName: data.fatherName || "",
          motherName: data.motherName || "",
          contactNo: data.contactNo || "",
          email: data.email || "",
          gender: data.gender || "",
          address: data.address || "",
          state: data.state || "",
          city: data.city || "",
          pinCode: data.pinCode || "",
          DOB: data.dob || "",
          image: data.image || "",
        });
        // console.log("formData", formData.name);
      } catch (error) {
        console.error("Error fetching profile options:", error);
      }
    })();
  }, []);

  function handleChange(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
    console.log(formData)
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      image: file, // Store the image file object
    });
  };

  const handleEditClick = async () => {
    try {
      const url = checkProfileEditAllowed_Teacher;
      const response = await axios.get(url, { withCredentials: true });

      if (response.data.data) {
        // If approved, enable the form
        toast.success(response.data.message);
        setIsDisabled(false);
      } else if (!response.data.data) {
        toast.warning(response.data.message);
        // Popup for requesting the admin to allow profile edit
      }
    } catch (error) {
      toast.warning(error.response.data.message);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      formData.DOB = startDate;

      const url = updateProfileAPI_Teacher;
      const response = await axios.put(url, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(formData);
      if (response.status === 200) {
        toast.success(`${response.data.message}`);
      }
    } catch (error) {
      toast.warning(`${error.response.data.message}`);
    }
  };

  return (
    <div className="flex overflow-auto bg-lavender font-poppins text-black-blue background w-screen h-screen">
      {/*Teacher Profile Form */}
      <div className=" flex justify-evenly ">
        <form
          onSubmit={handleSubmit}
          className=" flex  flex-wrap w-[75rem ]"
          disabled={isdisabled}
        >
          <div className="h-screen font-poppins gap-y-2 flex-col justify-center mx-auto w-[90rem] item-center">
            <h1 className="flex items-center justify-center gap-4 mb-3 text-lg font-bold">
              Edit Your Profile <ImProfile />
            </h1>
            <div className="flex justify-evenly">
              <div className="w-150vh">
                {/* Name */}
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Full Name <sup className="text-pink-500">*</sup>
                  </label>
                  <input
                    type="text"
                    id="name"
                    disabled
                    value={formData.name}
                    name="name"
                    onChange={handleChange}
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-gray-300"
                    required=""
                  />
                </div>

                {/* Father's Name  */}
                <div className="mb-4">
                  <label
                    htmlFor="fatherName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Father's Name <sup className="text-pink-500">*</sup>
                  </label>
                  <input
                    type="text"
                    id="fatherName"
                    disabled={isdisabled}
                    value={formData.fatherName}
                    name="fatherName"
                    onChange={handleChange}
                    className={`border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  ${
                      isdisabled ? "bg-gray-300" : "bg-white"
                    }`}
                    required=""
                  />
                </div>

                {/* Mother's Name   */}
                <div className="mb-4">
                  <label
                    htmlFor="motherName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Mother's Name <sup className="text-pink-500">*</sup>
                  </label>
                  <input
                    type="text"
                    id="motherName"
                    disabled={isdisabled}
                    value={formData.motherName}
                    name="motherName"
                    onChange={handleChange}
                    className={`border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500   ${
                      isdisabled ? "bg-gray-300" : "bg-white"
                    }`}
                    required=""
                  />
                </div>

                {/* Contact number */}
                <div className="mb-4">
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
                    disabled={isdisabled}
                    maxLength={10}
                    value={formData.contactNo}
                    name="contactNo"
                    onChange={handleChange}
                    className={`border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500   ${
                      isdisabled ? "bg-gray-300" : "bg-white"
                    }`}
                    required=""
                  />
                </div>

                {/* Gender */}
                <div className=" mx-auto mb-5">
                  <label
                    htmlFor="gender"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Gender <sup className="text-pink-500">*</sup>
                  </label>
                  <select
                    id="gender"
                    value={formData.gender}
                    disabled={isdisabled}
                    onChange={handleChange}
                    name="gender"
                    className={`border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500   ${
                      isdisabled ? "bg-gray-300" : "bg-white"
                    }`}
                  >
                    <option selected="">Choose</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                {/* Date Of birth */}
                {/* <div disabled={isdisabled} className={``}>
                  <label
                    htmlFor="DOB"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Date Of Birth <sup className="text-pink-500">*</sup>
                  </label>
                  <DatePicker
                    disabled={isdisabled}
                    onChange={(e) => {
                      formData.DOB = e;
                    }}
                    value={formData.DOB}
                    className={`border border-gray-300 text-gray-900 
            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
             dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
              dark:focus:ring-blue-500 dark:focus:border-blue-500  ${
                isdisabled ? "bg-gray-300" : "bg-white"
              }`}
                    selected={startDate}
                   
                  />
                </div> */}
                <div className="flex items-start mb-5"></div>
              </div>

              <div className="w-150vh">
                {/* Email */}
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email <sup className="text-pink-500">*</sup>
                  </label>
                  <input
                    type="email"
                    id="email"
                    disabled
                    value={formData.email}
                    placeholder="abcd@gmail.com"
                    name="email"
                    onChange={handleChange}
                    className={`border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 bg-gray-300    `}
                    required=""
                  />
                </div>

                {/* Select state and city */}
                <div disabled={isdisabled}>
                  <h6>
                    State <sup className="text-pink-500">*</sup>
                  </h6>
                  <div
                    className={`rounded-xl ${
                      isdisabled ? "bg-gray-300" : "bg-white"
                    }`}
                  >
                    <StateSelect
                      countryid={countryid}
                      disabled={isdisabled}
                      className={`${isdisabled ? "bg-gray-300" : "bg-white"}`}
                      onChange={(e) => {
                        setstateid(e.id);
                        formData.state = e.name;

                      }}
                      value={formData.state}
                      placeHolder="Select State"
                    />
                  </div>

                  <h6>
                    City <sup className="text-pink-500">*</sup>
                  </h6>
                  <div
                    className={`rounded-xl ${
                      isdisabled ? "bg-gray-300" : "bg-white"
                    }`}
                  >
                    <CitySelect
                      countryid={countryid}
                      stateid={stateid}
                      disabled={isdisabled}
                      value={formData.city}
                      className={`${isdisabled ? "bg-gray-300" : "bg-white"}`}
                      onChange={(e) => {
                        formData.city = e.name;
                      }}
                      placeHolder="Select City"
                    />
                  </div>
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
                    disabled={isdisabled}
                    value={formData.address}
                    name="address"
                    onChange={handleChange}
                    className={` border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
                     ${isdisabled ? "bg-gray-300" : "bg-white"}`}
                    required=""
                  />
                </div>

                {/* Pincode */}
                <div className="mb-5 pb-5">
                  <label
                    htmlFor="pinCode"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Pincode <sup className="text-pink-500">*</sup>
                  </label>
                  <input
                    type="number"
                    id="pinCode"
                    disabled={isdisabled}
                    value={formData.pinCode}
                    name="pinCode"
                    onChange={handleChange}
                    maxLength={10}
                    className={`border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  ${
                      isdisabled ? "bg-gray-300" : "bg-white"
                    }`}
                    required=""
                  />
                </div>

                {/* image */}
                <div disabled={isdisabled} className={``}>
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
                    disabled={isdisabled}
                    name="image"
                    onChange={handleImageChange}
                    className={` border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500  ${
                      isdisabled ? "bg-gray-300" : "bg-white"
                    }`}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              {!isdisabled && (
                <div>
                  <button
                    type="submit"
                    className="mt-4 text-white bg-black-blue 
              focus:ring-4 focus:outline-none focus:ring-blue-300
              font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center
              mb-28"
                  >
                    Submit
                  </button>{" "}
                  <p> *Once sumitted, you cannot change again</p>{" "}
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
      <div className="mt-6 mr-10 flex justify-center ">
        <Button onClick={handleEditClick}> Edit Profile</Button>
      </div>
    </div>
  );
}

export default TeacherProfile;
