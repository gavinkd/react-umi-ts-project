// 系统通知
import { message, notification } from 'antd';
import { MessageApi } from 'antd/lib/message';
import { NotificationApi } from 'antd/lib/notification';
// import { Toast } from 'antd-mobile';
// import ToastApi from 'antd-mobile/lib/toast'
import { DEFAULT_MESSAGE_NOTIFICATION } from '@/defaultSetting';

// function PortalToast (type: 'toast'): ToastApi
function PortalToast(type: 'message'): MessageApi;
function PortalToast(type: 'notification'): NotificationApi;
function PortalToast(type: any) {
  if (type === 'message') return message;
  if (type === 'notification') return notification;
  // if (type === 'toast') return ToastApi;
  return null;
}

export default PortalToast(DEFAULT_MESSAGE_NOTIFICATION);
