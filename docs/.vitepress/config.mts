import { defineConfig } from 'vitepress';
import react from '@vitejs/plugin-react';
import { SPONSOR_URL } from './sponsor';

// GitHub project page base; override with DOCS_BASE when self-hosting.
const base = process.env.DOCS_BASE ?? '/sycee-ui/';

export default defineConfig({
  base,
  lang: 'en-US',
  title: 'Sycee UI',
  description:
    'A unified design system for React and Vue — one design language, one API, two frameworks.',
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}logo.svg` }]],

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Sycee UI',

    nav: [
      { text: 'Guide', link: '/guide/introduction', activeMatch: '/guide/' },
      { text: 'Components', link: '/components/overview', activeMatch: '/components/' },
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
          ],
        },
      ],
      '/components/': [
        {
          text: 'Components',
          items: [
            { text: 'Overview', link: '/components/overview' },
            { text: 'Button', link: '/components/button' },
            { text: 'Icon', link: '/components/icon' },
            { text: 'Input', link: '/components/input' },
            { text: 'Textarea', link: '/components/textarea' },
            { text: 'Select', link: '/components/select' },
            { text: 'Checkbox', link: '/components/checkbox' },
            { text: 'Radio', link: '/components/radio' },
            { text: 'Switch', link: '/components/switch' },
            { text: 'Modal', link: '/components/modal' },
            { text: 'Tooltip', link: '/components/tooltip' },
            { text: 'Message', link: '/components/message' },
            { text: 'Card', link: '/components/card' },
            { text: 'Tag', link: '/components/tag' },
            { text: 'Alert', link: '/components/alert' },
            { text: 'Avatar', link: '/components/avatar' },
            { text: 'Badge', link: '/components/badge' },
            { text: 'Spinner', link: '/components/spinner' },
            { text: 'Progress', link: '/components/progress' },
            { text: 'Tabs', link: '/components/tabs' },
            { text: 'Pagination', link: '/components/pagination' },
            { text: 'Table', link: '/components/table' },
            { text: 'Space', link: '/components/space' },
            { text: 'Divider', link: '/components/divider' },
            { text: 'Empty', link: '/components/empty' },
            { text: 'NinePatch', link: '/components/nine-patch' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/midi-zeng/sycee-ui' },
    ],

    search: {
      provider: 'local',
    },

    outline: { level: [2, 3], label: 'On this page' },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Sycee UI Contributors',
    },
  },

  vite: {
    plugins: [react()],
  },
});
