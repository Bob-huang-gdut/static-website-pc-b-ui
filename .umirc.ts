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
      icon: 'HomeOutlined'
    },
    {
      name: '图片素材',
      path: '/resource',
      component: './Access',
      icon: 'PictureOutlined'
    },
    {
      name: '常见问题',
      path: '/faq',
      component: './Table',
      icon: 'QuestionCircleOutlined'
    },
    {
      name: '帮助中心',
      path: '/help',
      component: './Table',
      icon: 'IssuesCloseOutlined'
    },
  ],
  npmClient: 'pnpm',
  history: {
    type: 'hash'
  },
});

