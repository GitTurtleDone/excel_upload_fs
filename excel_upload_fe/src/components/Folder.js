import React, { useState } from "react";
//import folderTree from "./UploadZipFile";
//import axios, { AxiosResponse } from "axios";

function Folder({ folderTree }) {
  return (
    <div>
      <h1>
        Hello Folder Tree in Folder:
        {folderTree.Name}
        {/* {folderTree.Subfolders[0].Subfolders[0].Name} */}
      </h1>
    </div>
  );
}

export default Folder;
