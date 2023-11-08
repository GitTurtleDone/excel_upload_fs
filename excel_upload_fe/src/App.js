import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
//import OpenFolder from "./components/UploadZipFile";
import UploadZipFile from "./components/UploadZipFile";
import Folder from "./components/Folder";

function App() {
  const [folderTree, setFolderTree] = useState({});
  const updateFolderTree = (data) => {
    setFolderTree(data);
  };

  return (
    <div>
      <UploadZipFile updateFolderTree={updateFolderTree} />
      <Folder folderTree={folderTree} />
    </div>
  );
}
export default App;
