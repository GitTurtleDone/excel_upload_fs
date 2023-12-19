import React, { useState } from "react";

const DropdownMenu = ({ updateSelectedFileType }) => {
  const allFiles = [
    { type: "All", extension: "." },
    { type: "Excel", extension: ".xlsx" },
    { type: "CSV", extension: ".csv" },
    { type: "PNG Image", extension: ".png" },
    { type: "Text", extension: ".txt" },

    // Add more files with different types
  ];

  const [selectedFileType, setSelectedFileType] = useState("All");
  const filteredFiles =
    selectedFileType === "All"
      ? allFiles
      : allFiles.filter((file) => file.type === selectedFileType);

  const handleFilterChange = (event) => {
    // setSelectedFileType(event.target.value);
    // updateSelectedFileType(event.target.value);
    console.log("In DropdownMenu.js ", event.target.value);
  };

  return (
    <div>
      <label>
        Select File Type:
        <select value={selectedFileType} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Excel">.xlsx</option>
          <option value="CSV">.csv</option>
          <option value="PNG Image">.png</option>
          <option value="Text">.txt</option>
          {/* Add more file types as needed */}
        </select>
      </label>

      <div
        className="file-container"
        style={{
          maxHeight: "200px",
          overflowY: "auto",
          border: "1px solid #ccc",
        }}
      >
        {filteredFiles.map((file) => (
          <div
            key={file.name}
            style={{ padding: "8px", borderBottom: "1px solid #eee" }}
          >
            {file.name} - {file.type}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownMenu;
