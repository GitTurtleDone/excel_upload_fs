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
  updateCheckedBatchFolders,
  updateCheckedDevFolders,
  updateCheckedSBDFolders,
}) {
  // const [checkedDevFolderNames, setCheckedDevFolderNames] =
  //   useState(checkedDevFolders);
  const [checkedBatchFolderNames, setCheckedBatchFolderNames] =
    useState(checkedBatchFolders);
  const updateCheckedNames = (data) => {
    updateCheckedBatchFolders(data);
    const tempObj = { ...checkedDevFolders };
    Object.entries(tempObj).forEach(([key, value]) => {
      if (!data.includes(key)) {
        delete tempObj[key];
      }
      if (Array.isArray(value) && value.length === 0) delete tempObj[key];
    });

    console.log("In Batch Folders, checked Dev Folder Names: ", tempObj);
    updateCheckedDevFolders(tempObj);

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
      console.log("In BatchFolder.js: ", devFolderNames);
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

  return (
    <div>
      <div>
        <button className="processButton" onClick={processBatchFolders}>
          Process
        </button>
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
