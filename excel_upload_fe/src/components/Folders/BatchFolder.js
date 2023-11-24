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
  //const [batchFolderTreeNames, setBatchFolderTreeNames] = useState([]);
  const updateCheckedNames = (data) => {
    updateCheckedBatchFolders(data);
    const tempObj = { ...checkedDevFolders };
    console.log("In Batch Folder, checked Batch Folders:  ", data);
    Object.entries(tempObj).forEach(([key, value]) => {
      if (!data.includes(key)) {
        console.log("In Batch Folder, key ", key);
        delete tempObj[key];
      }
    });
    updateCheckedDevFolders(tempObj);
    console.log("In Batch Folders, checked Dev Folder Names: ", tempObj);
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
        updateCheckedNames={updateCheckedNames}
      ></NameContainer>
    </div>
  );
}
export default BatchFolder;
