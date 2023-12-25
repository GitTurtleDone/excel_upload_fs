import React, { useState } from "react";
import "./Folder.css";
import NameContainer from "./NameContainer";
import DevFolder from "./DevFolder";
import axios, { AxiosResponse } from "axios";

// import HighlightableTextArea from "./HighlightableTextArea";
// import "codemirror/lib/codemirror.css";
// // import "codemirror/addon/display/rulers.css";
// import "codemirror/theme/material.css";
// import "codemirror/mode/javascript/javascript";
// import CodeMirror from "codemirror";

function BatchFolder({
  folderTrees,
  checkedBatchFolders,
  checkedDevFolders,
  checkedSBDFolders,
  checkedDataFiles,
  updateCheckedBatchFolders,
  updateCheckedDevFolders,
  updateCheckedSBDFolders,
  updateCheckedDataFiles,
}) {
  // const [checkedDevFolderNames, setCheckedDevFolderNames] =
  //   useState(checkedDevFolders);
  const [checkedBatchFolderNames, setCheckedBatchFolderNames] =
    useState(checkedBatchFolders);
  const updateCheckedNames = (data) => {
    // update checkedBatchFolders
    updateCheckedBatchFolders(data);

    // update checkedDevFolders
    const objTempCheckedDevFolders = { ...checkedDevFolders };
    Object.entries(objTempCheckedDevFolders).forEach(([key, value]) => {
      if (!data.includes(key)) {
        delete objTempCheckedDevFolders[key];
      }
      if (Array.isArray(value) && value.length === 0)
        delete objTempCheckedDevFolders[key];
    });
    updateCheckedDevFolders(objTempCheckedDevFolders);

    // update checkedSBDFolders
    const objTempSBDFolders = { ...checkedSBDFolders };
    Object.entries(objTempSBDFolders).forEach(
      ([batchFolderName, devFolders]) => {
        if (!data.includes(batchFolderName))
          delete objTempSBDFolders[batchFolderName];
        else if (
          Object.keys(devFolders) &&
          Object.keys(devFolders).length === 0
        )
          delete objTempSBDFolders[batchFolderName];
      }
    );
    updateCheckedSBDFolders(objTempSBDFolders);

    // update checkedDatFiles
    const objTempCheckedDataFiles = { ...checkedDataFiles };
    Object.keys(objTempCheckedDataFiles).forEach((batchFolderName) => {
      if (!data.includes(batchFolderName))
        delete objTempCheckedDataFiles[batchFolderName];
    });
    updateCheckedDataFiles(objTempCheckedDataFiles);
  };

  const folderTreeNames = folderTrees.map((folderTree) => folderTree.Name);
  const processBatchFolders = async () => {
    try {
      const devFolderNames = [];
      checkedBatchFolders.forEach((checkedBatchFolderName) => {
        const subFolderNames = [];
        folderTrees.forEach((folderTree) => {
          if (folderTree.Name === checkedBatchFolderName) {
            if (folderTree.Subfolders.length > 0) {
              folderTree.Subfolders.forEach((subFolder) => {
                devFolderNames.push(
                  checkedBatchFolderName + "/" + subFolder.Name
                );
              });
            }
          }
        });
      });
      console.log("In BatchFolder.js before sending to C#: ", devFolderNames);
      const response = await axios
        .post(
          // send to PostProcessDevFolders because uploading is similar to uploading DevFolders
          // The only difference is uploading all Dev Folders under the Batch Folder.
          "https://localhost:7200/ProcessFolders/PostProcessDevFolders",
          devFolderNames
        )
        .then((response) => {
          console.log("Response from ProcessBatchFolder ", response.data);
        })
        .catch((error) => {
          console.error("Errors in axios BatchFolder.js: ", error);
        });
    } catch (error) {
      console.error("Processing batch folder error: ", error);
    }
  };
  const compareExcelFiles = async () => {
    const compareExcelFileNames = [];
    Object.entries(checkedDataFiles).forEach(
      ([batchFolderName, devFolders]) => {
        Object.entries(devFolders).forEach(([devFolderName, SBDFolders]) => {
          Object.entries(SBDFolders).forEach(([SBDFolderName, excelFiles]) => {
            excelFiles.forEach((dataFileName) => {
              if (dataFileName.includes(".xlsx"))
                compareExcelFileNames.push(
                  batchFolderName +
                    "/" +
                    devFolderName +
                    "/" +
                    SBDFolderName +
                    "/" +
                    dataFileName
                );
            });
          });
        });
      }
    );
    console.log("BatchFolder.js before sending to C# ", compareExcelFileNames);
    const response = axios
      .post(
        "https://localhost:7200/ProcessFolders/PostCompareExcelFiles",
        compareExcelFileNames
      )
      .then((response) => console.log(response))
      .catch((error) => console.log("Error in PostCompareExcelFile"));
  };
  return (
    <div>
      <div>
        <div>
          <button className="processButton" onClick={processBatchFolders}>
            Process
          </button>
          <button className="processButton" onClick={compareExcelFiles}>
            Compare
          </button>
        </div>
        <h6>Batch Level Folders</h6>
      </div>

      <NameContainer
        arrNames={folderTreeNames}
        arrCheckedNames={checkedBatchFolders}
        updateCheckedNames={updateCheckedNames}
      ></NameContainer>
    </div>
  );
}
export default BatchFolder;
