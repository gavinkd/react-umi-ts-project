import { TabGridBarItem } from '@/components/TabGridBar/PropsType';

// tab 设置
export const TAB_DATA: TabGridBarItem[] = [
  {
    selected: true,
    icon: {
      uri: 'https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg',
    },
    selectedIcon: {
      uri: 'https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg',
    },
    title: '组件',
    key: 'component',
  },
];
// 默认项目设置
export type DEFAULT_MESSAGE_NOTIFICATION_TYPE =
  | 'message'
  | 'notification'
  | 'toast';

// 接口消息通知类型 默认是 message
export const DEFAULT_MESSAGE_NOTIFICATION = 'message';
