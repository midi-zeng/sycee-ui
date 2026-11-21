import { h, watchEffect } from 'vue';
import DefaultTheme from 'vitepress/theme';
import { useData } from 'vitepress';
import type { Theme } from 'vitepress';
import DemoBlock from './components/DemoBlock.vue';
import ReactDemo from './components/ReactDemo.vue';
import SponsorCard from './components/SponsorCard.vue';
import HomeHeroDemo from './components/HomeHeroDemo.vue';
import HomeSponsor from './components/HomeSponsor.vue';
import ZhComponentPage from './components/ZhComponentPage.vue';

/**
 * Sycee docs theme: extends VitePress default, adds live-demo components,
 * home-page slots (hero demo + sponsor) and bridges VitePress dark mode to
 * Sycee's `data-theme` attribute.
 */
export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-hero-image': () => h(HomeHeroDemo),
      'home-features-after': () => h(HomeSponsor),
    });
  },
  enhanceApp({ app }) {
    app.component('DemoBlock', DemoBlock);
    app.component('ReactDemo', ReactDemo);
    app.component('SponsorCard', SponsorCard);
    app.component('ZhComponentPage', ZhComponentPage);
  },
  setup() {
    const { isDark } = useData();
    if (typeof document !== 'undefined') {
      watchEffect(() => {
        document.documentElement.dataset.theme = isDark.value ? 'dark' : 'light';
      });
    }
  },
} satisfies Theme;
