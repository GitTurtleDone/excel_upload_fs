import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";

function UploadZipFile({ updateFolderTree }) {
  const [file, setFile] = useState(null);
  //const [folderTree, setFolderTree] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        "https://localhost:7200/UploadZipFile",
        formData
      );
      // Handle the successful response here
      console.log("Data received:", response.data);
      console.log("Name in Upload Zip File", response.data["Name"]);
      //setFolderTree(response.data);
      updateFolderTree(response.data);
    } catch (error) {
      // Handle any errors here
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

export default UploadZipFile;
