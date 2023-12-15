import React from 'react';

const Pagination = ({ startupsPerPage, totalStartups, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalStartups / startupsPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = () => {
    if (pageNumbers.length <= 1) {
      return null;
    }

    const pagesToShow = 3; // Number of pages to show around the current page
    const firstPage = 1;
    const lastPage = pageNumbers.length;
    const ellipsis = '...';

    let startPage;
    let endPage;

    // If there are not enough pages to show, display all pages
    if (pageNumbers.length <= 5) {
      startPage = firstPage;
      endPage = lastPage;
    } else {
      // Determine the start and end pages based on the current page
      startPage = Math.max(firstPage, currentPage - pagesToShow);
      endPage = Math.min(lastPage, currentPage + pagesToShow);

      // If the current page is close to the start or end, adjust the range
      if (currentPage <= pagesToShow) {
        endPage = firstPage + 4;
      } else if (currentPage >= lastPage - pagesToShow) {
        startPage = lastPage - 4;
      }
    }

    const pages = [];

    // Show the first page
    pages.push(
      <li key={firstPage} className={firstPage === currentPage ? 'active bg-gray-400 font-semibold' : ''}>
        <span onClick={() => paginate(firstPage)} className='mx-3 cursor-pointer'>
          {firstPage}
        </span>
      </li>
    );

    // Show ellipsis if there are more pages before the current page
    if (startPage > firstPage + 1) {
      pages.push(
        <li key={'ellipsis-start'} className="ellipsis">
          {ellipsis}
        </li>
      );
    }

    // Show pages around the current page
    for (let i = startPage; i <= endPage; i++) {
      // Skip the first and last pages as they are always visible
      if (i !== firstPage && i !== lastPage) {
        pages.push(
          <li key={i} className={i === currentPage ? 'active bg-gray-400 font-semibold' : ''}>
            <span onClick={() => paginate(i)} className='mx-3 cursor-pointer'>
              {i}
            </span>
          </li>
        );
      }
    }

    // Show ellipsis if there are more pages after the current page
    if (endPage < lastPage - 1) {
      pages.push(
        <li key={'ellipsis-end'} className="ellipsis">
          {ellipsis}
        </li>
      );
    }

    // Show the last page
    pages.push(
      <li key={lastPage} className={lastPage === currentPage ? 'active bg-gray-400 font-semibold' : ''}>
        <span className='mx-3 cursor-pointer' onClick={() => paginate(lastPage)} >
          {lastPage}
        </span>
      </li>
    );

    return pages;
  };

  return (
    <nav>
      <ul className="pagination flex justify-center my-7 text-lg">
        {renderPageNumbers()}
      </ul>
    </nav>
  );
};

export default Pagination;
