import { useState } from 'react';
import { isFunction } from '../utils/utils';

function usePager(pagination) {
  const { page, pageSize } = pagination;
  const [currentPage, setCurrentPage] = useState(page);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);

  // 这里的latestCallback 是为了获取一个最新的currentPage
  const pageChangeHandle = latestCallback => {
    setCurrentPage(propPage => {
      const newPage = propPage + 1;
      isFunction(latestCallback) && latestCallback(newPage);
      return newPage;
    });
  };

  const resetPageHandle = latestCallback => {
    setCurrentPage(1);
    isFunction(latestCallback) && latestCallback(1);
  };

  const pageSizeHandle = size => {
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
