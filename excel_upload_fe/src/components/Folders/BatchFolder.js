import React, { useState } from "react";
function BatchFolder({ folderTrees }) {
  //const [batchFolderTreeNames, setBatchFolderTreeNames] = useState([]);

  if (!folderTrees) {
    return <div>No folder trees available</div>;
  }

  // Map the Name properties and join them with newline characters
  const folderTreeNames = folderTrees
    .map((folderTree) => folderTree.Name)
    .join("\n");

  return (
    <div>
      <button className="processButton">Process</button>
      <textarea value={folderTreeNames}></textarea>
    </div>
  );
}
export default BatchFolder;
