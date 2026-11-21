<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { withBase } from 'vitepress';
import DemoBlock from './DemoBlock.vue';
import { zhComponents } from '../zhCatalog';

const props = defineProps<{ name: string }>();

const vueDemoModules = import.meta.glob<{ default: unknown }>('../../../demos/**/Basic.vue');
const vueCodeModules = import.meta.glob<string>('../../../demos/**/Basic.vue', {
  query: '?raw',
  import: 'default',
});
const reactDemoModules = import.meta.glob<{ default: unknown }>('../../../demos/**/Basic.tsx');
const reactCodeModules = import.meta.glob<string>('../../../demos/**/Basic.tsx', {
  query: '?raw',
  import: 'default',
});

const meta = computed(
  () =>
    zhComponents[props.name] ?? {
      title: props.name,
      category: '组件',
      description: '查看实时示例、属性和事件。',
    },
);

const vueDemo = ref<unknown>();
const reactDemo = ref<unknown>();
const vueSource = ref('');
const reactSource = ref('');
const englishHref = computed(() => withBase(`/components/${props.name}`));
let loadSequence = 0;

async function loadDemo(name: string) {
  const sequence = ++loadSequence;
  const [vue, react, vueRaw, reactRaw] = await Promise.all([
    vueDemoModules[`../../../demos/${name}/Basic.vue`]?.(),
    reactDemoModules[`../../../demos/${name}/Basic.tsx`]?.(),
    vueCodeModules[`../../../demos/${name}/Basic.vue`]?.(),
    reactCodeModules[`../../../demos/${name}/Basic.tsx`]?.(),
  ]);
  if (sequence !== loadSequence) return;
  vueDemo.value = vue?.default;
  reactDemo.value = react?.default;
  vueSource.value = vueRaw ?? '';
  reactSource.value = reactRaw ?? '';
}

onMounted(() => {
  void loadDemo(props.name);
});
watch(
  () => props.name,
  (name) => {
    void loadDemo(name);
  },
);
</script>

<template>
  <p class="sy-zh-category">{{ meta.category }}</p>
  <h1>{{ meta.title }}</h1>
  <p>{{ meta.description }}</p>

  <DemoBlock
    v-if="vueDemo || reactDemo"
    :vue-demo="vueDemo"
    :vue-code="vueSource"
    :react-demo="reactDemo"
    :react-code="reactSource"
  />

  <h2>使用方式</h2>
  <p>
    从 <code>@sycee-ui/vue</code> 或 <code>@sycee-ui/react</code> 导入组件。上方示例可以在
    Vue 与 React 之间切换，两个框架使用一致的属性、事件和视觉表现。
  </p>

  <h2>属性与事件</h2>
  <p>
    该组件的完整属性、事件、插槽和无障碍说明收录在
    <a :href="englishHref">英文 API 文档</a> 中。按钮文案、空状态、关闭提示等内置文本会通过
    <code>LocaleProvider</code> 自动使用中文。
  </p>

  <div class="sy-zh-note">
    组件默认语言为英文；在中文文档中，演示会自动包裹 <code>&lt;LocaleProvider locale="zh"&gt;</code>。
  </div>
</template>

<style scoped>
.sy-zh-category {
  margin-bottom: 0;
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.sy-zh-note {
  margin-top: 24px;
  padding: 14px 16px;
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 28%, var(--vp-c-divider));
  border-radius: 10px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-text-2);
  font-size: 14px;
}
</style>
