import React, { useState, useEffect } from "react";
import "./Folder.css";
import NameContainer from "./NameContainer";
import axios from "axios";

function DevFolder({
  folderTrees,
  checkedBatchFolders,
  checkedDevFolders,
  checkedSBDFolders,
  checkedDataFiles,
  updateCheckedDevFolders,
  updateCheckedSBDFolders,
  updateCheckedDataFiles,
}) {
  // const [checkedDevFolderNames, setCheckedDevFolderNames] =
  //   useState(checkedDevFolders);
  const updateCheckedNames = (batchFolderName, data) => {
    //
    const objTempCheckedDevFolders = { ...checkedDevFolders };
    objTempCheckedDevFolders[batchFolderName] = data;
    Object.entries(objTempCheckedDevFolders).forEach(([key, value]) => {
      if (!checkedBatchFolders.includes(key))
        delete objTempCheckedDevFolders[key];
      if (Array.isArray(value) && value.length === 0)
        delete objTempCheckedDevFolders[key];
    });

    updateCheckedDevFolders(objTempCheckedDevFolders);

    // update checkedSBDFolders
    const objTempCheckedSBDFolders = { ...checkedSBDFolders };
    Object.entries(objTempCheckedSBDFolders).forEach(
      ([batchFolderName, batchFolderSubFolders]) => {
        if (
          Object.keys(objTempCheckedDevFolders) &&
          !Object.keys(objTempCheckedDevFolders).includes(batchFolderName)
        ) {
          delete objTempCheckedSBDFolders[batchFolderName];
          // console.log("In dev Folder, Went in objTempCheckedSBDFolders[batchFolderName]");
        } else {
          if (Object.entries(batchFolderSubFolders)) {
            Object.entries(batchFolderSubFolders).forEach(
              ([devFolderName, devFolderSubFolders]) => {
                if (
                  Array.isArray(objTempCheckedDevFolders[batchFolderName]) &&
                  !objTempCheckedDevFolders[batchFolderName].includes(
                    devFolderName
                  )
                ) {
                  delete objTempCheckedSBDFolders[batchFolderName][
                    devFolderName
                  ];
                }
              }
            );
          }
        }
      }
    );
    updateCheckedSBDFolders(objTempCheckedSBDFolders);

    // update checkedDataFiles
    const objTempCheckedDataFiles = { ...checkedDataFiles };
    if (objTempCheckedDataFiles && objTempCheckedDataFiles[batchFolderName]) {
      Object.keys(objTempCheckedDataFiles[batchFolderName]).forEach(
        (devFolderName) => {
          if (
            !objTempCheckedDevFolders[batchFolderName] ||
            !data.includes(devFolderName)
          )
            delete objTempCheckedDataFiles[batchFolderName][devFolderName];
        }
      );
    }
    updateCheckedDataFiles(objTempCheckedDataFiles);
  };

  //-----------------------------------------------------------------
  // const devFolderNames = [];
  // checkedBatchFolders.forEach((checkedBatchFolder) => {
  //   const subFolderNames = [];
  //   folderTrees.forEach((folderTree) => {
  //     if (folderTree.Name === checkedBatchFolder) {
  //       if (folderTree.Subfolders.length > 0) {
  //         folderTree.Subfolders.forEach((subFolder) => {
  //           subFolderNames.push(subFolder.Name);
  //         });
  //       }
  //     }
  //   });
  //   devFolderNames.push(subFolderNames);
  // });
  const devFolderNames = {};
  checkedBatchFolders.forEach((checkedBatchFolder) => {
    const devFolders = [];
    folderTrees.forEach((batchFolderName) => {
      if (batchFolderName.Name === checkedBatchFolder) {
        if (batchFolderName.Subfolders.length > 0) {
          batchFolderName.Subfolders.forEach((subFolder) => {
            devFolders.push(subFolder.Name);
          });
        }
      }
    });
    devFolderNames[checkedBatchFolder] = devFolders;
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
        return Object.entries(devFolderNames).map(
          ([batchFolderName, devFolders]) => (
            <div>
              <h6>{batchFolderName}</h6>
              {/* <h6>
              During rendering
              {checkedDevFolders &&
              checkedDevFolders[checkedBatchFolders[index]]
                ? checkedDevFolders[checkedBatchFolders[index]]
                : []}
            </h6> */}
              <NameContainer
                key={batchFolderName}
                arrNames={devFolders}
                arrCheckedNames={
                  checkedDevFolders && checkedDevFolders[batchFolderName]
                    ? checkedDevFolders[batchFolderName]
                    : []
                }
                updateCheckedNames={(data) =>
                  updateCheckedNames(batchFolderName, data)
                }
              ></NameContainer>
            </div>
          )
        );
      })()}
    </div>
  );
}
export default DevFolder;
