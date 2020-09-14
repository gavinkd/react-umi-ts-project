import { useState, useEffect, useRef } from 'react';
import usePager from '@/hooks/usePager';
import { isFunction, isArray } from '@/utils/utils';

function useList({
  params,
  dependent,
  requestHandle,
  successHandle,
  errorHandle,
  transformHandle,
}) {
  const ref = useRef({ page: 1, pageSize: 10 });
  const {
    currentPage,
    currentPageSize,
    pageChangeHandle,
    resetPageHandle,
    // eslint-disable-next-line no-unused-vars
    pageSizeHandle,
  } = usePager(ref.current);
  const [list, setList] = useState([]);
  // const [ list1, dispatch ] = useReducer(listReducer, listInit)
  const [loading, setLoading] = useState(true);
  const [loadedAll, setLoadedAll] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const setLoadedAllState = res => {
    if (res.pagination.page === res.pagination.total_pages) {
      setLoadedAll(true);
    } else {
      setLoadedAll(false);
    }
  };

  const setLoadingState = () => {
    setLoading(false);
    setLoadingMore(false);
    setRefreshing(false);
  };

  const loadData = (query, setDataCallback) => {
    requestHandle(query)
      .then(res => {
        if (res.code === 200) {
          setLoadedAllState(res);
          if (isFunction(setDataCallback)) {
            setDataCallback(isArray(res.data) ? res.data : []);
          }
          if (isFunction(successHandle)) {
            successHandle(res);
          }
        } else {
          throw new Error();
        }
        setLoadingState();
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
        if (isFunction(errorHandle)) {
          errorHandle(err);
        }
      });
  };

  const setInitListData = data => {
    if (isFunction(transformHandle)) {
      transformHandle(data);
    }
    setList(data);
  };

  const setPushListData = data => {
    if (loadedAll) {
      return;
    }
    if (isFunction(transformHandle)) {
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
  const searchHandle = value => {
    console.log(value);
  };

  const run = param => {
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
