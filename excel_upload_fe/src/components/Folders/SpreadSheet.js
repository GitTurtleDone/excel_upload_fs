import React from "react";
import "react-data-grid/lib/styles.css";

import DataGrid from "react-data-grid";

const SpreadSheet = () => {
  const columns = [
    { key: "id", name: "ID" },
    { key: "name", name: "Name" },
    { key: "age", name: "Age" },
  ];

  const rows = [
    { id: 1, name: "John Doe", age: 25 },
    { id: 2, name: "Jane Smith", age: 30 },
    { id: 3, name: "Bob Johnson", age: 35 },
  ];

  return (
    <div>
      <h1>Spreadsheet</h1>
      <DataGrid columns={columns} rows={rows} />
    </div>
  );
};

export default SpreadSheet;
