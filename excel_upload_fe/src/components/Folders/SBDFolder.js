import React, { useState } from "react";
import "./Folder.css";
import NameContainer from "./NameContainer";

function SBDFolder({
  folderTrees,
  checkedBatchFolders,
  checkedDevFolders,
  checkedSBDFolders,
  updateCheckedSBDFolders,
}) {
  // const [checkedSBDFolderNames, setCheckedSBDFolderNames] =
  //   useState(checkedSBDFolders);
  // const updateCheckedNames = (index1, index2, data) => {
  //   const tempObj = { ...checkedSBDFolders };
  //   if (checkedDevFolders && checkedBatchFolders[index1]) {
  //     if (!tempObj[Object.keys(checkedDevFolders)[index1]]) {
  //       tempObj[Object.keys(checkedDevFolders)[index1]] = {};
  //     }
  //   }
  //   if (checkedDevFolders[Object.keys(checkedDevFolders)[index1]][index2]) {
  //     tempObj[Object.keys(checkedDevFolders)[index1]][
  //       checkedDevFolders[Object.keys(checkedDevFolders)[index1]][index2]
  //     ] = data;
  //   } else {
  //     tempObj[Object.keys(checkedDevFolders)[index1]][
  //       checkedDevFolders[Object.keys(checkedDevFolders)[index1]]
  //     ] = data;
  //   }

  //   Object.entries(tempObj).forEach(([key, value]) => {
  //     if (!checkedBatchFolders.includes(key)) delete tempObj[key];
  //     else {
  //       if (
  //         Object.keys(value).length === 0 &&
  //         tempObj[key].constructor === Object
  //       )
  //         delete tempObj[key];
  //       if (Array.isArray(value) && value.length === 0) delete tempObj[key];
  //       else if (Object.entries(value))
  //         Object.entries(value).forEach(([key2, value2]) => {
  //           // console.log(`Went in key2 ${key2}  `);
  //           if (Array.isArray(value2) && value2.length === 0) {
  //             //console.log(`Went in value2 ${value2}  `);
  //             delete tempObj[key][key2];
  //           }
  //         });
  //     }
  //   });
  //   // console.log(`In SBD Folders,  checkedSBDFolders`, tempObj);
  //   updateCheckedSBDFolders(tempObj);
  //   // setCheckedSBDFolderNames((prevCheckedSBDFolderNames) => {
  //   //   const tempObj = { ...prevCheckedSBDFolderNames };
  //   //   if (checkedDevFolders && checkedBatchFolders[index1]) {
  //   //     if (!tempObj[Object.keys(checkedDevFolders)[index1]]) {
  //   //       tempObj[Object.keys(checkedDevFolders)[index1]] = {};
  //   //     }
  //   //   }
  //   //   if (checkedDevFolders[Object.keys(checkedDevFolders)[index1]][index2]) {
  //   //     tempObj[Object.keys(checkedDevFolders)[index1]][
  //   //       checkedDevFolders[Object.keys(checkedDevFolders)[index1]][index2]
  //   //     ] = data;
  //   //   } else {
  //   //     tempObj[Object.keys(checkedDevFolders)[index1]][
  //   //       checkedDevFolders[Object.keys(checkedDevFolders)[index1]]
  //   //     ] = data;
  //   //   }

  //   //   Object.entries(tempObj).forEach(([key, value]) => {
  //   //     if (!checkedBatchFolders.includes(key)) delete tempObj[key];
  //   //     else {
  //   //       if (
  //   //         Object.keys(value).length === 0 &&
  //   //         tempObj[key].constructor === Object
  //   //       )
  //   //         delete tempObj[key];
  //   //       if (Array.isArray(value) && value.length === 0) delete tempObj[key];
  //   //       else if (Object.entries(value))
  //   //         Object.entries(value).forEach(([key2, value2]) => {
  //   //           console.log(`Went in key2 ${key2}  `);
  //   //           if (Array.isArray(value2) && value2.length === 0) {
  //   //             console.log(`Went in value2 ${value2}  `);
  //   //             delete tempObj[key][key2];
  //   //           }
  //   //         });
  //   //     }
  //   //   });
  //   //   console.log(`In SBD Folders,  checkedSBDFolders`, tempObj);
  //   //   updateCheckedSBDFolders(tempObj);
  //   //   return tempObj;
  //   // });
  // };
  const updateCheckedNames = (batchFolderName, devFolderName, data) => {
    const tempObj = { ...checkedSBDFolders };
    if (checkedDevFolders) {
      if (!tempObj[batchFolderName]) {
        tempObj[batchFolderName] = {};
      }
    }
    tempObj[batchFolderName][devFolderName] = data;
    // if (checkedDevFolders[batchFolderName][devFolderName]) {

    // }
    // } else {
    //   tempObj[Object.keys(checkedDevFolders)[index1]][
    //     checkedDevFolders[Object.keys(checkedDevFolders)[index1]]
    //   ] = data;
    // }

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
            // console.log(`Went in key2 ${key2}  `);
            if (Array.isArray(value2) && value2.length === 0) {
              //console.log(`Went in value2 ${value2}  `);
              delete tempObj[key][key2];
            }
          });
      }
    });
    // console.log(`In SBD Folders,  checkedSBDFolders`, tempObj);
    updateCheckedSBDFolders(tempObj);
  };
  const batchFolderNames = [];
  // These codes are to re-order the keys in the checkedDevFolder otherwise it doesnot render
  // in a proper order
  const tempDevObj = {};
  checkedBatchFolders.forEach((batchFolderName) => {
    if (checkedDevFolders[batchFolderName])
      tempDevObj[batchFolderName] = checkedDevFolders[batchFolderName];
  });

  Object.keys(tempDevObj).forEach((key) =>
    folderTrees.forEach((folderTree) => {
      if (folderTree.Name === key) {
        // console.log("In SBDFolder, folder Tree Names: ", folderTree.Name);
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
              // batchFolderNamesObj[key][devFolder.Name] = sbdFolderNames;
              devFolderNames.push(sbdFolderNames);
            // console.log("In SBD Folder, devFolderNames: ", sbdFolderNames);
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
        // console.log("In SBDFolder, folder Tree Names: ", folderTree.Name);
        batchFolderNamesObj[key] = {};
        if (folderTree.Subfolders.length > 0) {
          // let devFolderNames = {};
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
          // batchFolderNames.push(devFolderNames);
        }
      }
    })
  );

  // folderTrees.forEach((folderTree) => {
  //   if (folderTree.Name === key) {
  //     console.log("In SBDFolder, folder Tree Names: ", folderTree.Name);
  //     if (folderTree.Subfolders.length > 0) {
  //       const devFolderNames = [];
  //       folderTree.Subfolders.forEach((devFolder) => {
  //         const sbdFolderNames = [];
  //         if (tempDevObj && tempDevObj[key]) {
  //           if (
  //             tempDevObj[key].length > 0 &&
  //             tempDevObj[key].includes(devFolder.Name)
  //           ) {
  //             devFolder.Subfolders.forEach((sbdFolder) =>
  //               sbdFolderNames.push(sbdFolder.Name)
  //             );
  //           }
  //         }

  //         devFolderNames.push(sbdFolderNames);
  //         // console.log("In SBD Folder, devFolderNames: ", sbdFolderNames);
  //       });
  //       batchFolderNames.push(devFolderNames);
  //     }
  //   }
  // })
  // );

  // Object.keys(checkedDevFolders).forEach((key) =>
  //   folderTrees.forEach((folderTree) => {
  //     if (folderTree.Name === key) {
  //       console.log("In SBDFolder, folder Tree Names: ", folderTree.Name);
  //       if (folderTree.Subfolders.length > 0) {
  //         const devFolderNames = [];
  //         folderTree.Subfolders.forEach((devFolder) => {
  //           const sbdFolderNames = [];
  //           if (checkedDevFolders && checkedDevFolders[key]) {
  //             if (
  //               checkedDevFolders[key].length > 0 &&
  //               checkedDevFolders[key].includes(devFolder.Name)
  //             ) {
  //               devFolder.Subfolders.forEach((sbdFolder) =>
  //                 sbdFolderNames.push(sbdFolder.Name)
  //               );
  //             }
  //           }

  //           devFolderNames.push(sbdFolderNames);
  //           // console.log("In SBD Folder, devFolderNames: ", sbdFolderNames);
  //         });
  //         batchFolderNames.push(devFolderNames);
  //       }
  //     }
  //   })
  // );
  // checkedBatchFolders.forEach((checkedBatchFolder, index1) => {
  //   folderTrees.forEach((folderTree) => {
  //     if (folderTree.Name === checkedBatchFolder) {
  //       // console.log("In SBDFolder, folder Tree Names: ", folderTree.Name);
  //       if (folderTree.Subfolders.length > 0) {
  //         const devFolderNames = [];
  //         folderTree.Subfolders.forEach((devFolder) => {
  //           const sbdFolderNames = [];
  //           if (checkedDevFolders && checkedDevFolders[checkedBatchFolder]) {
  //             if (
  //               checkedDevFolders[checkedBatchFolder].length > 0 &&
  //               checkedDevFolders[checkedBatchFolder].includes(devFolder.Name)
  //             ) {
  //               devFolder.Subfolders.forEach((sbdFolder) =>
  //                 sbdFolderNames.push(sbdFolder.Name)
  //               );
  //             }
  //           }

  //           devFolderNames.push(sbdFolderNames);
  //           // console.log("In SBD Folder, devFolderNames: ", sbdFolderNames);
  //         });
  //         batchFolderNames.push(devFolderNames);
  //       }
  //     }
  //   });

  //   // console.log("In SBD Folder, batchFolderNames: ", batchFolderNames);
  // });
  // console.log(
  //   "In SBD Folder before rendering, batchFolderNames: ",
  //   batchFolderNames
  // );
  // console.log(
  //   "In SBD Folder before rendering, checkedDevFolders: ",
  //   checkedDevFolders
  // );

  // console.log(
  //   "In SBD Folder before rendering, checkedSBDFolders: ",
  //   checkedSBDFolders
  // );
  // console.log(
  //   "In SBD Folder before rendering, batchFolderNamesObj: ",
  //   batchFolderNamesObj
  // );
  // return <h6> under construction</h6>;

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
                  // arrCheckedNames={["B15", "C08"]}
                  // arrCheckedNames={
                  //   checkedSBDFolders &&
                  //   checkedSBDFolders[checkedBatchFolders[index1]]
                  //     ? checkedSBDFolders[checkedBatchFolders[index1]][
                  //         checkedDevFolders[checkedBatchFolders[index1][index2]]
                  //       ]
                  //       ? checkedSBDFolders[checkedBatchFolders[index1]][
                  //           checkedDevFolders[checkedBatchFolders[index1][index2]]
                  //         ]
                  //       : []
                  //     : []
                  // }
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
