import React, { useState, useEffect } from "react";
import "./Folder.css";
import NameContainer from "./NameContainer";

function DevFolder({
  folderTrees,
  checkedBatchFolders,
  checkedDevFolders,
  checkedSBDFolders,
  updateCheckedDevFolders,
  updateCheckedSBDFolders,
}) {
  // const [checkedDevFolderNames, setCheckedDevFolderNames] =
  //   useState(checkedDevFolders);
  const updateCheckedNames = (index, data) => {
    //
    const tempObj = { ...checkedDevFolders };
    tempObj[checkedBatchFolders[index]] = data;
    Object.entries(tempObj).forEach(([key, value]) => {
      if (!checkedBatchFolders.includes(key)) delete tempObj[key];
      if (Array.isArray(value) && value.length === 0) delete tempObj[key];
    });

    updateCheckedDevFolders(tempObj);
    console.log("In Dev Folder, checked Dev Folder Names: ", tempObj);
    const tempObj1 = { ...checkedSBDFolders };
    Object.entries(tempObj1).forEach(
      ([batchFolderName, batchFolderSubFolders]) => {
        if (
          Object.keys(tempObj) &&
          !Object.keys(tempObj).includes(batchFolderName)
        ) {
          delete tempObj1[batchFolderName];
          // console.log("In dev Folder, Went in tempObj1[batchFolderName]");
        } else {
          if (Object.entries(batchFolderSubFolders)) {
            Object.entries(batchFolderSubFolders).forEach(
              ([devFolderName, devFolderSubFolders]) => {
                // console.log(
                //   "In Dev Folder, tempObj[batchFolderName]",
                //   tempObj[batchFolderName]
                // );
                if (
                  Array.isArray(tempObj[batchFolderName]) &&
                  !tempObj[batchFolderName].includes(devFolderName)
                ) {
                  // console.log(
                  //   "In dev Folder, Went in tempObj1[batchFolderName][devFolderName]"
                  // );
                  delete tempObj1[batchFolderName][devFolderName];
                }
              }
            );
          }
          // if (
          //   Object.keys(value).length === 0 &&
          //   tempObj1[key].constructor === Object
          // )
          //   delete tempObj1[key];
          // if (Array.isArray(value) && value.length === 0) delete tempObj1[key];
          // else if (Object.entries(value))
          //   Object.entries(value).forEach(([key2, value2]) => {
          //     // console.log(`Went in key2 ${key2}  `);
          //     if (Array.isArray(value2) && value2.length === 0) {
          //       //console.log(`Went in value2 ${value2}  `);
          //       delete tempObj1[key][key2];
          //     }
          //   });
        }
      }
    );
    updateCheckedSBDFolders(tempObj1);
    //somehow using prevCheckedDevFolderNames gave some small bugs
    // setCheckedDevFolderNames((prevCheckedDevFolderNames) => {
    //   const tempObj = { ...prevCheckedDevFolderNames };
    //   tempObj[checkedBatchFolders[index]] = data;
    //   Object.entries(tempObj).forEach(([key, value]) => {
    //     if (!checkedBatchFolders.includes(key)) delete tempObj[key];
    //     if (Array.isArray(value) && value.length === 0) delete tempObj[key];
    //   });

    //   updateCheckedDevFolders(tempObj);
    //   console.log("In Dev Folder, checked Dev Folder Names: ", tempObj);
    //   return tempObj;
    // });
  };
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
  // console.log(
  //   `In Dev Folder before rendering, checkedDevFolders: `,
  //   checkedDevFolders
  // );

  return (
    <div>
      <div>
        <button className="processButton">Process</button>
        <h6>Device Level Folders</h6>
      </div>

      {(() => {
        return devFolderNames.map((_, index) => (
          <div>
            <h6>
              {checkedBatchFolders && checkedBatchFolders[index]
                ? checkedBatchFolders[index]
                : ""}
            </h6>
            {/* <h6>
              During rendering
              {checkedDevFolders &&
              checkedDevFolders[checkedBatchFolders[index]]
                ? checkedDevFolders[checkedBatchFolders[index]]
                : []}
            </h6> */}
            <NameContainer
              key={index}
              arrNames={devFolderNames[index]}
              arrCheckedNames={
                checkedDevFolders &&
                checkedDevFolders[checkedBatchFolders[index]]
                  ? checkedDevFolders[checkedBatchFolders[index]]
                  : []
              }
              updateCheckedNames={(data) => updateCheckedNames(index, data)}
            ></NameContainer>
          </div>
        ));
      })()}
    </div>
  );
}
export default DevFolder;
