import React, { useState } from "react";
import NameContainer from "./NameContainer";
import DropdownMenu from "./DropdownMenu";

function FileContainer({
  arrFileNames,
  arrCheckedFileNames,
  updateCheckedFileNames,
  updateCheckedFileType,
}) {
  // const arrFileNames = ["File 1", "File 2"];
  const [selectedFileType, setSelectedFileType] = useState(".xlsx");
  const updateCheckedNames = (data) => {
    updateCheckedFileNames(data);
  };
  const updateSelectedFileType = (fileType) => {
    // updateCheckedFileType(fileType);
    setSelectedFileType(fileType);
    console.log("FileContainer.js ", fileType);
  };
  const renderFileNames = arrFileNames.filter(
    (fileName) =>
      fileName.includes(selectedFileType) || selectedFileType === "All"
  );
  const renderCheckedFileNames = arrCheckedFileNames.filter(
    (checkedFileName) =>
      checkedFileName.includes(selectedFileType) || selectedFileType === "All"
  );
  // renderFileNames.filter(
  //   (fileName) =>
  //     fileName.includes(selectedFileType) || selectedFileType === "All"
  // );
  // renderCheckedFileNames.filter(
  //   (checkedFileName) =>
  //     checkedFileName.includes(selectedFileType) || selectedFileType === "All"
  // );
  return (
    <div>
      <DropdownMenu updateSelectedFileType={updateSelectedFileType} />
      <NameContainer
        arrNames={renderFileNames}
        arrCheckedNames={renderCheckedFileNames}
        updateCheckedNames={updateCheckedNames}
      />
    </div>
  );
}
export default FileContainer;
