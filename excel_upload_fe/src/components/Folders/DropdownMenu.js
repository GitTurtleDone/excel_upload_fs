import React, { useState } from "react";

const DropdownMenu = () => {
  const allFiles = [
    { name: "File 1", type: "Image" },
    { name: "File 2", type: "Document" },
    { name: "File 3", type: "Image" },
    { name: "File 4", type: "Video" },
    // Add more files with different types
  ];

  const [selectedFileType, setSelectedFileType] = useState("All");
  const filteredFiles =
    selectedFileType === "All"
      ? allFiles
      : allFiles.filter((file) => file.type === selectedFileType);

  const handleFilterChange = (event) => {
    setSelectedFileType(event.target.value);
  };

  return (
    <div>
      <label>
        Select File Type:
        <select value={selectedFileType} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Image">Image</option>
          <option value="Document">Document</option>
          <option value="Video">Video</option>
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
