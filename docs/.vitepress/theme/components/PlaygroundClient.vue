<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import * as VueRuntime from 'vue';
import type { Component } from 'vue';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import * as SyReact from '@sycee-ui/react';
import * as SyVue from '@sycee-ui/vue';
import { transform } from 'sucrase';
import { parse, compileScript, compileTemplate } from '@vue/compiler-sfc';
import { EditorView, basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { demoFramework } from '../framework';

const REACT_STARTER = `import { useState } from 'react';
import { Button, Input, Switch, Tag } from '@sycee-ui/react';

export default function Demo() {
  const [name, setName] = useState('');
  const [dark, setDark] = useState(false);
  const [greeting, setGreeting] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <Input value={name} onChange={(v) => setName(v)} placeholder="Your name" clearable />
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Button onClick={() => setGreeting(\`Hello, \${name || 'stranger'}!\`)}>Greet me</Button>
        <Tag color={dark ? 'primary' : 'success'}>{dark ? 'night' : 'day'}</Tag>
        <Switch checked={dark} onChange={setDark} />
      </div>
      {greeting && <Alert type="info">{greeting}</Alert>}
    </div>
  );
}
`.replace('<Alert type="info">{greeting}</Alert>', '<div style={{ color: \'#6e56cf\' }}>{greeting}</div>');

const VUE_STARTER = `<script setup>
import { ref } from 'vue';
import { Button, Input, Switch, Tag } from '@sycee-ui/vue';

const name = ref('');
const dark = ref(false);
const greeting = ref('');
<\/script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px; width: 320px">
    <Input v-model="name" placeholder="Your name" clearable />
    <div style="display: flex; gap: 12px; align-items: center">
      <Button @click="greeting = \`Hello, \${name || 'stranger'}!\`">Greet me</Button>
      <Tag :color="dark ? 'primary' : 'success'">{{ dark ? 'night' : 'day' }}</Tag>
      <Switch v-model="dark" />
    </div>
    <div v-if="greeting" style="color: #6e56cf">{{ greeting }}</div>
  </div>
</template>
`;

const framework = demoFramework;
const code = ref('');
const error = ref('');
const editorHost = ref<HTMLDivElement>();
const previewHost = ref<HTMLDivElement>();

let view: EditorView | null = null;
let app: VueRuntime.App | null = null;
let reactRoot: ReturnType<typeof ReactDOM.createRoot> | null = null;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

const MODULES: Record<string, unknown> = {
  react: React,
  'react-dom/client': ReactDOM,
  '@sycee-ui/react': SyReact,
  vue: VueRuntime,
  '@sycee-ui/vue': SyVue,
};

function loadModule(name: string): unknown {
  return MODULES[name] ?? {};
}

function runReact(source: string) {
  const { code: js } = transform(source, {
    transforms: ['typescript', 'jsx', 'imports'],
    jsxRuntime: 'classic',
    production: true,
  });
  const module_ = { exports: {} as Record<string, unknown> };
  const fn = new Function('require', 'module', 'exports', 'React', 'ReactDOM', js);
  fn(loadModule, module_, module_.exports, React, ReactDOM);
  const Demo = (module_.exports.default ?? module_.exports.Demo) as () => unknown;
  if (!Demo) throw new Error('Demo component not found — export default a component.');
  if (!reactRoot && previewHost.value) {
    reactRoot = ReactDOM.createRoot(previewHost.value);
  }
  reactRoot?.render(React.createElement(Demo as never));
}

function runVue(source: string) {
  if (!previewHost.value) return;
  const { descriptor } = parse(source, { filename: 'Demo.vue' });
  const id = Math.random().toString(36).slice(2, 8);

  let scriptContent = '';
  let bindings = undefined;
  if (descriptor.scriptSetup || descriptor.script) {
    const script = compileScript(descriptor, { id });
    scriptContent = script.content;
    bindings = script.bindings;
  }

  let renderCode = '';
  if (descriptor.template) {
    const tpl = compileTemplate({
      source: descriptor.template.content,
      id,
      filename: 'Demo.vue',
      compilerOptions: { bindingMetadata: bindings },
    });
    if (tpl.errors.length) throw new Error(tpl.errors.map(String).join('\n'));
    renderCode = tpl.code
      .replace(/export default/, 'const __render =')
      .replace(/export (function|const|let|var)/g, '$1');
  }

  const js = scriptContent.replace(/export default/, 'const __sfc__ =');
  // compileScript always emits the component (we replaced its export default
  // with `const __sfc__ =`); for a template-only SFC we declare it ourselves.
  // compileTemplate emits either `export default function render` (=> __render)
  // or `export function render` (=> hoisted `render`); wire either onto __sfc__.
  const glue =
    (scriptContent ? '' : 'var __sfc__ = {};\n') +
    `if (typeof __render !== 'undefined') { __sfc__.render = __render; }\n` +
    `else if (typeof render !== 'undefined') { __sfc__.render = render; }\n` +
    `module.exports.default = __sfc__;`;
  // compileScript keeps ESM imports; convert the whole module to CJS so it can
  // run inside a plain Function constructor (same trick as the React path).
  const { code: cjs } = transform(`${js}\n${renderCode}\n${glue}`, {
    transforms: ['imports'],
    production: true,
  });
  const module_ = { exports: {} as Record<string, unknown> };
  const fn = new Function('require', 'module', 'exports', cjs);
  fn(loadModule, module_, module_.exports);
  const sfc = module_.exports.default as Component;
  if (!sfc) throw new Error('Demo component not found — export default a component.');

  app?.unmount();
  previewHost.value.innerHTML = '';
  app = VueRuntime.createApp(sfc);
  for (const [name, comp] of Object.entries(SyVue)) {
    if (typeof comp === 'object' || typeof comp === 'function') {
      app.component(name, comp as Component);
    }
  }
  app.mount(previewHost.value);
}

function run() {
  error.value = '';
  app?.unmount();
  app = null;
  reactRoot?.unmount();
  reactRoot = null;
  if (previewHost.value) previewHost.value.innerHTML = '';
  try {
    if (framework.value === 'react') runReact(code.value);
    else runVue(code.value);
  } catch (err) {
    error.value = err instanceof Error ? err.message : String(err);
  }
}

function scheduleRun() {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(run, 400);
}

function switchTemplate() {
  code.value = framework.value === 'react' ? REACT_STARTER : VUE_STARTER;
  if (view) view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: code.value } });
  run();
}

watch(framework, switchTemplate);

onMounted(() => {
  // Deep-link support: /playground/?framework=react
  const param = new URLSearchParams(window.location.search).get('framework');
  if (param === 'react' || param === 'vue') {
    framework.value = param;
  }
  code.value = framework.value === 'react' ? REACT_STARTER : VUE_STARTER;
  if (editorHost.value) {
    view = new EditorView({
      parent: editorHost.value,
      doc: code.value,
      extensions: [
        basicSetup,
        javascript({ jsx: true, typescript: true }),
        oneDark,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            code.value = update.state.doc.toString();
            scheduleRun();
          }
        }),
      ],
    });
  }
  run();
});

onBeforeUnmount(() => {
  view?.destroy();
  app?.unmount();
  reactRoot?.unmount();
  if (debounceTimer) clearTimeout(debounceTimer);
});
</script>

<template>
  <div class="pg">
    <div class="pg__bar">
      <div class="demo-tabs" role="tablist" aria-label="Framework">
        <button
          v-for="f in ['vue', 'react']"
          :key="f"
          class="demo-tabs__tab"
          :class="{ 'is-active': framework === f }"
          role="tab"
          :aria-selected="framework === f"
          @click="framework = f as 'vue' | 'react'"
        >
          {{ f === 'vue' ? 'Vue' : 'React' }}
        </button>
      </div>
      <button class="pg__reset" @click="switchTemplate">Reset</button>
    </div>
    <div class="pg__grid">
      <div class="pg__editor">
        <div ref="editorHost" class="pg__cm" />
      </div>
      <div class="pg__preview">
        <div v-if="error" class="pg__error">{{ error }}</div>
        <div ref="previewHost" class="pg__canvas" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.pg {
  margin-top: 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
}

.pg__bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.pg__reset {
  margin-left: auto;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-2);
  border-radius: 6px;
  padding: 3px 12px;
  font-size: 12px;
  cursor: pointer;
}

.pg__reset:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.pg__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 420px;
}

@media (max-width: 768px) {
  .pg__grid {
    grid-template-columns: 1fr;
  }
}

.pg__editor {
  border-right: 1px solid var(--vp-c-divider);
}

.pg__cm {
  height: 100%;
}

.pg__cm :deep(.cm-editor) {
  height: 100%;
  font-size: 13px;
}

.pg__cm :deep(.cm-scroller) {
  font-family: ui-monospace, 'SF Mono', Menlo, monospace;
}

.pg__preview {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 20px;
  background:
    linear-gradient(45deg, var(--vp-c-bg-soft) 25%, transparent 25%),
    linear-gradient(-45deg, var(--vp-c-bg-soft) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, var(--vp-c-bg-soft) 75%),
    linear-gradient(-45deg, transparent 75%, var(--vp-c-bg-soft) 75%);
  background-size: 16px 16px;
  background-position:
    0 0,
    0 8px,
    8px -8px,
    -8px 0;
}

.pg__canvas {
  width: 100%;
  display: flex;
  justify-content: center;
}

.pg__error {
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  white-space: pre-wrap;
  color: #f2555b;
  background: rgba(242, 85, 91, 0.08);
  border: 1px solid rgba(242, 85, 91, 0.35);
  padding: 12px 16px;
  border-radius: 8px;
  font-family: ui-monospace, monospace;
  font-size: 12px;
  z-index: 10;
}
</style>
