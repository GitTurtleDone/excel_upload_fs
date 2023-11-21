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
  // console.log(
  //   `Checked Batch Folders: `,
  //   checkedBatchFolders,
  //   `\n Checked Dev Folders: `,
  //   checkedDevFolders
  // );
  const batchFolderNames = [];
  checkedBatchFolders.forEach((checkedBatchFolder, index1) => {
    folderTrees.forEach((folderTree) => {
      if (folderTree.Name === checkedBatchFolder) {
        // console.log("In SBDFolder, folder Tree Names: ", folderTree.Name);
        if (folderTree.Subfolders.length > 0) {
          const devFolderNames = [];
          folderTree.Subfolders.forEach((devFolder) => {
            const sbdFolderNames = [];
            if (checkedDevFolders && checkedDevFolders[index1]) {
              if (
                checkedDevFolders[index1].length > 0 &&
                checkedDevFolders[index1].includes(devFolder.Name)
              ) {
                devFolder.Subfolders.forEach((sbdFolder) =>
                  sbdFolderNames.push(sbdFolder.Name)
                );
              }
            }
            // console.log(
            //   `In SBD Folder, sbdFolderNames ${index1}`,
            //   sbdFolderNames
            // );
            devFolderNames.push(sbdFolderNames);
            // console.log("In SBD Folder, devFolderNames: ", sbdFolderNames);
          });
          batchFolderNames.push(devFolderNames);
        }
      }
    });

    // console.log("In SBD Folder, batchFolderNames: ", batchFolderNames);
  });

  return (
    <div>
      <div>
        <button className="processButton">Process</button>
        <h6>SBD Level Folders</h6>
      </div>

      {/* {(() => {
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
      })()} */}
    </div>
  );
}
export default SBDFolder;
