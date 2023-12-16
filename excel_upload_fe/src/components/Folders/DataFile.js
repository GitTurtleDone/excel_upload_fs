import React, { useState } from "react";
import FileContainer from "./FileContainer";
import axios from "axios";
function DataFile({
  folderTrees,
  checkedBatchFolders,
  checkedDevFolders,
  checkedSBDFolders,
  checkedDataFiles,
  updateCheckedDataFiles,
}) {
  const processDataFiles = () => {
    console.log("In DataFile.js");
  };
  return (
    <div>
      <button className="processButton" onClick={processDataFiles}>
        Process
      </button>
      <h6> Data Files</h6>
      <FileContainer />
    </div>
  );
}
export default DataFile;
