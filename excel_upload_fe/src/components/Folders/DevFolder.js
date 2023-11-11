import React, { useState } from "react";
import "./Folder.css";
import NameContainer from "./NameContainer";
// import HighlightableTextArea from "./HighlightableTextArea";
// import "codemirror/lib/codemirror.css";
// // import "codemirror/addon/display/rulers.css";
// import "codemirror/theme/material.css";
// import "codemirror/mode/javascript/javascript";
// import CodeMirror from "codemirror";

function DevFolder({
  folderTrees,
  checkedBatchFolders,
  // updateCheckedDevFolders,
}) {
  const [devFolderTreeNames, setDevFolderTreeNames] = useState([]);
  const updateCheckedNames = (instance, data) => {
    console.log(`Callbac for Instance ${instance}: `, data);
    // updateCheckedDevFolders(data);
  };
  if (!folderTrees) {
    return <div>No folder trees available</div>;
  }
  const devFolderNames = [];
  checkedBatchFolders.forEach((checkedBatchFolder) => {
    const subFolderNames = [];
    folderTrees.forEach((folderTree) => {
      if (folderTree.Name === checkedBatchFolder) {
        if (folderTree.Subfolders.length > 0) {
          folderTree.Subfolders.forEach((subFolder) => {
            subFolderNames.push(subFolder.Name);
          });
        }
      }
    });
    devFolderNames.push(subFolderNames);
  });
  console.log("dev Folder Names: ", devFolderNames);
  console.log("dev Folder Names Length: ", devFolderNames.length);
  // setDevFolderTreeNames(devFolderNames);

  // console.log("folderTreeNames: ", devFolderTreeNames);
  return (
    <div>
      <div>
        <button className="processButton">Process</button>
      </div>
      <h6>Device level Folders</h6>
      {Array.from({ length: devFolderNames }).map((_, index) => (
        <NameContainer
          key={index}
          arrNames={devFolderNames[index]}
          updateCheckedNames={(data) =>
            (() => updateCheckedNames(index, data))()
          }
        ></NameContainer>
      ))}

      {Array.from({ length: devFolderNames }).map((_, index) => (
        <NameContainer
          key={index}
          arrNames={devFolderNames[index]}
          updateCheckedNames={updateCheckedNames.bind(null, index)}
        ></NameContainer>
      ))}

      <NameContainer
        arrNames={devFolderNames[0]}
        updateCheckedNames={(data) => updateCheckedNames(0, data)}
      ></NameContainer>
      <NameContainer
        arrNames={devFolderNames[1]}
        updateCheckedNames={(data) => updateCheckedNames(1, data)}
      ></NameContainer>
    </div>
  );
}
export default DevFolder;
