import React from 'react';
import { Icon } from 'antd-mobile';
import { history } from 'umi';

export const HEADER_CONFIG_GENERAL = {
  icon: <Icon type="left" />,
  onLeftClick: () => history.goBack(),
  rightContent: [<Icon key="1" type="ellipsis" />],
};

// 主页
export const HEADER_CONFIG_HOME = {
  icon: null,
  rightContent: [
    <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
    <Icon key="1" type="ellipsis" />,
  ],
};
