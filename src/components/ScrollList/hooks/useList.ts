import { useState, useEffect, useRef } from 'react';
import usePager, { PaginationProps } from './usePager';
import { isFunction, isArray } from '@/utils/utils';

interface ResponseListType<T> {
  data: T[];
  message: string;
  code: number;
  pagination?: PaginationProps;
}

export interface useListProps<T> {
  requestHandle: (values: any) => Promise<ResponseListType<T>>;
  params?: Record<string, unknown>;
  dependent?: any[];
  transformHandle?: (data: T[]) => void;
  successHandle?: (data: ResponseListType<T>) => void;
  errorHandle?: (data: any) => void;
}

function useList<T>(props: useListProps<T>) {
  const {
    params,
    dependent,
    requestHandle,
    transformHandle,
    successHandle,
    errorHandle,
  } = props;
  const ref = useRef<PaginationProps>({ page: 1, page_size: 10 });
  const {
    currentPage,
    currentPageSize,
    pageChangeHandle,
    resetPageHandle,
  } = usePager(ref.current);
  const [list, setList] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadedAll, setLoadedAll] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const loadData = (
    query: Record<string, unknown>,
    setDataCallback: (data: T[]) => void,
  ) => {
    requestHandle(query)
      .then(res => {
        if (res.code === 200) {
          setLoadedAllState(res);
          setDataCallback(res.data);
          if (successHandle && isFunction(successHandle)) {
            successHandle(res);
          }
        } else {
          throw new Error();
        }
        setLoadingState();
      })
      .catch(err => {
        setError(err);
        setLoadingState();
        if (errorHandle && isFunction(errorHandle)) {
          errorHandle(err);
        }
      });
  };

  const setLoadedAllState = (result: ResponseListType<T>) => {
    if (result.pagination?.page && result.pagination.total_pages) {
      if (result.pagination.page === result.pagination.total_pages) {
        setLoadedAll(true);
      }
    }
  };

  const setLoadingState = () => {
    setLoading(false);
    setLoadingMore(false);
    setRefreshing(false);
  };

  const setInitListData = (data: T[]) => {
    if (transformHandle && isFunction(transformHandle)) {
      transformHandle(data);
    }
    setList(data);
  };

  const setPushListData = (data: T[]) => {
    if (loadedAll) {
      return;
    }
    if (transformHandle && isFunction(transformHandle)) {
      transformHandle(data);
    }
    let temp = [...list];
    temp = temp.concat(data);
    setList(temp);
  };

  const endReachedHandle = () => {
    if (loadedAll) {
      return;
    }
    setLoadingMore(true);
    pageChangeHandle(latsetCurrentPage => {
      loadData(
        {
          page: latsetCurrentPage,
          page_size: currentPageSize,
          ...params,
        },
        setPushListData,
      );
    });
  };

  const refreshHandle = () => {
    resetPageHandle(latsetCurrentPage => {
      loadData(
        {
          page: latsetCurrentPage,
          page_size: currentPageSize,
          ...params,
        },
        setInitListData,
      );
    });
  };

  // TODO 实现搜索功能
  const searchHandle = (value: string) => {
    console.log(value);
  };

  const run = (param: Record<string, any>) => {
    setLoading(true);
    resetPageHandle(page => {
      loadData({ page, page_size: currentPageSize, ...param }, setInitListData);
    });
  };

  useEffect(() => {
    if (!loading) {
      setLoading(true);
    }
    loadData(
      {
        page: currentPage,
        page_size: currentPageSize,
        ...params,
      },
      setInitListData,
    );
  }, dependent || []);

  return {
    list,
    error,
    loading,
    loadingMore,
    loadedAll,
    refreshing,
    endReachedHandle,
    refreshHandle,
    searchHandle,
    run,
  };
}

export default useList;
