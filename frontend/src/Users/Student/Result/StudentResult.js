import React from "react";
import { RiAdminLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { FaDownload } from "react-icons/fa";
import StudentResultAfterSemester from "./StudentResultAfterSemester";
import axios from "axios";
import { toast } from "react-toastify";

function StudentResult() {
  const navigate = useNavigate();
  const [showTable, setShowTable] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState("1");

  let user = localStorage.getItem("user");
  user = JSON.parse(user);

  // Handler function to update selected semester
  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };
  useEffect(() => {
  }, [selectedSemester]);

  const handleFormSubmit = () => {
    setShowTable(true);
  };

  const DownloadResultHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("userId", user.userId);
      formData.append("semesterNo", selectedSemester);

      const url = "http://localhost:3000/api/v1/student/result/download";
      const response = await axios.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success(`${response.data.message}`);
      }
    } catch (error) {
      toast.warning(`${error.response.data.message}`);
    }
  }

  return (
    <div className="flex bg-lavender font-poppins text-black-blue">


      <div className="w-screen h-screen">
        <div className="">
          {!showTable ? (
            <div className="flex justify-center mt-36">
              <div className="w-full max-w-sm p-4 space-y-6 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-200 dark:border-gray-300">
                <h5 className="text-xl font-medium text-black-blue">
                  Select Semester
                </h5>

                <form className="max-w-sm mx-auto">
                  <label
                    htmlFor="semesters"
                    className="block mb-2 text-sm font-medium text-black-blue"
                  >
                    Semester{" "}
                  </label>
                  <select
                    id="semesters"
                    value={selectedSemester}
                    onChange={handleSemesterChange}
                    name="semesters"
                    className="bg-gray-50 border border-gray-300 
                 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400
                 text-black-blue dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option> 1</option>
                    <option> 2</option>
                    <option> 3</option>
                    <option> 4</option>
                    <option> 5</option>
                    <option> 6</option>
                    <option> 7</option>
                    <option> 8</option>
                  </select>
                </form>

                <button
                  onClick={handleFormSubmit}
                  type="submit"
                  className="w-full text-white bg-black-blue  focus:ring-4 
            focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5
             text-center bg-text-black-blue "
                >
                  Submit
                </button>
              </div>{" "}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4 mt-80">
              <button
                type="button"
                className="text-white bg-gradient-to-r bg-[#1E2548] 
                 hover:bg-gradient-to-br focus:ring-4 focus:outline-none
                  focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg
                   
     font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 "
              >
                Show Result
              </button>

              <button
                type="button"
                onClick={DownloadResultHandler}
                className="text-white bg-gradient-to-r bg-[#1E2548] 
                 hover:bg-gradient-to-br focus:ring-4 focus:outline-none
                  focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg
                   
     font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex justify-center items-center gap-3"
              >
                Download Result <FaDownload />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentResult;
