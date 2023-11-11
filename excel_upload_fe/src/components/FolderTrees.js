import React, { useState } from "react";
import "./FolderTrees.css";
import BatchFolder from "./Folders/BatchFolder";
import DevFolder from "./Folders/DevFolder";
//import folderTree from "./UploadZipFile";
//import axios, { AxiosResponse } from "axios";

function FolderTrees({ folderTrees }) {
  const [checkedBatchFolders, setCheckedBatchFolders] = useState([]);
  const [checkedDevFolders, setCheckedDevFolders] = useState([]);
  const updateCheckedBatchFolders = (data) => {
    setCheckedBatchFolders(data);
  };
  const updateCheckedDevFolders = (data) => {
    setCheckedDevFolders(data);
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
        // updateCheckedBatchFolders={updateCheckedDevFolders}
      ></DevFolder>

      {/* <BatchFolder folderTrees={folderTrees}></BatchFolder>
      <BatchFolder folderTrees={folderTrees}></BatchFolder>
      <BatchFolder folderTrees={folderTrees}></BatchFolder> */}
    </div>
  );
}

export default FolderTrees;
