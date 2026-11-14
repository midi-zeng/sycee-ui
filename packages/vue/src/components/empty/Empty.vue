<script setup lang="ts">
import { cx } from '../../utils/cx';

defineOptions({ name: 'SyEmpty' });

interface Props {
  /** Description text; can be replaced by the default slot. @default 'No data' */
  description?: string;
}

const { description = 'No data' } = defineProps<Props>();
</script>

<template>
  <div :class="cx('sy-empty', $attrs.class as string)">
    <div class="sy-empty__image" aria-hidden="true">
      <slot name="image">
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          stroke="currentColor"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          focusable="false"
        >
          <!-- floating document -->
          <g opacity="0.45">
            <path d="M47 12h17l8 8v13H47V12Z" />
            <path d="M64 12v8h8" />
            <path d="M54 22h12" />
            <path d="M54 27h12" />
          </g>
          <!-- open flaps -->
          <g opacity="0.5">
            <path d="M36 57L22 48l25-10 13 10" />
            <path d="M84 57l14-9-25-10-13 10" />
          </g>
          <!-- open box -->
          <path d="M36 57v26l24 10 24-10V57" />
          <path d="M36 57l24 10 24-10" opacity="0.7" />
          <path d="M36 57l24-9 24 9" opacity="0.45" />
          <path d="M60 67v26" opacity="0.4" />
        </svg>
      </slot>
    </div>
    <div class="sy-empty__description">
      <slot>{{ description }}</slot>
    </div>
  </div>
</template>
