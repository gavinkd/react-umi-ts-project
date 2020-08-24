export default [
  {
    path: '/',
    component: '@/layout/basicLayout',
    routes: [
      { path: '/', redirect: '/home' },
      {
        path: '/home',
        component: '@/pages/Home',
        exact: true,
      },
    ],
  },
];
