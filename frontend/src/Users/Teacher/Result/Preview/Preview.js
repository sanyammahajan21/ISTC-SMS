import React from "react";
import { DataTable } from "../../../../Assets/ui/DataTable";
import { ReviewColumns } from "./Reviewcolumns";
import { Button } from "../../../../Assets/ui/button";

const Preview = ({setshowReview, students}) => {
  return (
    <div>
      <div
        id="crud-modal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed items-center justify-center w-full max-h-full mx-auto overflow-x-hidden overflow-y-scroll z-150"
      >
        <div className=" flex flex-col  items-center  mt-10  mb-10 max-h-[50rem]  ">
          <DataTable columns={ReviewColumns} data={students} />
          <div className="flex items-center">
            <Button onClick={() => setshowReview(false)}>Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
