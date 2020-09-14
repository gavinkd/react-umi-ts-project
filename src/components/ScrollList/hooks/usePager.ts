import { useState } from 'react';

export interface PaginationProps {
  page: number;
  page_size: number;
  [props: string]: any;
}

function usePager(pagination: PaginationProps) {
  const { page, page_size } = pagination;
  const [currentPage, setCurrentPage] = useState<number>(page);
  const [currentPageSize, setCurrentPageSize] = useState<number>(page_size);

  const pageChangeHandle = (latestCallback: (page: number) => void) => {
    setCurrentPage(propPage => {
      const newPage = propPage + 1;
      latestCallback(newPage);
      return newPage;
    });
  };

  const resetPageHandle = (latestCallback: (page: number) => void) => {
    setCurrentPage(1);
    latestCallback(1);
  };

  const pageSizeHandle = (size: number) => {
    setCurrentPageSize(size);
  };

  return {
    currentPage,
    currentPageSize,
    pageChangeHandle,
    resetPageHandle,
    pageSizeHandle,
  };
}

export default usePager;
