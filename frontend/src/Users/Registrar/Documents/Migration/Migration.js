import React from "react";
import { useState } from "react";
import { useEffect } from "react";
// import { columns } from "./Columns";
import { DataTable } from "../../cn/Data-table";
import { Button } from "../../../../Assets/ui/button";
import axios from "axios";
import { ThreeCircles } from "react-loader-spinner";
import { toast } from "react-toastify";
import {
  downloadMultipleMCsAPI_Registrar,
  getCoursesAPI_Admin,
  getCoursesAPI_Registrar,
  getPassedStudentsAPI_Registrar,
} from "../../../../Assets/backendAPIs";
import MigrationTable from "./MigrationTable";

const Migration = () => {
  const [showTable, setShowTable] = useState(false);
  const [courseInputOptions, setCourseInputOptions] = useState("");
  const [loader, setLoader] = useState(false);
  const [showFirstInput, setShowFirstInput] = useState(false);
  const [student, setStudent] = useState([]);

  const [formData, setFormData] = useState({
    course: "",
  });

  useEffect(() => {
    // Make a request to backend for data of field 1 course
    (async () => {
      setLoader(true);
      try {
        const url = getCoursesAPI_Registrar;
        const response = await axios.get(url, { withCredentials: true });
        const courses = response.data.data;
        setCourseInputOptions(courses);
        setShowFirstInput(true);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
        setCourseInputOptions("");
        setShowFirstInput(false);
      }
    })();
  }, []);

  const handleChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  const extractRollNos = (data) => {
    // Create an array of roll numbers using map
    const rollNos = data.map((student) => student.rollNo);
    return rollNos;
  };
  const handleFormSubmit = async () => {
    try {
      const url = `${getPassedStudentsAPI_Registrar}?course=${formData.course}`;
      const response = await axios.get(url, {
        withCredentials: true,
      });

      console.log("response -> ", response);

      if (response.status === 200) {
        setStudent(response.data.data);
        setShowTable(true);
      }
    } catch (error) {
      toast.warning(error.response.data.message);
      console.error("Error fetching dropdown options:", error);
    }
  };

  const downloadMultipleHandler = async () => {
    console.log("download multiple handler");
    try {

      const rollNumbersArray = extractRollNos(student);
      const apiUrl = downloadMultipleMCsAPI_Registrar;

      const response = await axios.get(apiUrl, {
        withCredentials: true,
        params: { rollNos: rollNumbersArray },
        responseType: "blob",
      });

      console.log("response --> ", response);

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Migration_Certificates.pdf"); // Set the filename
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success(response.data.message);
    } catch (error) {
      toast.warning(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center w-screen h-screen overflow-y-auto bg-lavender font-poppins text-black-blue background ">
      {!showTable ? (
        <div className="">
          <div className="flex justify-center mt-36">
            <div className="w-full max-w-sm p-4 space-y-6 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-200 dark:border-gray-300">
              <h5 className="text-xl font-medium text-black-blue">
                Select Fields for Migration Certificate
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

              {/* 1st input  */}
              {showFirstInput && (
                <div>
                  <h1> Select Course </h1>

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
                    {courseInputOptions.map((course, index) => (
                      <option key={index} value={course.name}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                onClick={handleFormSubmit}
                type="submit"
                className="w-full text-white bg-black-blue  focus:ring-4 
            focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5
             text-center bg-text-black-blue "
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-[55rem] ">
          <div className="flex justify-center pt-10">
            <Button onClick={downloadMultipleHandler}>
              {" "}
              Download for All Students{" "}
            </Button>{" "}
          </div>
          <div className="container justify-center overflow-auto mb-11 py-7">
            {/* <DataTable columns={columns} data={studentsData} /> */}
            <MigrationTable data={student} course={formData.course} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Migration;
