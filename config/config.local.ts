// import { defineConfig } from 'umi'
// 指定本地 umi local 变量
export default {
  define: {
    'process.env.UMI_ENV': process.env.UMI_ENV,
    'process.env.name': 'local',
  },
};
