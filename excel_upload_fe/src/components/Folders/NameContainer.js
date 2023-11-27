import "./Folder.css";
import React, { useState } from "react";
function NameContainer({ arrNames, arrCheckedNames, updateCheckedNames }) {
  // function NameContainer({ arrNames, updateCheckedNames }) {
  const [checkedFolderNames, setCheckedFolderNames] = useState(arrCheckedNames);
  const handleCheckboxChange = (folderName) => {
    let tempArr = [...arrCheckedNames];
    tempArr = tempArr.includes(folderName)
      ? tempArr.filter((checkedFolderName) => checkedFolderName !== folderName)
      : [...tempArr, folderName];
    // These codes to keep same order as seen in the parent folder
    let tempArr1 = arrNames.filter((arrName) => tempArr.includes(arrName));
    setCheckedFolderNames(tempArr1);
    updateCheckedNames(tempArr1);
    setSelectAll(
      () =>
        Array.isArray(arrNames) &&
        Array.isArray(tempArr1) &&
        arrNames.every((arrName) => tempArr1.includes(arrName))
    );
    // console.log(
    //   `In Name Container: arrNames === tempArr1, ${
    //     arrNames === tempArr1
    //   }, arrNames ${arrNames}, tempArr1 ${tempArr1}`
    // );
  };

  arrNames = Array.isArray(arrNames) ? arrNames : [arrNames];
  const [selectAll, setSelectAll] = useState(
    () =>
      Array.isArray(arrNames) &&
      Array.isArray(arrCheckedNames) &&
      arrNames.every((arrName) => arrCheckedNames.includes(arrName))
  );
  const handleSelectAll = (selectAll) => {
    setSelectAll(!selectAll);
    if (!selectAll) updateCheckedNames(arrNames);
    else updateCheckedNames([]);
  };
  //console.log(`In Name Cointainer, arrCheckedNames: `, arrCheckedNames);
  return (
    <div className="nameContainer">
      <input
        type="checkbox"
        key="selectAll"
        checked={selectAll}
        onChange={() => handleSelectAll(selectAll)}
      />
      Select All
      {arrNames.map((folderName, index) => (
        <div className="folderLineContainer">
          <input
            type="checkbox"
            key={index}
            checked={arrCheckedNames && arrCheckedNames.includes(folderName)}
            onChange={() => handleCheckboxChange(folderName)}
          />
          <h6>{folderName}</h6>
        </div>
      ))}
    </div>
  );
}
export default NameContainer;
