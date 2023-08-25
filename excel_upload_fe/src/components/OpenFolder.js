import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";

function OpenFolder() {
  const [folderPath, setFolderPath] = useState("");
  const handleClick = () => {
    // fetch("http://localhost:5208/OpenFolder")
    //   //.then(response => response.json()) // Make an HTTP request to the backend endpoint
    //   .then(({ folderPath } = response.json())); // Extract the folder path from the response JSON

    axios
      .get("https://localhost:7200/OpenFolder")
      .then((response) => {
        //const { folderPath } = response.data.folderPath; // Assuming the response has a property named "folderPath"
        // Use the folderPath in your React component as needed
        console.log(response.data.FolderPath);
        setFolderPath(response.data.folderPath);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });

    // Do something with the selected folder path
  };

  const handleInputChange = (e) => {
    setFolderPath(e.target.value);
  };

  const [uploadingFolder, setUploadingFolder] = useState("");
  const selectUploadingFolder = (e) => {
    setUploadingFolder(e.target.files[0]);
  };
  return (
    <>
      <div>
        <button onClick={handleClick}>Select Folder</button>
        <input
          type="text"
          value={folderPath}
          onChange={handleInputChange}
        ></input>
      </div>
      <div>
        <button>Select .zip files</button>
        <input
          type="directory"
          onChange={selectUploadingFolder}
          webkitdirectory="true"
        ></input>
      </div>
    </>
  );
}

export default OpenFolder;
