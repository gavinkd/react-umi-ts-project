/**
 * 示例
 */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { GlobalState, ConnectProps, Loading, connect } from 'umi';
import { Button } from 'antd';
import { GetDataType } from '@/service/testService';

// import PropTypes from 'prop-types';

export interface HomePageType extends ConnectProps {
  title: string;
  global: GlobalState;
  loading: boolean | undefined;
}

const HomePage: React.FC<HomePageType> = ({
  title,
  global,
  loading,
  dispatch,
}) => {
  const { isLogin, useList } = global;
  const getData = () => {
    if (dispatch) {
      dispatch({
        type: 'global/getData',
      }).then((res: GetDataType) => {
        console.log(res);
      });
    }
  };
  // if (loading) {
  //   return <div>loading...</div>;
  // }
  return (
    <div>
      <Button type="default" onClick={getData} loading={loading}>
        点击
      </Button>
    </div>
  );
};

HomePage.defaultProps = {
  title: '哈哈',
};

// HomePage.propTypes = {
//   title: PropTypes.string.isRequired,
//   isLogin: PropTypes.bool,
//   // dispatch: PropTypes.
// };

export default connect(
  ({ global, loading }: { global: GlobalState; loading: Loading }) => ({
    global,
    loading: loading.effects['global/getData'],
  }),
)(HomePage);
