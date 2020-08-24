// 请求
export const HTTP_CODE_MESSAGE = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队(异步任务)。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限(令牌、用户名、密码错误)。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// 默认项目设置
export type DEFAULT_MESSAGE_NOTIFICATION_TYPE =
  | 'message'
  | 'notification'
  | 'toast';

// 接口消息通知类型 默认是 message
export const DEFAULT_MESSAGE_NOTIFICATION = 'message';

// 星期
export const WEEKTOCH = [
  {
    label: '星期日',
    value: 0,
  },
  {
    label: '星期一',
    value: 1,
  },
  {
    label: '星期二',
    value: 2,
  },
  {
    label: '星期三',
    value: 3,
  },
  {
    label: '星期四',
    value: 4,
  },
  {
    label: '星期五',
    value: 5,
  },
  {
    label: '星期六',
    value: 6,
  },
];

// 性别
export const GENDER = [
  {
    label: '未知',
    value: 0,
  },
  {
    label: '男',
    value: 1,
  },
  {
    label: '女',
    value: 2,
  },
];
