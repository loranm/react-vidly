import React from 'react';

const Pagination = props => {
  const {itemsCount, pageSize, onPageChange, currentPage} = props;
  const pagination = new Array(Math.ceil(itemsCount / pageSize))
    .fill(null)
    .map((_, i) => i + 1)
  return (
    <nav aria-label="...">
      <ul className="pagination pagination-lg">
        {pagination.map(pageNumber => {
          return (
            pagination.length > 1 ? 
              <li className={pageNumber === currentPage ? 'page-item active' : 'page-item' } key={pageNumber} >
                <a className="page-link" onClick={()=> onPageChange(pageNumber)}>{pageNumber}</a>
              </li> :
              null

          )
        })}
      </ul>
    </nav>
  );
}

export default Pagination;

