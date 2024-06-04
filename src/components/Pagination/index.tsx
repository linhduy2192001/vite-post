import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

const Paginate = ({ page, totalPage }: { page: number; totalPage: number }) => {
  return (
    <nav aria-label="...">
      <ul className="pagination justify-content-center ">
        {page === 1 ? (
          <li className="page-item ">
            <span className="page-link disabled">Previous</span>
          </li>
        ) : (
          <li className="page-item ">
            <Link className="page-link" to={`?page=${page - 1}`}>
              Previous
            </Link>
          </li>
        )}

        {Array(totalPage)
          .fill(0)
          .map((_, i) => {
            const pageNumber = i + 1;
            const isActive = page === pageNumber;
            return (
              <li
                key={pageNumber}
                className={classNames("page-item", { active: isActive })}
              >
                <Link className="page-link" to={`?page=${pageNumber}`}>
                  {pageNumber}
                </Link>
              </li>
            );
          })}
        {page === totalPage ? (
          <li className="page-item">
            <span className="page-link">Next</span>
          </li>
        ) : (
          <li className="page-item">
            <Link className="page-link" to={`?page=${page + 1}`}>
              Next
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Paginate;
