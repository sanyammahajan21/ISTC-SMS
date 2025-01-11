import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import StudentTable from "./StudentTable";
import { getSubjectsForTeacherAPI } from "../../../Assets/backendAPIs";


const DragDropResult = (props) => {
  const selectedSemester = props.value;
  const [showResult, setShowResult] = useState(true);
  const [loading, setLoading] = useState(false);
  const [newFile, setFile] = useState(null);
  const [studentData, setStudentData] = useState(null);

  let user = localStorage.getItem("user");
  user = JSON.parse(user);

  const onDrop = (acceptedFiles) => {
    setFile(acceptedFiles[0]);
  };

  // let studentsdata;
  const showResultHandler = async () => {
    try {
      setShowResult(false);

      const formData = new FormData();
      formData.append("userId", user.userId);
      formData.append("semesterNo", selectedSemester);

      const url = `${getSubjectsForTeacherAPI}?teacherId=${user.userId}`;
      const response = await axios.get(url);

      localStorage.setItem(
        "studentsdata",
        JSON.stringify(response.data.result)
      );

      if (response.status === 200) {
        // setStudentData(studentsdata);
        toast.success(`${response.data.message}`);
      }
    } catch (error) {
      toast.warning(`${error.response.data.message}`);
    }
  };

  // style={{cursor: 'pointer', padding: '20px', border: '2px dashed #aaa', borderRadius: '5px',  margin-left:"420px",textAlign: 'center',width:'420px' }
  return (
    <div>
      {showResult ? (
        <div className="flex items-center justify-center mx-auto mr-40 mt-44">
          {/* Show Result */}
          <div className="mt-4 ml-36">
            <h1 className="mt-16 text-2xl font-bold ml-14">View Result</h1>
            <div className="flex items-center justify-center">
              <button
                className="w-[180px] text-white bg-black-blue  focus:ring-4 
            focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5
             text-center bg-text-black-blue mt-5 ml-10 "
                onClick={showResultHandler}
              >
                Show Result 
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div>Result is Showing of semester {selectedSemester}</div>

          <StudentTable/>
        </div>
      )}
    </div>
  );
};
export default DragDropResult;
