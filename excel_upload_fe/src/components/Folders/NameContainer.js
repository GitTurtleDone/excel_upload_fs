import "./Folder.css";
import React, { useState } from "react";
// function NameContainer({ arrNames, arrCheckedNames, updateCheckedNames }) {
function NameContainer({ arrNames, updateCheckedNames }) {
  const [checkedFolderNames, setCheckedFolderNames] = useState([]);
  const handleCheckboxChange = (folderName) => {
    setCheckedFolderNames((prevCheckedFolderNames) => {
      prevCheckedFolderNames = prevCheckedFolderNames.includes(folderName)
        ? prevCheckedFolderNames.filter(
            (checkedFolderName) => checkedFolderName !== folderName
          )
        : [...prevCheckedFolderNames, folderName];
      let tempArr = arrNames.filter((arrName) =>
        prevCheckedFolderNames.includes(arrName)
      );
      updateCheckedNames(tempArr);
      return tempArr;
    });
  };

  arrNames = Array.isArray(arrNames) ? arrNames : [arrNames];
  //console.log(`In Name Cointainer, arrCheckedNames: `, arrCheckedNames);
  return (
    <div className="nameContainer">
      {arrNames.map((folderName, index) => (
        <div className="folderLineContainer">
          <input
            type="checkbox"
            key={index}
            // checked={
            //   checkedFolderNames && checkedFolderNames.includes(folderName)
            // }
            onChange={() => handleCheckboxChange(folderName)}
          />
          <h6>{folderName}</h6>
        </div>
      ))}
    </div>
  );
}
export default NameContainer;
