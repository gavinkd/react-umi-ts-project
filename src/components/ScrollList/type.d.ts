import React from 'react';
import TabData from 'rmc-tabs/lib/Models';
import { FilterProps } from '../Filter/Propstype';

export interface ScrollOptionsType {
  params: Record<string, unknown>;
}

export interface RequestOptions {
  requestHandle: (params: any) => Promise<any>;
  transformHandle?: () => void;
  successHandle?: () => void;
  errorHandle?: () => void;
}

export interface TabData {
  key?: string;
  title: React.ReactNode;
  /** for user's custom extends */
  [key: string]: any;
}
export interface TabOption {
  tabData: TabData[];
  activeTab?: number;
  onTabClick?: () => void;
}

export interface SearchOptions {
  visible: boolean;
  params?: Record<string, any>;
  requestHandle?: (params: any) => Promise<any>;
  onSubmit: (value: string) => void;
  onCancel: () => void;
}

export interface ScrollViewProps {
  flex?: boolean;
  rowRender: (
    rowData: any,
    sectionID: string | number,
    rowID: string | number,
    highlightRow?: boolean,
    ...rowProps: string[]
  ) => React.ReactElement<any>;
  showFooter?: boolean;
  dependent?: any[];
  options?: ScrollOptionsType;
  rowOptions?: {
    pathname?: string;
    onClick?: () => void;
    rowProps?: Record<string, unknown>;
  };
  requestOptions: RequestOptions;
  filterOptions?: FilterProps;
  tabOptions?: TabOption;
  // listOptions?: ListOptions
  searchOptions?: SearchOptions;
}
