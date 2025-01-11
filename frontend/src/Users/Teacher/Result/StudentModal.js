import React from "react";
import { useState , useEffect} from "react";

const StudentModal = ({ showModal, setShowModal, student, onNext  , onPrev, index}) => {
    // Define state object to hold form values
    const [formData, setFormData] = useState({
      midSemMarks: "",
      endSemMarks: "",
      attendance: "",
      internals: ""
    });
  // Update form data when student prop changes
  useEffect(() => {
    if (student) {
      setFormData({
        midSemMarks: student.midSemMarks || "",
        endSemMarks: student.endSemMarks || "",
        attendance: student.attendance || "",
        internals: student.internals || ""
      });
    }
  }, [student]);

  // Handle change for all input fields
  const handleInputChange = (event, field) => {
    const value = event.target.value;
    setFormData({
      ...formData,
      [field]: value
    });
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex contai items-center justify-center overflow-auto bg-black bg-opacity-50 
         top-0 left-0 w-full h-full ">  
        {/* overlay css */}
          <div
            id="crud-modal"
            tabIndex={-1}
            aria-hidden="true"
            className=" overflow-y-auto overflow-x-hidden fixed  mx-auto z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              {/* Modal content */}
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Edit Student Grades
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="crud-modal"
                    onClick={() => setShowModal(false)}
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* Modal body */}
                <form className="p-4 md:p-5">
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="price"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Name
                      </label>
                      <h2 className="font-medium text-gray-900 dark:text-white">{student.name}</h2>

                     
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="price"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Roll No
                      </label>
                      <h2 className="font-medium text-gray-900 dark:text-white">{student.rollNo}</h2>
                     
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="price"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        MID SEM
                      </label>

                      <input
                        type="number"   
                        name="midSemMarks"
                        id="price"
                        // onChange={handleInputChange}
                        onChange={(event) => handleInputChange(event, index, 'midSemMarks')}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        value={formData.midSemMarks}
                        
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="price"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        END SEM
                      </label>
                      <input
                        type="number"
                        onChange={handleInputChange}
                        name="endSemMarks"
                        value={formData.endSemMarks}
                        id="price"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                       
                       
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="price"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        INTERNAL MARKS
                      </label>
                      <input
                        type="number"
                        name="internals"
                        onChange={handleInputChange}
                        value={formData.internals}
                        id="price"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        
                        
                      />
                    </div>
                    
                 
                   
                  </div>
                
                </form>
                <div className=" flex justify-between">
                  <button
                    // type="submit"
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    
                    Submit
                  </button>
                  <div>
                  <button
                  onClick={onPrev}
                    // type="submit"
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Previous
                  </button>
                  <button
                  onClick={onNext}
                    // type="submit"
                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Next 
                  </button>
                  </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentModal;
