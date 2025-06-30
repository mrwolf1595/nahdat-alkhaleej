import React from 'react';

type PaginationProps = Record<string, unknown>;

const Pagination: React.FC<PaginationProps> = () => {
  return (
    <div className="mt-8 md:mt-12 flex justify-center">
      <nav className="inline-flex rounded-md shadow">
        <a
          href="#"
          className="py-1 px-2 md:py-2 md:px-4 border border-gray-300 rounded-l-md text-xs md:text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="py-1 px-2 md:py-2 md:px-4 bg-blue-600 border border-blue-600 text-xs md:text-sm font-medium text-white"
        >
          1
        </a>
        <a
          href="#"
          className="py-1 px-2 md:py-2 md:px-4 border border-gray-300 text-xs md:text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          2
        </a>
        <a
          href="#"
          className="py-1 px-2 md:py-2 md:px-4 border border-gray-300 text-xs md:text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          3
        </a>
        <a
          href="#"
          className="py-1 px-2 md:py-2 md:px-4 border border-gray-300 rounded-r-md text-xs md:text-sm font-medium text-gray-500 hover:bg-gray-50"
        >
          Next
        </a>
      </nav>
    </div>
  );
};

export default Pagination;