import React, { useState, useEffect } from "react";
import "./Folder.css";
import NameContainer from "./NameContainer";
import axios from "axios";

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
                if (
                  Array.isArray(tempObj[batchFolderName]) &&
                  !tempObj[batchFolderName].includes(devFolderName)
                ) {
                  delete tempObj1[batchFolderName][devFolderName];
                }
              }
            );
          }
        }
      }
    );
    updateCheckedSBDFolders(tempObj1);
  };
  const devFolderNames = [];
  checkedBatchFolders.forEach((checkedBatchFolderName) => {
    const devFolderNamePaths = [];
    folderTrees.forEach((folderTree) => {
      if (folderTree.Name === checkedBatchFolderName) {
        if (folderTree.Subfolders.length > 0) {
          folderTree.Subfolders.forEach((devFolder) => {
            devFolderNames.push(checkedBatchFolderName + "/" + devFolder.Name);
          });
        }
      }
    });
  });
  const processDevFolders = async () => {
    const objTemp = { ...checkedDevFolders };
    const lstDevFolders = [];
    Object.entries(objTemp).forEach(([batchFolderName, devFolders]) => {
      if (devFolders && devFolders.length > 0) {
        devFolders.forEach((devFolderName) => {
          let strTemp = batchFolderName + "/" + devFolderName;
          lstDevFolders.push(strTemp);
        });
      }
    });
    console.log("Before sending to C#: ", lstDevFolders);
    try {
      const response = await axios
        .post(
          "https://localhost:7200/ProcessFolders/PostProcessDevFolders",
          lstDevFolders
        )
        .then((response) => {
          console.log("Response from ProcessDevFolder ", response.data);
        })
        .catch((error) => {
          console.error("Errors in axios DevFolder.js: ", error);
        });
    } catch (error) {
      console.error("Processing dev folder error: ", error);
    }
  };

  return (
    <div>
      <div>
        <button className="processButton" onClick={processDevFolders}>
          Process
        </button>
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
