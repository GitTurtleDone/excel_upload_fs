import React, { useState, useEffect } from "react";
import "./Folder.css";
import NameContainer from "./NameContainer";

function DevFolder({
  folderTrees,
  checkedBatchFolders,
  checkedDevFolders,
  updateCheckedDevFolders,
}) {
  const [checkedDevFolderNames, setCheckedDevFolderNames] =
    useState(checkedDevFolders);
  const updateCheckedNames = (index, data) => {
    //
    setCheckedDevFolderNames((prevCheckedDevFolderNames) => {
      const tempObj = { ...prevCheckedDevFolderNames };
      tempObj[checkedBatchFolders[index]] = data;
      Object.entries(tempObj).forEach(([key, value]) => {
        if (!checkedBatchFolders.includes(key)) delete tempObj[key];
        if (Array.isArray(value) && value.length === 0) delete tempObj[key];
      });

      updateCheckedDevFolders(tempObj);
      console.log("In Dev Folder, checked Dev Folder Names: ", tempObj);
      return tempObj;
    });
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
  console.log(`In Dev Folder, checkedDevFolderNames: `, checkedDevFolderNames);

  return (
    <div>
      <div>
        <button className="processButton">Process</button>
        <h6>Device Level Folders</h6>
      </div>

      {(() => {
        return devFolderNames.map((_, index) => (
          <NameContainer
            key={index}
            arrNames={devFolderNames[index]}
            arrCheckedNames={
              checkedDevFolderNames && checkedDevFolderNames[index]
                ? checkedDevFolderNames[index]
                : []
            }
            updateCheckedNames={(data) => updateCheckedNames(index, data)}
          ></NameContainer>
        ));
      })()}
    </div>
  );
}
export default DevFolder;
