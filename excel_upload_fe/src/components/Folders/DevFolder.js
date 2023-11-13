import React, { useState } from "react";
import "./Folder.css";
import NameContainer from "./NameContainer";
// import HighlightableTextArea from "./HighlightableTextArea";
// import "codemirror/lib/codemirror.css";
// // import "codemirror/addon/display/rulers.css";
// import "codemirror/theme/material.css";
// import "codemirror/mode/javascript/javascript";
// import CodeMirror from "codemirror";

function DevFolder({
  folderTrees,
  folderTreeNames,
  checkedBatchFolders,
  // updateCheckedDevFolders,
}) {
  const arrNames = [];
  const [devFolderTreeNames, setDevFolderTreeNames] = useState([]);
  const updateCheckedNames = (instance, data) => {
    console.log(`Callbac for Instance ${instance}: `, data);
    // updateCheckedDevFolders(data);
  };
  if (!folderTrees) {
    return <div>No folder trees available</div>;
  }
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
  console.log("dev Folder Names: ", devFolderNames);
  console.log("dev Folder Names Length: ", devFolderNames.length);
  // setDevFolderTreeNames(devFolderNames);

  // console.log("folderTreeNames: ", devFolderTreeNames);
  return (
    <div>
      <div>
        <button className="processButton">Process</button>
        <h6>Device Level Folders</h6>
      </div>

      {/* <NameContainer
        arrNames={devFolderNames[0]}
        updateCheckedNames={(data) => updateCheckedNames(0, data)}
      ></NameContainer>
      <NameContainer
        arrNames={devFolderNames[1]}
        updateCheckedNames={(data) => updateCheckedNames(1, data)}
      ></NameContainer> */}
      {/* <div>
        {(() => {
          <h6>Folder:</h6>;
          if (devFolderNames && devFolderNames.length > 0) {
            for (let i = 0; i < devFolderNames.length; i++) {
              <NameContainer
                arrNames={devFolderNames[i]}
                updateCheckedNames={(data) => updateCheckedNames(i, data)}
              ></NameContainer>;
            }
          }
        })()}
      </div> */}
      {/* {(() => {
        arrNames = Array.isArray(devFolderNames[0])
          ? devFolderNames[0]
          : [devFolderNames[0]];
        return;
        arrNames.map((folderName) => (
          <div className="folderLineContainer">
            <input
              type="checkbox"
              // checked={checkedFolderNames.includes(folderName)}
              // onChange={() => handleCheckboxChange(folderName)}
            />
            <h6>{folderName}</h6>
          </div>
        ));

        //  <h6>Dev Folder 1</h6>
      })()} */}

      {/* {(() => {
        // // Assign the value to arrNames
        // const arrNames = Array.isArray(devFolderNames[0])
        //   ? devFolderNames[0]
        //   : [devFolderNames[0]];

        // // Use parentheses instead of curly braces
        // return arrNames.map((folderName) => (
        //   <div className="folderLineContainer" key={folderName}>
        //     <input
        //       type="checkbox"
        //       // checked={checkedFolderNames.includes(folderName)}
        //       // onChange={() => handleCheckboxChange(folderName)}
        //     />
        //     <h6>{folderName}</h6>
        //   </div>
        // ));
        return;
        devFolderNames.map((_, index) => (
          <NameContainer
          key
            arrNames={devFolderNames[index]}
            updateCheckedNames={(data) => updateCheckedNames(index, data)}
          ></NameContainer>
        ));
      })()} */}
      {(() => {
        // // Assign the value to arrNames
        // const arrNames = Array.isArray(devFolderNames[0])
        //   ? devFolderNames[0]
        //   : [devFolderNames[0]];

        // // Use parentheses instead of curly braces
        // return arrNames.map((folderName) => (
        //   <div className="folderLineContainer" key={folderName}>
        //     <input
        //       type="checkbox"
        //       // checked={checkedFolderNames.includes(folderName)}
        //       // onChange={() => handleCheckboxChange(folderName)}
        //     />
        //     <h6>{folderName}</h6>
        //   </div>
        // ));

        return devFolderNames.map((_, index) => (
          <NameContainer
            // key={index} // Add a key prop for each NameContainer
            arrNames={devFolderNames[index]}
            updateCheckedNames={(data) => updateCheckedNames(index, data)}
          ></NameContainer>
        ));
      })()}
    </div>
  );
}
export default DevFolder;
