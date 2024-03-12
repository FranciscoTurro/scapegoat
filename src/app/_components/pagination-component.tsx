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
  decksPerPage: number;
  baseUrl: string;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  decksPerPage,
  baseUrl,
}) => {
  const paginationItems = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      totalPages > 7 &&
      i > 2 &&
      i < totalPages - 1 &&
      Math.abs(i - currentPage) > 1
    ) {
      if (i === 3 || i === totalPages - 2) {
        paginationItems.push(<PaginationEllipsis key={`ellipsis-${i}`} />);
      }
      continue;
    }

    paginationItems.push(
      <PaginationItem key={`page-${i}`}>
        <PaginationLink
          href={`${baseUrl}?page=${i}&per_page=${decksPerPage}`}
          isActive={i === currentPage}
        >
          {i}
        </PaginationLink>
      </PaginationItem>
    );
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            className={
              currentPage <= 1 ? 'pointer-events-none opacity-50' : undefined
            }
            href={`${baseUrl}?page=${currentPage - 1}&per_page=${decksPerPage}`}
          />
        </PaginationItem>
        {paginationItems}
        <PaginationItem>
          <PaginationNext
            aria-disabled={currentPage === totalPages}
            tabIndex={currentPage === totalPages ? -1 : undefined}
            className={
              currentPage === totalPages
                ? 'pointer-events-none opacity-50'
                : undefined
            }
            href={`${baseUrl}?page=${currentPage + 1}&per_page=${decksPerPage}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
