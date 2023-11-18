import React, { useState } from "react";
import "./Folder.css";
import NameContainer from "./NameContainer";

function SBDFolder({
  folderTrees,
  checkedBatchFolders,
  checkedDevFolders,
  updateCheckedSBDFolders,
}) {
  const checkedSBDFolders = Array.from({ length: checkedDevFolders }, () =>
    checkedDevFolders.forEach((folder) =>
      Array.from({ length: folder }, () => [])
    )
  );
  const updateCheckedNames = (index1, index2, data) => {
    checkedSBDFolders[index1][index2] = data;
    updateCheckedSBDFolders(checkedSBDFolders);
  };
  if (!folderTrees) {
    return <div>No folder trees available</div>;
  }
  const batchFolderNames = [];
  checkedBatchFolders.forEach((checkedBatchFolder, index1) => {
    const devFolderNames = [];
    folderTrees.forEach((folderTree) => {
      const sbdFolderNames = [];
      if (folderTree.Name === checkedBatchFolder) {
        if (folderTree.Subfolders.length > 0) {
          folderTree.Subfolders.forEach((devFolder) => {
            if (checkedDevFolders && checkedDevFolders[index1]) {
              if (
                checkedDevFolders[index1].length > 0 &&
                checkedDevFolders[index1].includes(devFolder.Name)
              ) {
                sbdFolderNames.push(devFolder.Name);
              }
            }
          });
        }
      }
      sbdFolderNames.push(sbdFolderNames);
    });
    batchFolderNames.push(devFolderNames);
    console.log("checked SBD folder Name array: ", batchFolderNames);
  });

  return (
    <div>
      <div>
        <button className="processButton">Process</button>
        <h6>SBD Level Folders</h6>
      </div>

      {(() => {
        return batchFolderNames.map((batchFolderName, index1) =>
          batchFolderName.map((devFolderName, index2) => (
            <NameContainer
              key={[index1, index2]}
              arrNames={devFolderName[index1]}
              updateCheckedNames={(data) =>
                updateCheckedNames(index1, index2, data)
              }
            ></NameContainer>
          ))
        );
      })()}
    </div>
  );
}
export default SBDFolder;
