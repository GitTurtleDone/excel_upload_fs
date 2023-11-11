import React, { useState } from "react";
import "./FolderTrees.css";
import BatchFolder from "./Folders/BatchFolder";
//import folderTree from "./UploadZipFile";
//import axios, { AxiosResponse } from "axios";

function FolderTrees({ folderTrees }) {
  return (
    <div className="folderTreeContainer">
      <BatchFolder folderTrees={folderTrees}></BatchFolder>
      <BatchFolder folderTrees={folderTrees}></BatchFolder>
      <BatchFolder folderTrees={folderTrees}></BatchFolder>
      <BatchFolder folderTrees={folderTrees}></BatchFolder>
    </div>
  );
}

export default FolderTrees;
