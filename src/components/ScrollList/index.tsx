/* eslint-disable react/prop-types */
import React, { Fragment, useState } from 'react';
import classnames from 'classnames';
import { ListView, PullToRefresh, ActivityIndicator, Tabs } from 'antd-mobile';
import { ListViewProps } from 'antd-mobile/lib/list-view';
import { Empty, Skeleton } from 'antd';
import useList from '@/components/ScrollList/hooks/useList';
import Filter from '@/components/Filter';
import { FilterOptionItem } from '@/components/Filter/Propstype';
import { ScrollViewProps } from './type';
import styles from './index.less';

const SkeletonComponent = () => (
  <div style={{ padding: 8 }}>
    <Skeleton paragraph active />
  </div>
);

const emptyItem = () => <Empty />;

// 转换数据的 ds
const ds = new ListView.DataSource({
  rowHasChanged: (row1: any, row2: any) => row1 !== row2,
});

const ScrollView: React.FC<ScrollViewProps> = props => {
  const {
    flex,
    rowRender,
    dependent,
    showFooter = true,
    options,
    rowOptions,
    requestOptions,
    tabOptions,
    filterOptions,
  } = props;
  const [filterParams, setFilterParams] = useState<Record<string, unknown>>({}); // 筛选参数
  // const pagination = useRef({page:pageOptions.page, pageSize: pageOptions.pageSize})
  const getUseListParams: () => Record<string, any> = () => {
    if (options?.params) {
      return { ...options.params, ...filterParams };
    }
    return filterParams;
  };

  const {
    list,
    error,
    loading,
    loadingMore,
    loadedAll,
    endReachedHandle,
    refreshing,
    refreshHandle,
    run,
  } = useList({
    requestHandle: requestOptions.requestHandle,
    dependent,
    params: getUseListParams(),
  });

  const data = ds.cloneWithRows(list.length <= 0 ? [{}] : list);

  const renderTab = (): React.ReactElement<any> => {
    if (
      tabOptions &&
      'tabData' in tabOptions &&
      tabOptions.tabData.length === 0
    ) {
      const { tabData, activeTab, onTabClick } = tabOptions;
      return (
        <div className={styles.tabs}>
          <Tabs
            tabs={tabData}
            initialPage={activeTab}
            tabBarActiveTextColor="#f00"
            tabBarUnderlineStyle={{ borderColor: '#e90707' }}
            onTabClick={onTabClick}
            renderTabBar={tabProps => (
              <Tabs.DefaultTabBar {...tabProps} page={4} />
            )}
          />
        </div>
      );
    }

    return <></>;
  };

  const renderHeader = (): React.ReactElement<any> => {
    return renderTab();
  };

  const getItemComponent = () => {
    if (list.length <= 0) {
      return emptyItem;
    }

    return rowRender;
  };

  const renderRow: (
    rowData: any,
    sectionID: string | number,
    rowID: string | number,
    highlightRow?: boolean,
  ) => React.ReactElement<any> = (rowData, sectionID, rowID, highlightRow) => {
    const ItemComponent = getItemComponent();
    const rowProps = rowOptions?.rowProps ? rowOptions?.rowProps : {};
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (
      <ItemComponent
        {...rowData}
        sectionID={sectionID}
        rowId={rowID}
        {...rowProps}
      />
    );
  };

  const renderFooter = () => {
    let text: JSX.Element | string = ``;
    if (loadingMore) {
      text = (
        <Fragment>
          <ActivityIndicator />
          <span>正在努力加载...</span>
        </Fragment>
      );
    } else if (loadedAll) {
      text = `已全部加载`;
    }

    return <div className={styles.footer}>{text}</div>;
  };

  const handleEndReached = () => {
    if (!loading && !loadingMore && !loadedAll && !refreshing) {
      endReachedHandle();
    }
  };

  const handlePullToRefresh = () => {
    if (!loading && !loadingMore && !refreshing) {
      refreshHandle();
    }
  };

  const filterSelectHandle = (
    values: FilterOptionItem | Record<string, string>,
    key: string,
  ) => {
    const param: any = options?.params
      ? { ...options.params, ...values }
      : values;
    run(param);
    if (filterOptions) {
      filterOptions.onSelect && filterOptions.onSelect(param, key);
    }
  };

  const renderFilter = () => {
    if (filterOptions) {
      if (filterOptions.visible) {
        const { filter, visible, defaultActionKey } = filterOptions;
        return (
          <Filter
            filter={filter}
            visible={visible}
            defaultActionKey={defaultActionKey}
            onSelect={filterSelectHandle}
          />
        );
      }
    }
  };

  const renderBody = () => {
    if (loading) {
      return <SkeletonComponent />;
    }

    if (error) {
      return <Empty description="请求错误" />;
    }
    const listProps: ListViewProps = {
      dataSource: data,
      renderHeader,
      renderRow,
      pageSize: 4,
      useBodyScroll: true,
      scrollRenderAheadDistance: 500,
      onEndReachedThreshold: 10,
      onEndReached: handleEndReached,
      pullToRefresh: (
        <PullToRefresh
          refreshing={refreshing}
          onRefresh={handlePullToRefresh}
          direction="down"
          distanceToRefresh={window.devicePixelRatio * 25}
          getScrollContainer={() => null}
          indicator={{}}
        />
      ),
    };

    if (showFooter) {
      listProps.renderFooter = renderFooter;
    }

    return <ListView {...listProps} />;
  };

  const cls = classnames({
    [styles.flex]: flex,
    [styles.container]: true,
  });

  return (
    <div className={cls}>
      {renderFilter()}
      {renderBody()}
    </div>
  );
};

export default ScrollView;
