import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";

function UploadZipFile() {
  const [file, setFile] = useState(null);

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
      console.log(response.data.Name);
    } catch (error) {
      // Handle any errors here
      console.error("Error:", error);
    }

    //   try {
    //     const response = await fetch("https://localhost:7200/UploadZipFile", {
    //       method: "POST",
    //       body: formData,
    //     });

    //     if (response.ok) {
    //       console.log("File uploaded successfully");
    //       const jsonFolderTree = await response.json();
    //       console.log("jsonFolderTree: ", jsonFolderTree["Name"]);

    //       const escapedJSONFolderTree = JSON.stringify(jsonFolderTree);

    //       console.log("escapedJSONFolderTree: ", jsonFolderTree["Name"]);
    //       const folderTree = JSON.parse(escapedJSONFolderTree);
    //       console.log("JSON parse", folderTree);
    //       //console.log(folderTree.Subfolders.[0].Name);
    //       // console.log(jsonFolderTree);
    //       // //----------Creating components from the returned jsonFolderTree -------------
    //       // //const folderTree = JSON.parse(jsonFolderTree);
    //       // try {

    //       //   // Use the parsed folderTree object
    //       // } catch (error) {
    //       //   console.log();
    //       //   console.error("Error parsing JSON:", error);
    //       //   // Handle the parsing error
    //       // }

    //       //const subfolders = folderTree.Subfolders;
    //       //console.log(subfolders[0].Name);

    //       // // Check if subfolders exist and extract their names
    //       // if (subfolders && subfolders.length >= 2) {
    //       //   const firstSubfolderName = subfolders[0].name;
    //       //   const secondSubfolderName = subfolders[1].name;

    //       //   // Now you can use firstSubfolderName and secondSubfolderName as needed
    //       // } else {
    //       //   // Handle the case where there are not enough subfolders
    //       // }

    //       //----------Creating components from the returned jsonFolderTree -------------
    //     } else {
    //       console.error("File upload failed");
    //     }
    //   } catch (error) {
    //     console.error("Error:", error);
    //   }
  };

  return (
    <div>
      <input type="file" accept=".zip" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadZipFile;
