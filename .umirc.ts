import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '静态网站成品',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '网页成品',
      path: '/home',
      component: './Home',
    },
    {
      name: '图片素材',
      path: '/resource',
      component: './Access',
    },
    {
      name: '常见问题',
      path: '/faq',
      component: './Table',
    },
    {
      name: '帮助中心',
      path: '/help',
      component: './Table',
    },
  ],
  npmClient: 'pnpm',
  history: {
    type: 'hash'
  },
});

