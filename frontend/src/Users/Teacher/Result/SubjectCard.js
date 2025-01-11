import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {
  getSubjectsForTeacherAPI_Teacher,
  removeSubjectFromTeacherAPI_Admin,showMarksAPI_Teacher,
} from "../../../Assets/backendAPIs";
import { toast } from "react-toastify";
import { ThreeCircles } from "react-loader-spinner";
import StudentTable from "./StudentTable";

const SubjectCard = () => {
  const [showCard, setShowCard] = useState(false);
  const [students, setStudents] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [subjectInputOptions, setSubjectInputOptions] = useState("");
  const [loader, setLoader] = useState(false);
  const [showFirstInput, setShowFirstInput] = useState(false);

  const [formData, setFormData] = useState({
    index: "",
  });


  useEffect(() => {
    (async () => {
      setLoader(true);
      try {
        const url = getSubjectsForTeacherAPI_Teacher;
        const response = await axios.get(url, {
          withCredentials: true,
        });
        const subject = response.data.data;
        setSubjectData(subject);
  
        const subjectOptions = [];
        subjectData.forEach((sub) => {
          subjectOptions.push(
            `${sub.course} : Semester ${sub.semester} : ${sub.subject}`
            
          ) 
        });
        setSubjectInputOptions(subjectOptions);

        setShowFirstInput(true);
        setLoader(false);
      } catch (error) {
        toast.warning(error.response.data.message);
      }
    })();
  }, []);

  function handleChange(event) {
    const selectedOptionIndex = event.target.selectedIndex;
    formData.index = selectedOptionIndex;
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  useEffect(() => {
    if (subjectData.length > 0) {
      const subjectOptions = subjectData.map(
        (sub) => `${sub.course} : Semester ${sub.semester} : ${sub.subject}`
      );
      setSubjectInputOptions(subjectOptions);
    }
  }, [subjectData]);

  const handleFormSubmit = async () => {
    // setShowCard(true)
    try {
      const url = `${showMarksAPI_Teacher}?index=${formData.index-1}`;
      const response = await axios.get(url, { withCredentials: true });
      
      console.log(response.data.data);
      setStudents(response.data.data);
      setShowCard(true)
    } catch (error) {
      toast.warning(error.response.data.message);
    }
  };


  return (
    <div className="text-black-blue background h-screen w-screen">
      {!showCard ? (
        <div className="flex justify-center pt-36 ">
          <div className="w-full max-w-sm p-4 space-y-6 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-200 dark:border-gray-300">
                <h5 className="text-xl font-medium text-black-blue">
                  Select Subject for Marks
                </h5>



                {loader && (
                  (<ThreeCircles
                    visible={true}
                    height="100"
                    width="100"
                    color="#5247ba"
                    ariaLabel="three-circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />)
                )}

                {/* 1st input  */}
                {showFirstInput && (
                  <div>
                    <h1> Alloted Subjects </h1>

                    <select id="course" name="course" value={formData.course} onChange={handleChange} className="bg-gray-50 border border-gray-300 
                 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 
                 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400
                 text-black-blue dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
      ) : (
        <StudentTable studentsdata={students} index={formData.index-1} />
      )}
    </div>
  );
};

export default SubjectCard;
