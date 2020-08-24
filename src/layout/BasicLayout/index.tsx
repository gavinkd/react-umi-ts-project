/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';
import { ConnectProps } from 'umi';
// import Media from 'react-media';
import classnames from 'classnames';
import { ContainerQuery } from 'react-container-query';
import { Layout } from 'antd';
import styles from './index.less';
// import PropTypes from 'prop-types'

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
  const { children } = props;
  const layout = <Layout className={styles.basicLayout}>{children}</Layout>;
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
