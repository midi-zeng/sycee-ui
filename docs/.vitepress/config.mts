import { defineConfig } from 'vitepress';
import react from '@vitejs/plugin-react';
import { SPONSOR_URL } from './sponsor';

// GitHub project page base; override with DOCS_BASE when self-hosting.
const base = process.env.DOCS_BASE ?? '/sycee-ui/';

const componentGroups = [
  {
    en: 'General',
    zh: '通用',
    items: [
      ['Overview', '组件总览', '/components/overview'],
      ['Button', '按钮', '/components/button'],
      ['Copy', '复制', '/components/copy'],
      ['Watermark', '水印', '/components/watermark'],
      ['Icon', '图标', '/components/icon'],
      ['Card', '卡片', '/components/card'],
      ['Tag', '标签', '/components/tag'],
      ['Avatar', '头像', '/components/avatar'],
      ['Badge', '徽标', '/components/badge'],
      ['Divider', '分割线', '/components/divider'],
      ['Empty', '空状态', '/components/empty'],
      ['Space', '间距', '/components/space'],
      ['Skeleton', '骨架屏', '/components/skeleton'],
      ['NinePatch', '九宫格图', '/components/nine-patch'],
    ],
  },
  {
    en: 'Data entry',
    zh: '数据录入',
    items: [
      ['Input', '输入框', '/components/input'],
      ['Textarea', '文本域', '/components/textarea'],
      ['InputNumber', '数字输入框', '/components/input-number'],
      ['Select', '选择器', '/components/select'],
      ['Checkbox', '复选框', '/components/checkbox'],
      ['Radio', '单选框', '/components/radio'],
      ['Switch', '开关', '/components/switch'],
      ['Rate', '评分', '/components/rate'],
      ['Slider', '滑块', '/components/slider'],
      ['DatePicker', '日期选择器', '/components/date-picker'],
      ['Cascader', '级联选择', '/components/cascader'],
      ['Tree', '树形控件', '/components/tree'],
      ['Upload', '上传', '/components/upload'],
      ['Form', '表单', '/components/form'],
    ],
  },
  {
    en: 'Feedback',
    zh: '反馈',
    items: [
      ['Alert', '警告提示', '/components/alert'],
      ['Message', '全局提示', '/components/message'],
      ['Notification', '通知', '/components/notification'],
      ['Modal', '对话框', '/components/modal'],
      ['Drawer', '抽屉', '/components/drawer'],
      ['Tooltip', '文字提示', '/components/tooltip'],
      ['Popconfirm', '气泡确认', '/components/popconfirm'],
      ['Spinner', '加载中', '/components/spinner'],
      ['Progress', '进度条', '/components/progress'],
      ['Result', '结果页', '/components/result'],
      ['Image', '图片', '/components/image'],
    ],
  },
  {
    en: 'Navigation',
    zh: '导航',
    items: [
      ['Breadcrumb', '面包屑', '/components/breadcrumb'],
      ['Tabs', '标签页', '/components/tabs'],
      ['Pagination', '分页', '/components/pagination'],
      ['Steps', '步骤条', '/components/steps'],
      ['Dropdown', '下拉菜单', '/components/dropdown'],
      ['Collapse', '折叠面板', '/components/collapse'],
    ],
  },
  {
    en: 'Data display',
    zh: '数据展示',
    items: [
      ['Table', '表格', '/components/table'],
      ['Timeline', '时间线', '/components/timeline'],
      ['InfiniteScroll', '无限加载', '/components/infinite-scroll'],
      ['Carousel', '轮播', '/components/carousel'],
      ['Marquee', '跑马灯', '/components/marquee'],
      ['Danmaku', '弹幕', '/components/danmaku'],
    ],
  },
  {
    en: 'Animation & time',
    zh: '动画与时间',
    items: [['Countdown', '倒计时', '/components/countdown']],
  },
  {
    en: 'Utilities',
    zh: '工具',
    items: [['Overview', '工具总览', '/utils/overview']],
  },
] as const;

function componentSidebar(locale: 'en' | 'zh', prefix = '') {
  return componentGroups.map((group) => ({
    text: group[locale],
    collapsed: false,
    items: group.items.map(([en, zh, link]) => ({
      text: locale === 'zh' ? zh : en,
      link: `${prefix}${link}`,
    })),
  }));
}

const rootThemeConfig = {
  nav: [
    { text: 'Guide', link: '/guide/introduction', activeMatch: '/guide/' },
    { text: 'Components', link: '/components/overview', activeMatch: '/components/' },
    { text: 'Utils', link: '/utils/overview', activeMatch: '/utils/' },
    { text: 'Playground', link: '/playground/' },
    { text: '♥ Sponsor', link: SPONSOR_URL },
    {
      text: '0.1.0',
      items: [
        {
          text: 'Changelog',
          link: 'https://github.com/midi-zeng/sycee-ui/releases',
        },
        {
          text: 'Contributing',
          link: 'https://github.com/midi-zeng/sycee-ui/blob/main/CONTRIBUTING.md',
        },
      ],
    },
  ],
  sidebar: {
    '/guide/': [
      {
        text: 'Getting Started',
        items: [
          { text: 'Introduction', link: '/guide/introduction' },
          { text: 'React', link: '/guide/getting-started-react' },
          { text: 'Vue', link: '/guide/getting-started-vue' },
          { text: 'Theming & Dark Mode', link: '/guide/theming' },
          { text: 'Localization', link: '/guide/localization' },
          { text: 'Hooks & composables', link: '/guide/hooks' },
        ],
      },
    ],
    '/components/': componentSidebar('en'),
    '/utils/': componentSidebar('en'),
  },
  outline: { level: [2, 3] as [number, number], label: 'On this page' },
  outlineTitle: 'On this page',
  returnToTopLabel: 'Return to top',
  skipToContentLabel: 'Skip to content',
  sidebarMenuLabel: 'Menu',
  darkModeSwitchLabel: 'Appearance',
  lightModeSwitchLabel: 'Appearance',
  docFooter: { prev: 'Previous page', next: 'Next page' },
  footer: {
    message: 'Released under the MIT License.',
    copyright: 'Copyright © 2026 Sycee UI Contributors',
  },
};

const zhThemeConfig = {
  nav: [
    { text: '指南', link: '/zh/guide/introduction', activeMatch: '/zh/guide/' },
    { text: '组件', link: '/zh/components/overview', activeMatch: '/zh/components/' },
    { text: '工具', link: '/zh/utils/overview', activeMatch: '/zh/utils/' },
    { text: '演练场', link: '/zh/playground/' },
    { text: '♥ 赞助', link: SPONSOR_URL },
    {
      text: '0.1.0',
      items: [
        {
          text: '更新日志',
          link: 'https://github.com/midi-zeng/sycee-ui/releases',
        },
        {
          text: '参与贡献',
          link: 'https://github.com/midi-zeng/sycee-ui/blob/main/CONTRIBUTING.md',
        },
      ],
    },
  ],
  sidebar: {
    '/zh/guide/': [
      {
        text: '开始使用',
        items: [
          { text: '介绍', link: '/zh/guide/introduction' },
          { text: 'React', link: '/zh/guide/getting-started-react' },
          { text: 'Vue', link: '/zh/guide/getting-started-vue' },
          { text: '主题与暗色模式', link: '/zh/guide/theming' },
          { text: '国际化', link: '/zh/guide/localization' },
          { text: 'Hook 与组合式函数', link: '/zh/guide/hooks' },
        ],
      },
    ],
    '/zh/components/': componentSidebar('zh', '/zh'),
    '/zh/utils/': componentSidebar('zh', '/zh'),
  },
  outline: { level: [2, 3] as [number, number], label: '本页目录' },
  outlineTitle: '本页目录',
  returnToTopLabel: '返回顶部',
  skipToContentLabel: '跳到正文',
  sidebarMenuLabel: '菜单',
  darkModeSwitchLabel: '外观',
  lightModeSwitchLabel: '外观',
  docFooter: { prev: '上一页', next: '下一页' },
  footer: {
    message: '基于 MIT 许可证发布。',
    copyright: '版权所有 © 2026 Sycee UI Contributors',
  },
};

export default defineConfig({
  base,
  lang: 'en-US',
  title: 'Sycee UI',
  description:
    'A unified design system for React and Vue — one design language, one API, two frameworks.',
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}logo.svg` }]],

  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      themeConfig: rootThemeConfig,
    },
    zh: {
      label: '中文',
      lang: 'zh-CN',
      link: '/zh/',
      themeConfig: zhThemeConfig,
    },
  },

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Sycee UI',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/midi-zeng/sycee-ui' },
    ],
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索',
                buttonAriaLabel: '搜索',
              },
            },
          },
        },
      },
    },
  },

  vite: {
    plugins: [react()],
  },
});
