import React from 'react';
// import PropsType from 'prop-types'
import { Flex, WhiteSpace, WingBlank } from 'antd-mobile';
import {
  SmileFilled,
  SmileTwoTone,
  RightCircleOutlined,
} from '@ant-design/icons';
import { history } from 'umi';
import styles from './index.less';

interface CardPropsType {
  title: string;
  description?: string;
  pathName?: string | null;
  onRightClick?: () => void;
}
const Card: React.FC<CardPropsType> = props => {
  // eslint-disable-next-line react/prop-types
  const { title, description, pathName, onRightClick } = props;
  const to = () => {
    if (pathName) {
      history.push(pathName);
    } else if (onRightClick) {
      onRightClick();
    }
  };
  return (
    <WingBlank>
      <WhiteSpace />
      <Flex className={styles.container}>
        <div className={styles.left}>
          <SmileTwoTone style={{ fontSize: 20 }} />
        </div>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          <div className={styles.description}>{description}</div>
        </div>
        <div className={styles.right}>
          <RightCircleOutlined style={{ fontSize: 20 }} onClick={to} />
        </div>
      </Flex>
      <WhiteSpace />
    </WingBlank>
  );
};

// Card.propTypes = {
//   title: PropsType.string,
//   description: PropsType.string
// }

export default Card;
