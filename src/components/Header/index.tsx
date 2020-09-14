/* eslint-disable react/prop-types */
import React from 'react';
import { NavBar } from 'antd-mobile';
import { NavBarProps } from 'antd-mobile/lib/nav-bar/PropsType';
import styles from './index.less';

export type ModeType = 'dark' | 'light';
export interface HeaderProps extends NavBarProps {
  title: string;
  mode?: ModeType;
  style?: React.CSSProperties;
}

const Header: React.FC<HeaderProps> = props => {
  const {
    title,
    style,
    className,
    prefixCls,
    mode = 'light',
    icon,
    leftContent,
    rightContent,
    onLeftClick,
  } = props;
  return (
    <div className={styles.container} style={style}>
      <NavBar
        className={className}
        prefixCls={prefixCls}
        mode={mode}
        leftContent={leftContent}
        onLeftClick={onLeftClick}
        icon={icon}
        rightContent={rightContent}
      >
        {title}
      </NavBar>
    </div>
  );
};

export default Header;
