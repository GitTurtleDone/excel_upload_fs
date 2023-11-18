import React, { useState } from "react";
import "./FolderTrees.css";
import BatchFolder from "./Folders/BatchFolder";
import DevFolder from "./Folders/DevFolder";
import SBDFolder from "./Folders/SBDFolder";

function FolderTrees({ folderTrees, folderTreeNames }) {
  const [checkedBatchFolders, setCheckedBatchFolders] = useState([]);
  const [checkedDevFolders, setCheckedDevFolders] = useState([]);
  const [checkedSBDFolders, setCheckedSBDFolders] = useState([]);
  const updateCheckedBatchFolders = (data) => {
    setCheckedBatchFolders(data);
  };
  const updateCheckedDevFolders = (data) => {
    setCheckedDevFolders(data);
    // console.log(`Checked Dev Folders: `, data);
  };
  const updateCheckedSBDFolders = (data) => {
    //setCheckedSBDFolders(data);
    console.log(`Checked SBD Folders: `, data);
  };
  return (
    <div className="folderTreeContainer">
      <BatchFolder
        folderTrees={folderTrees}
        updateCheckedBatchFolders={updateCheckedBatchFolders}
      ></BatchFolder>
      <DevFolder
        folderTrees={folderTrees}
        checkedBatchFolders={checkedBatchFolders}
        updateCheckedDevFolders={updateCheckedDevFolders}
      ></DevFolder>
      <SBDFolder
        folderTrees={folderTrees}
        checkedBatchFolders={checkedBatchFolders}
        checkedDevFolders={checkedDevFolders}
        updateCheckedSBDFolders={updateCheckedSBDFolders}
      ></SBDFolder>
    </div>
  );
}

export default FolderTrees;
