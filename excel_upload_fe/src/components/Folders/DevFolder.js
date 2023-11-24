import React, { useState, useEffect } from "react";
import "./Folder.css";
import NameContainer from "./NameContainer";

function DevFolder({
  folderTrees,
  checkedBatchFolders,
  updateCheckedDevFolders,
}) {
  const [checkedDevFolderNames, setCheckedDevFolderNames] = useState({});

  // Array.from({ length: checkedBatchFolders }, () => []
  const [checkedDevFolderNameMap, setCheckedDevFolderNameMap] = useState(
    new Map()
  );
  const updateCheckedNames = (index, data) => {
    checkedDevFolderNames[checkedBatchFolders[index]] = data;
    let tempObj = { ...checkedDevFolderNames };
    Object.entries(tempObj).forEach(([key, value]) => {
      if (!checkedBatchFolders.includes(key)) delete tempObj[key];
    });
    setCheckedDevFolderNames(tempObj);
    updateCheckedDevFolders(tempObj);
    console.log("checked Dev Folder Names: ", checkedDevFolderNames);
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

  return (
    <div>
      <div>
        <button className="processButton">Process</button>
        <h6>Device Level Folders</h6>
      </div>

      {(() => {
        return devFolderNames.map((_, index) => (
          <NameContainer
            key={index} // Add a key prop for each NameContainer
            arrNames={devFolderNames[index]}
            updateCheckedNames={(data) => updateCheckedNames(index, data)}
          ></NameContainer>
        ));
      })()}
    </div>
  );
}
export default DevFolder;
