import React, { useState } from "react";
import FileContainer from "./FileContainer";
import axios from "axios";

function DataFile({
  folderTrees,
  checkedBatchFolders,
  checkedDevFolders,
  checkedSBDFolders,
  checkedDataFiles,
  updateCheckedDataFiles,
  updateCheckedType,
}) {
  const updateCheckedFileNames = (
    batchFolderName,
    devFolderName,
    SBDFolderName,
    data
  ) => {
    const objTempCheckedDataFiles = { ...checkedDataFiles };
    if (!objTempCheckedDataFiles[batchFolderName])
      objTempCheckedDataFiles[batchFolderName] = {};
    if (!objTempCheckedDataFiles[batchFolderName][devFolderName])
      objTempCheckedDataFiles[batchFolderName][devFolderName] = {};
    if (!objTempCheckedDataFiles[batchFolderName][devFolderName][SBDFolderName])
      objTempCheckedDataFiles[batchFolderName][devFolderName][SBDFolderName] =
        {};
    objTempCheckedDataFiles[batchFolderName][devFolderName][SBDFolderName] =
      data;

    // Order the objTempCheckedDataFiles according to the folderTrees
    // Order the objTempCheckedDataFiles according to the folderTrees
    updateCheckedDataFiles(objTempCheckedDataFiles);
    console.log(
      "DataFile.js objTempCheckedDataFiles ",
      objTempCheckedDataFiles
    );
  };
  const processDataFiles = () => {
    console.log("In DataFile.js");
  };
  const objDataFileNames = {};

  folderTrees.forEach((batchFolder) => {
    if (
      checkedSBDFolders &&
      Object.keys(checkedSBDFolders) &&
      Object.keys(checkedSBDFolders).includes(batchFolder.Name)
    ) {
      if (!objDataFileNames[batchFolder.Name])
        objDataFileNames[batchFolder.Name] = {};

      batchFolder.Subfolders.forEach((devFolder) => {
        if (
          Object.keys(checkedSBDFolders[batchFolder.Name]) &&
          Object.keys(checkedSBDFolders[batchFolder.Name]).includes(
            devFolder.Name
          )
        ) {
          if (!objDataFileNames[batchFolder.Name][devFolder.Name])
            objDataFileNames[batchFolder.Name][devFolder.Name] = {};
          devFolder.Subfolders.forEach((SBDFolder) => {
            if (
              checkedSBDFolders[batchFolder.Name][devFolder.Name] &&
              checkedSBDFolders[batchFolder.Name][devFolder.Name].includes(
                SBDFolder.Name
              )
            ) {
              if (
                !objDataFileNames[batchFolder.Name][devFolder.Name][
                  SBDFolder.Name
                ]
              )
                objDataFileNames[batchFolder.Name][devFolder.Name][
                  SBDFolder.Name
                ] = [];
              if (SBDFolder.Files && Array.isArray(SBDFolder.Files))
                SBDFolder.Files.forEach((fileName) =>
                  objDataFileNames[batchFolder.Name][devFolder.Name][
                    SBDFolder.Name
                  ].push(fileName)
                );
              // console.log(
              //   `DataFile.js ${batchFolder.Name} ${devFolder.Name} ${SBDFolder.Name}`,
              //   objDataFileNames[batchFolder.Name][devFolder.Name][
              //     SBDFolder.Name
              //   ]
              // );
            }
          });
        }
      });
    }
  });
  return (
    <div>
      <button className="processButton" onClick={processDataFiles}>
        Process
      </button>
      <h6> Data Files</h6>
      {/* Object.entries() */}
      {(() => {
        return Object.entries(objDataFileNames).map(
          ([batchFolderName, devFolders]) =>
            Object.entries(devFolders).map(([devFolderName, SBDFolders]) =>
              Object.entries(SBDFolders).map(([SBDFolderName, Files]) => (
                <div>
                  <h6>
                    {batchFolderName}/{devFolderName}/{SBDFolderName}{" "}
                  </h6>
                  <FileContainer
                    key={[batchFolderName, devFolderName, SBDFolderName]}
                    arrFileNames={Files}
                    arrCheckedFileNames={
                      checkedDataFiles &&
                      checkedDataFiles[batchFolderName] &&
                      checkedDataFiles[batchFolderName][devFolderName] &&
                      checkedDataFiles[batchFolderName][devFolderName][
                        SBDFolderName
                      ]
                        ? checkedDataFiles[batchFolderName][devFolderName][
                            SBDFolderName
                          ]
                        : []
                    }
                    updateCheckedFileNames={(data) =>
                      updateCheckedFileNames(
                        batchFolderName,
                        devFolderName,
                        SBDFolderName,
                        data
                      )
                    }
                    // folderTrees={folderTrees}
                    // checkedBatchFolders={checkedBatchFolders}
                    // checkedDevFolders={checkedDevFolders}
                    // checkedSBDFolders={checkedSBDFolders}
                    // checkedDataFiles={checkedDataFiles}
                    // updateCheckedDataFiles={updateCheckedDataFiles}
                  />
                </div>
              ))
            )
        );
      })()}
    </div>
  );
}
export default DataFile;
