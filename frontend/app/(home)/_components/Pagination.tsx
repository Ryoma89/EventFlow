import React from "react";
import { PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageClick = (pageNumber: number) => {
    onPageChange(pageNumber);
  };

  return (
    <div className="mt-10 flex justify-center">
      <PaginationContent className="flex items-center">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => handlePageClick(currentPage > 1 ? currentPage - 1 : currentPage)}
          />
        </PaginationItem>

        <div className="sm:hidden">
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={() => handlePageClick(currentPage)}
              isActive={true}
            >
              {currentPage}
            </PaginationLink>
          </PaginationItem>
        </div>

        <div className="hidden sm:flex">
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={() => handlePageClick(currentPage - 1)}
              >
                {currentPage - 1}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={() => handlePageClick(currentPage)}
              isActive={true}
            >
              {currentPage}
            </PaginationLink>
          </PaginationItem>
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={() => handlePageClick(currentPage + 1)}
              >
                {currentPage + 1}
              </PaginationLink>
            </PaginationItem>
          )}
        </div>

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => handlePageClick(currentPage < totalPages ? currentPage + 1 : currentPage)}
          />
        </PaginationItem>
      </PaginationContent>
    </div>
  );
};

export default Pagination;
