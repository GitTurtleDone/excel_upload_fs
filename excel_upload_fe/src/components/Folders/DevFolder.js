import React, { useState } from "react";
import "./Folder.css";
import NameContainer from "./NameContainer";

function DevFolder({
  folderTrees,
  checkedBatchFolders,
  updateCheckedDevFolders,
}) {
  const [checkedDevFolders, setCheckedDevFolders] = useState();

  // Array.from({ length: checkedBatchFolders }, () => []
  const updateCheckedNames = (index, data) => {
    // checkedDevFolders[index] = data;
    // updateCheckedDevFolders(checkedDevFolders);
    // console.log(`In Dev Folder, Checked Dev Folders: `, checkedDevFolders);
    console.log(data);
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

  return (
    <div>
      <div>
        <button className="processButton">Process</button>
        <h6>Device Level Folders</h6>
      </div>

      {(() => {
        return devFolderNames.map((_, index) => (
          <NameContainer
            key={index} // Add a key prop for each NameContainer
            arrNames={devFolderNames[index]}
            updateCheckedNames={(data) => updateCheckedNames(index, data)}
          ></NameContainer>
        ));
      })()}
    </div>
  );
}
export default DevFolder;
