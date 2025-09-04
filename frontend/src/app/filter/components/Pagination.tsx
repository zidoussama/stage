// components/Pagination.tsx
'use client';

import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <nav className="flex items-center gap-2">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="p-2 disabled:opacity-50"
      >
        <FiChevronLeft />
      </button>

      {Array.from({ length: totalPages }, (_, idx) => (
        <button
          key={idx + 1}
          onClick={() => onPageChange(idx + 1)}
          className={`w-8 h-8 rounded-md font-semibold ${
            currentPage === idx + 1
              ? 'bg-gray-800 text-white'
              : 'hover:bg-gray-200'
          }`}
        >
          {idx + 1}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="p-2 disabled:opacity-50"
      >
        <FiChevronRight />
      </button>
    </nav>
  );
};

export default Pagination;
