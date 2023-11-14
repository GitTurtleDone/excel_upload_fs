import "./Folder.css";
import React, { useState } from "react";
function NameContainer({ arrNames, updateCheckedNames }) {
  const [checkedFolderNames, setCheckedFolderNames] = useState([]);
  const handleCheckboxChange = (folderName) => {
    setCheckedFolderNames((prevCheckedFolderNames) => {
      prevCheckedFolderNames = prevCheckedFolderNames.includes(folderName)
        ? prevCheckedFolderNames.filter(
            (checkedFolderName) => checkedFolderName !== folderName
          )
        : [...prevCheckedFolderNames, folderName];

      return arrNames.filter((arrName) =>
        prevCheckedFolderNames.includes(arrName)
      );
    });
  };
  updateCheckedNames(checkedFolderNames);
  arrNames = Array.isArray(arrNames) ? arrNames : [arrNames];
  return (
    <div className="nameContainer">
      {arrNames.map((folderName) => (
        <div className="folderLineContainer">
          <input
            type="checkbox"
            checked={checkedFolderNames.includes(folderName)}
            onChange={() => handleCheckboxChange(folderName)}
          />
          <h6>{folderName}</h6>
        </div>
      ))}
    </div>
  );
}
export default NameContainer;
