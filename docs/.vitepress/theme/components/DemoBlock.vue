<script setup lang="ts">
import { computed, watch, ref } from 'vue';
import { useData } from 'vitepress';
import { codeToHtml } from 'shiki';
import { demoFramework } from '../framework';
import { useDocsLocale } from '../docsLocale';
import { LocaleProvider } from '@sycee-ui/vue';
import ReactDemo from './ReactDemo.vue';

const props = defineProps<{
  /** Pre-imported Vue demo component (SFC). */
  vueDemo?: unknown;
  /** Raw source of the Vue demo (via ?raw import). */
  vueCode?: string;
  /** Pre-imported React demo component. */
  reactDemo?: unknown;
  /** Raw source of the React demo (via ?raw import). */
  reactCode?: string;
}>();

const { isDark } = useData();
const docsLocale = useDocsLocale();
const showCode = ref(false);
const highlighted = ref('');
const labels = computed(() =>
  docsLocale.value === 'zh'
    ? {
        framework: '框架',
        show: '显示代码',
        hide: '隐藏代码',
      }
    : {
        framework: 'Framework',
        show: 'Show code',
        hide: 'Hide code',
      },
);

watch(
  [showCode, demoFramework, () => props.vueCode, () => props.reactCode, isDark],
  async ([show, framework, vueCode, reactCode, dark]) => {
    if (!show) return;
    const code = framework === 'vue' ? vueCode : reactCode;
    if (!code) return;
    highlighted.value = await codeToHtml(code, {
      lang: framework === 'vue' ? 'vue' : 'tsx',
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: 'light',
    });
  },
  { immediate: true },
);
</script>

<template>
  <div class="demo-block">
    <div class="demo-block__preview">
      <LocaleProvider :locale="docsLocale">
        <component :is="props.vueDemo" v-if="demoFramework === 'vue' && props.vueDemo" />
        <ReactDemo v-else-if="props.reactDemo" :demo="props.reactDemo" :locale="docsLocale" />
      </LocaleProvider>
    </div>
    <div class="demo-block__body">
      <div class="demo-block__toolbar">
        <div class="demo-tabs" role="tablist" :aria-label="labels.framework">
          <button
            class="demo-tabs__tab"
            :class="{ 'is-active': demoFramework === 'vue' }"
            role="tab"
            :aria-selected="demoFramework === 'vue'"
            @click="demoFramework = 'vue'"
          >
            Vue
          </button>
          <button
            class="demo-tabs__tab"
            :class="{ 'is-active': demoFramework === 'react' }"
            role="tab"
            :aria-selected="demoFramework === 'react'"
            @click="demoFramework = 'react'"
          >
            React
          </button>
        </div>
        <button class="demo-block__toggle" @click="showCode = !showCode">
          {{ showCode ? labels.hide : labels.show }}
        </button>
        <span class="demo-block__lang">{{
          demoFramework === 'vue' ? 'Vue 3 · SFC' : 'React 19 · TSX'
        }}</span>
      </div>
      <div v-if="showCode" class="demo-block__code" v-html="highlighted" />
    </div>
  </div>
</template>
