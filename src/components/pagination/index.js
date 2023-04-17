import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "./usePagination";
import { Link } from "react-router-dom";
// import "./pagination.scss";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className="pagination rounded-flat pagination-success">
      {currentPage === 1 ? (
        <li> </li>
      ) : (
        <li
          className={classnames("page-item", {
            disabled: currentPage === 1,
          })}
          onClick={onPrevious}
        >
          <Link className="page-link">
            <i className="icon-arrow-left"></i>
          </Link>
        </li>
      )}
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li
            className={classnames(
              pageNumber === currentPage ? "page-item active" : "page-item",
              {
                selected: pageNumber === currentPage,
              }
            )}
            onClick={() => onPageChange(pageNumber)}
          >
            <Link className="page-link">{pageNumber}</Link>
          </li>
        );
      })}
      {currentPage === lastPage ? (
        <li></li>
      ) : (
        <li
          className={classnames("page-item", {
            disabled: currentPage === lastPage,
          })}
          onClick={onNext}
        >
          <Link className="page-link">
            <i className="icon-arrow-right"></i>
          </Link>
        </li>
      )}
    </ul>
  );
};

export default Pagination;
