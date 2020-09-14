import React from 'react';
import ScrollView from '@/components/ScrollList';
import { search } from '@/service/testService';
import { FilterProps } from '@/components/Filter/Propstype';
import Row from '@/components/Test/Row';

const filterOptions: FilterProps = {
  visible: true,
  defaultActionKey: 'state',
  filter: [
    {
      text: '综合排序',
      key: 'state',
      field: 'sort',
      options: [
        { value: '销量最高', label: '销量最高' },
        { value: '距离最近', label: '距离最近' },
      ],
    },
    {
      text: '速度',
      key: 'speed',
      field: 'speed',
      options: [
        { value: '30分钟内', label: '30分钟内' },
        { value: '40分钟内', label: '40分钟内' },
      ],
    },
  ],
};

const ScrollPage: React.FC = props => {
  const requestOptions = {
    requestHandle: (params: any) => search({ query: params }),
  };

  return (
    <ScrollView
      rowRender={Row}
      requestOptions={requestOptions}
      rowOptions={{ pathname: '/activity/detail', rowProps: { cs: 1, go: 2 } }}
      filterOptions={filterOptions}
    />
  );
};

export default ScrollPage;
