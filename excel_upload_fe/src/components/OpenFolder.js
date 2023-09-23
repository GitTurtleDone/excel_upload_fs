import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";

function OpenFolder() {
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
        const jsonFolderTree = await response.json();
        console.log(jsonFolderTree);
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
