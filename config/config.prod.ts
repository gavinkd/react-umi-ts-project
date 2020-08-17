// 指定本地 umi prod 变量
export default {
  define: {
    'process.env.UMI_ENV': process.env.UMI_ENV,
    'process.env.name': 'prod',
  },
};
