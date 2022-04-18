import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

const Pagination = ({ indexOfFirstProduct, indexOfLastProduct, currentPage, productsPerPage, totalProducts, paginate, previousPaginate, nextPaginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
      <span className="flex items-center col-span-3">Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, totalProducts)} of {totalProducts}</span>
      <span className="col-span-2" />
      {/* Pagination */}
      <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
        <nav aria-label="Table navigation">
          <ul className="inline-flex items-center">
            <li>
              <button
                onClick={() => previousPaginate()}
                disabled={currentPage === 1}
                className={`px-3 py-1 ${
                  currentPage === 1 && "cursor-not-allowed"
                } rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple`}
                aria-label="Previous"
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </button>
            </li>
            {pageNumbers.map((number) => (
              <li key={number}>
                <button
                  onClick={() => paginate(number)}
                  className={`px-3 py-1 ${
                    currentPage === number && "text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600"
                  } rounded-md focus:outline-none focus:shadow-outline-purple`}
                >
                  {number}
                </button>
              </li>
            ))}

            <li>
              <button
                onClick={() => nextPaginate()}
                disabled={indexOfFirstProduct+productsPerPage >= totalProducts}
                className={`px-3 py-1 ${
                  indexOfFirstProduct+productsPerPage >= totalProducts && "cursor-not-allowed"
                } rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple`}
                aria-label="Next"
              >
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </li>
          </ul>
        </nav>
      </span>
    </div>
  );
};

export default Pagination;
