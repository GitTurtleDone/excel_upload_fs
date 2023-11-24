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
    // checkedSBDFolders[index1][index2] = data;
    // updateCheckedSBDFolders(checkedSBDFolders);
    console.log(data);
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
            if (checkedDevFolders && checkedDevFolders[checkedBatchFolder]) {
              if (
                checkedDevFolders[checkedBatchFolder].length > 0 &&
                checkedDevFolders[checkedBatchFolder].includes(devFolder.Name)
              ) {
                devFolder.Subfolders.forEach((sbdFolder) =>
                  sbdFolderNames.push(sbdFolder.Name)
                );
              }
            }

            devFolderNames.push(sbdFolderNames);
            // console.log("In SBD Folder, devFolderNames: ", sbdFolderNames);
          });
          batchFolderNames.push(devFolderNames);
        }
      }
    });

    // console.log("In SBD Folder, batchFolderNames: ", batchFolderNames);
  });
  console.log("In SBD Folder, batchFolderNames: ", batchFolderNames);

  return (
    <div>
      <div>
        <button className="processButton">Process</button>
        <h6>SBD Level Folders</h6>
      </div>
      {/* <NameContainer
        key={1}
        arrNames={batchFolderNames[0][0]}
        updateCheckedNames={(data) => updateCheckedNames(0, 0, data)}
      ></NameContainer> */}

      {(() => {
        return batchFolderNames.map((batchFolderName, index1) =>
          batchFolderName.map((devFolderName, index2) => (
            <div>
              <h6>
                {checkedBatchFolders[index1] ? checkedBatchFolders[index1] : ""}
                /
                {checkedDevFolders &&
                checkedDevFolders[checkedBatchFolders[index1]] &&
                checkedDevFolders[checkedBatchFolders[index1]][index2]
                  ? checkedDevFolders[checkedBatchFolders[index1]][index2]
                  : ""}
                {/* {checkedDevFolders[checkedBatchFolders[index1]][index2]
                  ? checkedDevFolders[checkedBatchFolders[index1]][index2]
                  : checkedDevFolders[checkedBatchFolders[index1]]} */}
              </h6>
              <NameContainer
                key={[index1, index2]}
                arrNames={devFolderName}
                updateCheckedNames={(data) =>
                  updateCheckedNames(index1, index2, data)
                }
              ></NameContainer>
            </div>
          ))
        );

        // <NameContainer
        //   key={1}
        //   arrNames={batchFolderNames[0][0]}
        //   updateCheckedNames={(data) => updateCheckedNames(0, 0, data)}
        // ></NameContainer>;
      })()}
    </div>
  );
}
export default SBDFolder;
