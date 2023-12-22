import React, { useState } from "react";
import "./Folder.css";
import NameContainer from "./NameContainer";
import axios from "axios";

function SBDFolder({
  folderTrees,
  checkedBatchFolders,
  checkedDevFolders,
  checkedSBDFolders,
  checkedDataFiles,
  updateCheckedSBDFolders,
  updateCheckedDataFiles,
}) {
  const updateCheckedNames = (batchFolderName, devFolderName, data) => {
    // update checkedSBDFolders
    const tempObj = { ...checkedSBDFolders };
    if (checkedDevFolders) {
      if (!tempObj[batchFolderName]) {
        tempObj[batchFolderName] = {};
      }
    }
    tempObj[batchFolderName][devFolderName] = data;

    Object.entries(tempObj).forEach(([key, value]) => {
      if (!checkedBatchFolders.includes(key)) delete tempObj[key];
      else {
        if (
          Object.keys(value).length === 0 &&
          tempObj[key].constructor === Object
        )
          delete tempObj[key];
        if (Array.isArray(value) && value.length === 0) delete tempObj[key];
        else if (Object.entries(value))
          Object.entries(value).forEach(([key2, value2]) => {
            if (Array.isArray(value2) && value2.length === 0) {
              delete tempObj[key][key2];
            }
          });
      }
    });

    updateCheckedSBDFolders(tempObj);

    // update checkedDataFiles

    const tempObj1 = { ...checkedDataFiles };
    if (
      tempObj1 &&
      tempObj1[batchFolderName] &&
      tempObj1[batchFolderName][devFolderName]
    ) {
      Object.keys(tempObj1[batchFolderName][devFolderName]).forEach(
        (SBDFolderName) => {
          if (
            !tempObj[batchFolderName][devFolderName] ||
            !tempObj[batchFolderName][devFolderName].includes(SBDFolderName)
          )
            delete tempObj1[batchFolderName][devFolderName][SBDFolderName];
        }
      );
    }
    updateCheckedDataFiles(tempObj1);
  };
  const batchFolderNames = [];

  const tempDevObj = {};
  checkedBatchFolders.forEach((batchFolderName) => {
    if (checkedDevFolders[batchFolderName])
      tempDevObj[batchFolderName] = checkedDevFolders[batchFolderName];
  });

  // console.log(
  //   "In SBD Folders before rendering checkedBatchFolders: ",
  //   checkedBatchFolders
  // );
  // console.log(
  //   "In SBD Folders before rendering checkedDevFolders: ",
  //   checkedDevFolders
  // );

  Object.keys(tempDevObj).forEach((key) =>
    folderTrees.forEach((folderTree) => {
      if (folderTree.Name === key) {
        if (folderTree.Subfolders.length > 0) {
          const devFolderNames = [];
          folderTree.Subfolders.forEach((devFolder) => {
            const sbdFolderNames = [];
            if (tempDevObj && tempDevObj[key]) {
              if (
                tempDevObj[key].length > 0 &&
                tempDevObj[key].includes(devFolder.Name)
              ) {
                devFolder.Subfolders.forEach((sbdFolder) =>
                  sbdFolderNames.push(sbdFolder.Name)
                );
              }
            }
            if (Array.isArray(sbdFolderNames) && sbdFolderNames.length > 0)
              devFolderNames.push(sbdFolderNames);
          });
          batchFolderNames.push(devFolderNames);
        }
      }
    })
  );

  const batchFolderNamesObj = {};
  Object.keys(tempDevObj).forEach((key) =>
    folderTrees.forEach((folderTree) => {
      if (folderTree.Name === key) {
        batchFolderNamesObj[key] = {};
        if (folderTree.Subfolders.length > 0) {
          folderTree.Subfolders.forEach((devFolder) => {
            const sbdFolderNames = [];
            if (tempDevObj && tempDevObj[key]) {
              if (
                tempDevObj[key].length > 0 &&
                tempDevObj[key].includes(devFolder.Name)
              ) {
                devFolder.Subfolders.forEach((sbdFolder) =>
                  sbdFolderNames.push(sbdFolder.Name)
                );
              }
            }
            if (Array.isArray(sbdFolderNames) && sbdFolderNames.length > 0)
              batchFolderNamesObj[key][devFolder.Name] = sbdFolderNames;
          });
        }
      }
    })
  );

  const processSBDFolders = async () => {
    try {
      const arrTempSBDFolderPaths = [];
      // console.log("In SBDFolder.js checkedSBDFolders: ", checkedSBDFolders);
      Object.entries(checkedSBDFolders).forEach(
        ([batchFolderName, batchFolders]) => {
          Object.entries(batchFolders).forEach(
            ([devFolderName, SBDFolders]) => {
              SBDFolders.forEach((SBDFolderName) =>
                arrTempSBDFolderPaths.push(
                  batchFolderName + "/" + devFolderName + "/" + SBDFolderName
                )
              );
            }
          );
        }
      );

      const response = await axios
        .post(
          "https://localhost:7200/ProcessFolders/PostProcessSBDFolders",
          arrTempSBDFolderPaths
        )
        .then((response) => console.log("Response from C#: ", response.data))
        .catch((error) =>
          console.error("Errors in axios SBDFolder.js: ", error)
        );
    } catch (error) {
      console.log("Error in SBDFolder.js: ", { error });
    }
  };

  return (
    <div>
      <div>
        <button className="processButton" onClick={processSBDFolders}>
          Process
        </button>
        <h6>SBD Level Folders</h6>
      </div>
      {/* <NameContainer
        key={1}
        arrNames={batchFolderNames[0][0]}
        updateCheckedNames={(data) => updateCheckedNames(0, 0, data)}
      ></NameContainer> */}

      {(() => {
        return Object.entries(batchFolderNamesObj).map(
          ([batchFolderName, devFolders]) =>
            Object.entries(devFolders).map(([devFolderName, sbdFolders]) => (
              <div>
                <h6>
                  {batchFolderName}/{devFolderName}
                  {/* {checkedDevFolders[checkedBatchFolders[index1]][index2]
                  ? checkedDevFolders[checkedBatchFolders[index1]][index2]
                  : checkedDevFolders[checkedBatchFolders[index1]]} */}
                </h6>
                <h6>
                  {checkedSBDFolders && checkedSBDFolders[batchFolderName]
                    ? checkedSBDFolders[batchFolderName][devFolderName]
                      ? checkedSBDFolders[batchFolderName][devFolderName]
                      : []
                    : []}
                </h6>
                <NameContainer
                  key={[batchFolderName, devFolderName]}
                  arrNames={sbdFolders}
                  arrCheckedNames={
                    checkedSBDFolders && checkedSBDFolders[batchFolderName]
                      ? checkedSBDFolders[batchFolderName][devFolderName]
                        ? checkedSBDFolders[batchFolderName][devFolderName]
                        : []
                      : []
                  }
                  updateCheckedNames={(data) =>
                    updateCheckedNames(batchFolderName, devFolderName, data)
                  }
                ></NameContainer>
              </div>
            ))
        );
      })()}
    </div>
  );
}
export default SBDFolder;
