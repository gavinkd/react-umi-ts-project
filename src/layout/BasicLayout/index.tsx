/* eslint-disable react/prop-types */
import React from 'react';
import { ConnectProps } from 'umi';
import classnames from 'classnames';
import { ContainerQuery } from 'react-container-query';
import { Layout } from 'antd';
import { useTitle } from 'ahooks';
import TabGridBar from '@/components/TabGridBar';
import { TAB_DATA } from '@/defaultSetting';
import Header from '@/components/Header';
import { HeaderProps, ModeType } from '@/components/Header';
import { PAGE_DICTIONARY } from '@/dictionary';
import styles from './index.less';

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BasicLayoutType extends ConnectProps {}

const Index: React.FC<BasicLayoutType> = props => {
  const {
    children,
    location: { pathname },
  } = props;
  const headerConfig: HeaderProps = (() => {
    const page = PAGE_DICTIONARY.find(item => item.pathname === pathname);
    if (page) {
      return { ...page.headerConfig };
    }
    // 默认没有任何的配置
    return {
      title: '',
      icon: null,
      rightContent: null,
    };
  })();
  useTitle(headerConfig.title);
  const layout = (
    <Layout className={styles.basicLayout}>
      <Header {...headerConfig} />
      {children}
      <div className={styles.tabs}>
        <TabGridBar data={TAB_DATA} />
      </div>
    </Layout>
  );
  return (
    <ContainerQuery query={query}>
      {params => <div className={classnames(params)}>{layout}</div>}
    </ContainerQuery>
  );
};

Index.propTypes = {
  //   children: PropTypes.elementType
};

export default Index;
