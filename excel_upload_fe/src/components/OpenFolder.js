import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";

function OpenFolder() {
  // const [folderPath, setFolderPath] = useState("");
  // const handleClick = () => {
  //   // fetch("http://localhost:5208/OpenFolder")
  //   //   //.then(response => response.json()) // Make an HTTP request to the backend endpoint
  //   //   .then(({ folderPath } = response.json())); // Extract the folder path from the response JSON

  //   axios
  //     .get("https://localhost:7200/OpenFolder")
  //     .then((response) => {
  //       //const { folderPath } = response.data.folderPath; // Assuming the response has a property named "folderPath"
  //       // Use the folderPath in your React component as needed
  //       console.log(response.data.FolderPath);
  //       setFolderPath(response.data.folderPath);
  //     })
  //     .catch((error) => {
  //       // Handle errors
  //       console.error(error);
  //     });

  //   // Do something with the selected folder path
  // };

  // const handleInputChange = (e) => {
  //   setFolderPath(e.target.value);
  // };

  // const [uploadingFolder, setUploadingFolder] = useState("");
  // const selectUploadingFolder = (e) => {
  //   const selectedPath = e.target.files[0].webkitRelativePath;
  //   setUploadingFolder(selectedPath);
  //   console.log(uploadingFolder);
  // };
  // return (
  //   <>
  //     {/* <div>
  //       <button onClick={handleClick}>Select Folder</button>
  //       <input
  //         type="text"
  //         value={folderPath}
  //         onChange={handleInputChange}
  //       ></input>
  //     </div> */}
  //     <div>
  //       {/* //<button>Select .zip files</button> */}
  //       <input
  //         type="file"
  //         webkitdirectory
  //         directory="true"
  //         multiple
  //         onChange={selectUploadingFolder}
  //       />
  //       {uploadingFolder && <p> Uploading Folder: {uploadingFolder}</p>}
  //     </div>
  //   </>
  // );

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://localhost:7200/UploadZipFile", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("File uploaded successfully");
      } else {
        console.error("File upload failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <input type="file" accept=".zip" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default OpenFolder;
