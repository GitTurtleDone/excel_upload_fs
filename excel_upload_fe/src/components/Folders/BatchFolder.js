import React, { useState } from "react";
import "./Folder.css";
import NameContainer from "./NameContainer";
import DevFolder from "./DevFolder";

// import HighlightableTextArea from "./HighlightableTextArea";
// import "codemirror/lib/codemirror.css";
// // import "codemirror/addon/display/rulers.css";
// import "codemirror/theme/material.css";
// import "codemirror/mode/javascript/javascript";
// import CodeMirror from "codemirror";

function BatchFolder({
  folderTrees,
  checkedBatchFolders,
  updateCheckedBatchFolders,
  checkedDevFolders,
  updateCheckedDevFolders,
}) {
  const [checkedDevFolderNames, setCheckedDevFolderNames] =
    useState(checkedDevFolders);
  const updateCheckedNames = (data) => {
    updateCheckedBatchFolders(data);
    setCheckedDevFolderNames((prevCheckedDevFolderNames) => {
      const tempObj = { ...prevCheckedDevFolderNames };
      Object.entries(tempObj).forEach(([key, value]) => {
        if (!data.includes(key)) {
          delete tempObj[key];
        }
        if (Array.isArray(value) && value.length === 0) delete tempObj[key];
      });

      console.log("In Batch Folders, checked Dev Folder Names: ", tempObj);
      return tempObj;
    });
    updateCheckedDevFolders(checkedDevFolderNames);
  };
  if (!folderTrees) {
    return <div>No folder trees available</div>;
  }

  const folderTreeNames = folderTrees.map((folderTree) => folderTree.Name);

  return (
    <div>
      <div>
        <button className="processButton">Process</button>
        <h6>Batch Level Folders</h6>
      </div>

      <NameContainer
        arrNames={folderTreeNames}
        arrCheckedNames={checkedBatchFolders}
        updateCheckedNames={updateCheckedNames}
      ></NameContainer>
    </div>
  );
}
export default BatchFolder;
