import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
//import OpenFolder from "./components/UploadZipFile";
import UploadZipFile from "./components/UploadZipFile";
import FolderTrees from "./components/FolderTrees";

function App() {
  const [folderTrees, setFolderTrees] = useState([]);

  const updateFolderTree = async (data) => {
    const exists = folderTrees.some(
      (folderTree) => folderTree.Name === data.Name
    );
    if (!exists)
      setFolderTrees((prevFolderTrees) => [...prevFolderTrees, data]);
  };

  const [uploadFrame, setUploadFrame] = useState(1);
  const addUploadFrame = () => {
    setUploadFrame((prevUploadFrame) => prevUploadFrame + 1);
  };
  const removeUploadFrame = () => {
    setUploadFrame((prevUploadFrame) => prevUploadFrame - 1);
  };

  return (
    <div>
      <button onClick={addUploadFrame}>+</button>
      <button onClick={removeUploadFrame}>-</button>
      {Array.from({ length: uploadFrame }).map((_, index) => (
        <UploadZipFile key={index} updateFolderTree={updateFolderTree} />
      ))}

      <FolderTrees folderTrees={folderTrees} />
    </div>
  );
}
export default App;
