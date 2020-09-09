/**
 * 示例
 */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { GlobalState, ConnectProps, Loading, connect } from 'umi';
import { Button } from 'antd';
import { GetDataType } from '@/service/testService';
import WebSocketClass from '@/utils/socket';
import styles from './index.less';

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
  const divView = useRef<HTMLDivElement>(null);
  const socketOnopen = (ev: Event) => {
    console.log(ev);
  };
  const socketMessageHandle = (event: MessageEvent) => {
    console.log(event.data);
  };
  const socketInstance = useRef(
    new WebSocketClass({
      url: 'ws://123.207.136.134:9010/ajaxchattest',
      onmessage: socketMessageHandle,
      onopen: socketOnopen,
    }),
  );
  const getData = () => {
    // if (dispatch) {
    //   dispatch({
    //     type: 'global/getData',
    //   }).then((res: GetDataType) => {
    //     console.log(res);
    //     if(divView.current) {
    //       divView.current.style.transform = 'translateX(0)'
    //       performAnimate()
    //     }
    //   });
    // }
    if (socketInstance.current) {
      socketInstance.current.send('哈哈哈哈');
    }
  };

  const performAnimate = () => {
    let start: number | undefined;
    const step = (timestamp: number) => {
      if (start === undefined) start = timestamp;
      const elapsed = timestamp - start;
      const { current } = divView;
      if (current !== null) {
        current.style.transform =
          'translateX(' + Math.min(0.1 * elapsed, 200) + 'px)';
      }

      if (elapsed < 2000) {
        // Stop the animation after 2 seconds
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };
  return (
    <div>
      <Button type="default" onClick={getData} loading={loading}>
        点击
      </Button>
      <div className={styles.dd} ref={divView}>
        13123
      </div>
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
