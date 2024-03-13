import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  PaginationEllipsis,
} from '../../components/ui/pagination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  filter?: string;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  baseUrl,
  filter,
}) => {
  const paginationItems = [];

  const maxPagesToShow = 7;
  const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

  let startPage = Math.max(1, currentPage - halfMaxPagesToShow);
  let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    paginationItems.push(
      <PaginationItem key={`page-${i}`}>
        <PaginationLink
          href={`${baseUrl}?page=${i}${filter ? `&filter=${filter}` : ''}`}
          isActive={i === currentPage}
        >
          {i}
        </PaginationLink>
      </PaginationItem>
    );
  }

  if (startPage > 1) {
    paginationItems.unshift(<PaginationEllipsis key="ellipsis-start" />);
  }

  if (endPage < totalPages) {
    paginationItems.push(<PaginationEllipsis key="ellipsis-end" />);
  }

  if (startPage > 1 && endPage < totalPages) {
    paginationItems.splice(1, 1);
  }

  return (
    <Pagination className="fixed bottom-0 w-full pb-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            className={`
            ${
              currentPage <= 1 ? 'pointer-events-none opacity-50' : undefined
            } w-24`}
            href={`${baseUrl}?page=${currentPage - 1}${
              filter ? `&filter=${filter}` : ''
            }`}
          />
        </PaginationItem>
        {paginationItems}
        <PaginationItem>
          <PaginationNext
            aria-disabled={currentPage === totalPages}
            tabIndex={currentPage === totalPages ? -1 : undefined}
            className={`
              ${
                currentPage === totalPages
                  ? 'pointer-events-none opacity-50'
                  : undefined
              } w-24`}
            href={`${baseUrl}?page=${currentPage + 1}${
              filter ? `&filter=${filter}` : ''
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
