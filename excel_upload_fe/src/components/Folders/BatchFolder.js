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
