import React, { useState } from "react";
import "./Folder.css";
import NameContainer from "./NameContainer";

function DevFolder({
  folderTrees,
  folderTreeNames,
  checkedBatchFolders,
  // updateCheckedDevFolders,
}) {
  const updateCheckedNames = (instance, data) => {
    console.log(`Callbac for Instance ${instance}: `, data);
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
            // key={index} // Add a key prop for each NameContainer
            arrNames={devFolderNames[index]}
            updateCheckedNames={(data) => updateCheckedNames(index, data)}
          ></NameContainer>
        ));
      })()}
    </div>
  );
}
export default DevFolder;
