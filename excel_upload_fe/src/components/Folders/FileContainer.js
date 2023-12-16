import React, { useState } from "react";
import NameContainer from "./NameContainer";
import DropdownMenu from "./DropdownMenu";

function FileContainer() {
  const arrFileNames = ["File 1", "File 2"];
  const arrCheckedFiles = ["File 1"];
  return (
    <div>
      <DropdownMenu />
      <NameContainer
        arrNames={arrFileNames}
        arrCheckedNames={arrCheckedFiles}
        updateCheckedNames={() => {
          console.log("updateCheckedNames");
        }}
      />
    </div>
  );
}
export default FileContainer;
