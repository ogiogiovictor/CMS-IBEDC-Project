import React from "react";

export const CustomerInfoTable = ({ customerInfo }) => {
  const extractedObject = {
    ...customerInfo,
  };

  for (const key in extractedObject) {
    if (typeof extractedObject[key] === "object") {
      delete extractedObject[key];
    }
    if (typeof extractedObject[key] === "array") {
      delete extractedObject[key];
    }
  }

  const formatString = (str) => {
    return str.replace(/([a-z])([A-Z])/g, "$1 $2");
  };

  const entries = Object.entries(extractedObject);
  const chunkSize = 3;
  const rows = [...Array(Math.ceil(entries.length / chunkSize))];

  const tableRows = rows.map((row, rowIndex) => {
    return (
      <tr key={rowIndex}>
        {entries
          .slice(rowIndex * chunkSize, rowIndex * chunkSize + chunkSize)
          .map(([key, value], colIndex) => {
            return (
              <td key={colIndex}>
                <strong>{formatString(key)}:</strong> {value}
              </td>
            );
          })}
      </tr>
    );
  });

  return (
    <>
      <table className="table table-borderless w-100 mt-4">{tableRows}</table>
    </>
  );
};
