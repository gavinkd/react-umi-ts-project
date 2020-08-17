/**
 * 示例
 */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { GlobalState, ConnectProps, Loading, connect } from 'umi';
// import PropTypes from 'prop-types';

export interface HomePageType extends ConnectProps {
  title: string;
  global: GlobalState;
  loading: boolean;
}

const HomePage: React.FC<HomePageType> = ({ title, global, loading }) => {
  const { isLogin } = global;
  if (loading) {
    return <div>loading...</div>;
  }
  return isLogin ? <div>{title}</div> : <div>未登陆</div>;
};

HomePage.defaultProps = {
  title: '哈哈13',
};

// HomePage.propTypes = {
//   title: PropTypes.string.isRequired,
//   isLogin: PropTypes.bool,
//   // dispatch: PropTypes.
// };

export default connect(
  ({ global, loading }: { global: GlobalState; loading: Loading }) => ({
    global,
    loading: loading.models.search,
  }),
)(HomePage);
