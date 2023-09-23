import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import OpenFolder from "./components/UploadZipFile";
import UploadZipFile from "./components/UploadZipFile";

function App() {
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

  const handleInputChange = () => {
    setFolderPath(folderPath);
  };

  return (
    <div>
      <UploadZipFile />
    </div>
  );
}
export default App;
