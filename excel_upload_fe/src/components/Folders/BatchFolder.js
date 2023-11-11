import React, { useState } from "react";
import "./Folder.css";
import NameContainer from "./NameContainer";
// import HighlightableTextArea from "./HighlightableTextArea";
// import "codemirror/lib/codemirror.css";
// // import "codemirror/addon/display/rulers.css";
// import "codemirror/theme/material.css";
// import "codemirror/mode/javascript/javascript";
// import CodeMirror from "codemirror";

function BatchFolder({ folderTrees, updateCheckedBatchFolders }) {
  //const [batchFolderTreeNames, setBatchFolderTreeNames] = useState([]);
  const updateCheckedNames = (data) => {
    updateCheckedBatchFolders(data);
  };
  if (!folderTrees) {
    return <div>No folder trees available</div>;
  }

  // Map the Name properties and join them with newline characters
  const folderTreeNames = folderTrees.map((folderTree) => folderTree.Name);

  console.log("folderTreeNames: ", folderTreeNames);
  return (
    <div>
      <div>
        <button className="processButton">Process</button>
      </div>
      <NameContainer
        arrNames={folderTreeNames}
        updateCheckedNames={updateCheckedNames}
      ></NameContainer>
    </div>
  );
}
export default BatchFolder;
