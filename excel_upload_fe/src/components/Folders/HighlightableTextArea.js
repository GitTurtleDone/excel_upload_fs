import React, { useState } from "react";

const HighlightableTextArea = ({ text }) => {
  const [selectedLines, setSelectedLines] = useState([]);

  const handleLineClick = (lineNumber) => {
    // Toggle selection for the clicked line
    setSelectedLines((prevSelectedLines) =>
      prevSelectedLines.includes(lineNumber)
        ? prevSelectedLines.filter((line) => line !== lineNumber)
        : [...prevSelectedLines, lineNumber]
    );
  };

  // Check if text is defined and is a string before splitting
  const lines = typeof text === "string" ? text : [];

  return (
    <div style={{ position: "relative" }}>
      <textarea
        text={text}
        // rows={lines.length}
        cols="50"
        readOnly
        style={{ marginRight: "10px" }}
      />

      <div style={{ position: "absolute", top: 0, left: "100%" }}>
        {lines.map((line, index) => (
          <div
            key={index}
            style={{
              backgroundColor: selectedLines.includes(index + 1)
                ? "yellow"
                : "transparent",
              cursor: "pointer",
              padding: "2px",
            }}
            onClick={() => handleLineClick(index + 1)}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HighlightableTextArea;
