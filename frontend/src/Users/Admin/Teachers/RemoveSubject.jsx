import { PiStudentThin } from "react-icons/pi";
import "react-toastify/dist/ReactToastify.css";
import {
  getSubjectsAPI_Admin,
  removeSubjectFromTeacherAPI_Admin,
} from "../../../Assets/backendAPIs";
import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
import { toast } from "react-toastify";
import { Button } from "../../../Assets/ui/button";

function RemoveSubject() {
  const [subjectData, setSubjectData] = useState([]);
  const [subjectInputOptions, setSubjectInputOptions] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showFirstInput, setShowFirstInput] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [formData, setFormData] = useState({
    course: "",
    email: "",
    index: "",
  });

  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true);
      return;
    }
    (async () => {
      try {
        const url = `${getSubjectsAPI_Admin}?teacher=${formData.email}`;
        const response = await axios.get(url, { withCredentials: true });
        
        setLoader(true);
        setSubjectData(response.data.data);

        const subjectOptions = [];
        subjectData.forEach((sub) => {
          subjectOptions.push(
            `${sub.course} : Semester ${sub.semester} : ${sub.subject}`
          );
        });

        setSubjectInputOptions(subjectOptions);
        setShowFirstInput(true);
        setLoader(false);
      } catch (error) {
        toast.warning(error.response.data.message);
      }
    })();
  }, [fetch]);

  useEffect(() => {
    if (subjectData.length > 0) {
      const subjectOptions = subjectData.map(
        (sub) => `${sub.course} : Semester ${sub.semester} : ${sub.subject}`
      );
      setSubjectInputOptions(subjectOptions);
    }
  }, [subjectData]);


  const submitHandler = async (event) => {
    try {
      event.preventDefault();

      const formData2 = new FormData();
      formData2.append("email", formData.email);
      formData2.append("subjectIndex", formData.index-1);
      

      const url = removeSubjectFromTeacherAPI_Admin;
      const response = await axios.put(url, formData2, {
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
  function handleChange(event) {
    const selectedOptionIndex = event.target.selectedIndex;
    formData.index = selectedOptionIndex;
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  return (
    <div className="flex bg-lavender font-poppins text-black-blue background">
      <div className="w-screen h-screen mt-3 ml-6">
        <div className="flex items-center justify-center overscroll-auto font-poppins">
          <div className="flex flex-col justify-center gap-8 pt-4 ">
            <div className="flex justify-center w-screen gap-4">
              <h1 className="flex items-center justify-center gap-4 text-4xl font-extrabold">
                Remove Subjects <PiStudentThin />
              </h1>
            </div>
            <div className="flex justify-center">
              <div className="justify-center w-full max-w-sm p-4 space-y-6 border border-gray-200 rounded-lg shadow bg-indigo-50 sm:p-6 md:p-8 dark:bg-gray-200 dark:border-gray-300">
                <h5 className="text-xl font-medium text-black-blue">
                  Select Fields
                </h5>

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
                <form className="flex flex-col w-full gap-4">
                  <div className="">
                    <label>
                      <p className="text-lg font-bold">
                        Email address <sup className="text-pink-500">*</sup>
                      </p>

                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@email.com"
                        name="email"
                        className="text-lg bg-white input-n-button"
                      ></input>
                    </label>
                  </div>
                </form>

                <div className="flex justify-end">
                  <Button onClick={() => setFetch(!fetch)}>
                    {" "}
                    Fetch Subjects
                  </Button>
                </div>

                {/* 1st input  */}
                {showFirstInput && (
                  <div>
                    <h1> Alloted Courses </h1>

                    <select
                      id="course"
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 
   text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
   block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400
   text-black-blue dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="">--Select an option--</option>
                      {subjectInputOptions.map((course, index) => (
                        <option key={index} value={course}>
                          {course}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <button
                  onClick={submitHandler}
                  className="text-white input-n-button bg-[#1E2548] "
                >
                  <h1 className="font-bold">Click here to Remove</h1>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RemoveSubject;
