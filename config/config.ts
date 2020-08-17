// https://umijs.org/zh-CN/config
import { defineConfig } from 'umi';
// import moment from 'moment'
import routers from './router.config';
// function getPathConfig () {
//   if(process.env.UMI_ENV === 'local') {
//     return {
//       base: './', // 设置路由前缀，通常用于部署到非根目录。
//       publicPath: './', // 静态文件路径
//     }
//   }
// }

export default defineConfig({
  layout: false,
  routes: routers,
  define: {
    // APP_TYPE: APP_TYPE || '',
    // BUILD_DATE: moment().format('YYYYMMDDHHmm')
  },
  // treeShaking: true,
  targets: {
    // ie: 11,
    ie: 9,
  },
  alias: {},
  theme: {},
  proxy: {},
  ignoreMomentLocale: true,
  hash: true,
  styles: [],
});
