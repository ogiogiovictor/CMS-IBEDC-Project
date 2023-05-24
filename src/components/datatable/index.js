import React, { useState } from "react";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import Pagination from "../pagination";
import { Link } from "react-router-dom";

const DataTable = ({
  data = [],
  columns = [],
  pagination = false,
  currentPage = 1,
  totalCount = 1,
  pageSize = 1,
  onPageChange = () => {},
  onActionClick = () => {},
  Edit = false, // Optional prop for edit functionality
  onEditClick = () => {}, // Add the onEditClick prop
}) => {
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handleActionClick = (item) => {
    onActionClick(item);
  };

  const handleEditClick = (item) => {
    onEditClick(item);
  };

  const sortedData = sortColumn
    ? data.sort((a, b) => {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];
        if (valueA < valueB) {
          return sortOrder === "asc" ? -1 : 1;
        } else if (valueA > valueB) {
          return sortOrder === "asc" ? 1 : -1;
        } else {
          return 0;
        }
      })
    : data;

  return (
    <>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.title} onClick={() => handleSort(column.field)}>
                  {column.title}{" "}
                  {sortColumn === column.field &&
                    (sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />)}
                </th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.field}>{item[column.field]}</td>
                ))}
                <td>
                  <button
                    type="submit"
                    className="btn btn-xs btn-success"
                    onClick={() => handleActionClick(item)}
                  >
                    View
                  </button>
                  &nbsp;&nbsp;

                  {Edit && (
                    <button
                      type="submit"
                      className="btn btn-xs btn-primary"
                      onClick={() => handleEditClick(item)} // Call the onEditClick function
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && (
        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};

export default DataTable;
