import React, { useState } from "react";
import "./FolderTrees.css";
import BatchFolder from "./Folders/BatchFolder";
import DevFolder from "./Folders/DevFolder";
import SBDFolder from "./Folders/SBDFolder";
import DropdownMenu from "./Folders/DropdownMenu";

function FolderTrees({ folderTrees, folderTreeNames }) {
  const [checkedBatchFolders, setCheckedBatchFolders] = useState([]);
  const [checkedDevFolders, setCheckedDevFolders] = useState({});
  const [checkedSBDFolders, setCheckedSBDFolders] = useState({});
  const updateCheckedBatchFolders = (data) => {
    setCheckedBatchFolders(data);
    // const tempObj = { ...checkedDevFolders };
    // console.log("In Folder Tree Folder, checked Batch Folders:  ", data);
    // Object.entries(tempObj).forEach(([key, value]) => {
    //   if (!data.includes(key)) {
    //     console.log("In Batch Folder, key ", key);
    //     delete tempObj[key];
    //   }
    // });
    // setCheckedDevFolders(tempObj);
    // console.log(
    //   "In Folder Tree, checked Dev Folder Names: ",
    //   checkedDevFolders
    // );
  };
  const updateCheckedDevFolders = (data) => {
    setCheckedDevFolders(data);
    // console.log(`In Folder trees, checkedDevFolders after clicked: `, data);
  };
  const updateCheckedSBDFolders = (data) => {
    setCheckedSBDFolders(data);
    // console.log(`Checked SBD Folders after clicked: `, data);
  };
  return (
    <div className="folderTreeContainer">
      <BatchFolder
        folderTrees={folderTrees}
        checkedBatchFolders={checkedBatchFolders}
        checkedDevFolders={checkedDevFolders}
        checkedSBDFolders={checkedSBDFolders}
        updateCheckedBatchFolders={updateCheckedBatchFolders}
        updateCheckedDevFolders={updateCheckedDevFolders}
        updateCheckedSBDFolders={updateCheckedSBDFolders}
      ></BatchFolder>
      <DevFolder
        folderTrees={folderTrees}
        checkedBatchFolders={checkedBatchFolders}
        checkedDevFolders={checkedDevFolders}
        checkedSBDFolders={checkedSBDFolders}
        updateCheckedDevFolders={updateCheckedDevFolders}
        updateCheckedSBDFolders={updateCheckedSBDFolders}
      ></DevFolder>
      <SBDFolder
        folderTrees={folderTrees}
        checkedBatchFolders={checkedBatchFolders}
        checkedDevFolders={checkedDevFolders}
        checkedSBDFolders={checkedSBDFolders}
        updateCheckedSBDFolders={updateCheckedSBDFolders}
      ></SBDFolder>
      <DropdownMenu />
    </div>
  );
}

export default FolderTrees;
