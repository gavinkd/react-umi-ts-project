import React from 'react';
import { TabIcon } from 'antd-mobile/lib/tab-bar/PropsType';

// barTintColor	tabbar 背景色	String	white
// tintColor	选中的字体颜色
export interface TabGridBarType {
  barTintColor?: string;
  tintColor?: string;
  unselectedTintColor?: string;
  hidden?: boolean;
  data: Array<TabGridBarItem>;
}

// selected	是否选中	Boolean	false
// icon	默认展示图片	见 demo
// selectedIcon	选中后的展示图片	见 demo
// title	标题文字	String
// key	唯一标识
interface TabGridBarItem {
  selected: boolean;
  icon: TabIcon;
  selectedIcon: TabIcon;
  title: string;
  key: string;
  style?: React.CSSProperties;
}
