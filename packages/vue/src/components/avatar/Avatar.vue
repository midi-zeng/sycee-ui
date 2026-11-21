<script setup lang="ts">
import { computed, inject, ref, watch } from 'vue';
import type { Ref } from 'vue';
import { cx } from '../../utils/cx';
import type { ComponentSize } from '../../types';

defineOptions({ name: 'SyAvatar' });

type AvatarSize = number | ComponentSize;

interface Props {
  /** Image source; when loading fails the fallback content is shown instead. */
  src?: string;
  /** Accessible alt text; its first character is used as the text fallback. */
  alt?: string;
  /** Pixel size (number) or named size. Defaults to 'md' or the AvatarGroup size. */
  size?: AvatarSize;
  /** Shape of the avatar. @default 'circle' */
  shape?: 'circle' | 'square';
}

const { src, alt, size, shape = 'circle' } = defineProps<Props>();

// Provided by SyAvatarGroup (string key shared with Avatar.vue).
const groupSize = inject<Readonly<Ref<AvatarSize | undefined>> | null>('sy-avatar-group', null);

const errored = ref(false);
watch(
  () => src,
  () => {
    errored.value = false;
  },
);

const resolvedSize = computed<AvatarSize | undefined>(() => size ?? groupSize?.value);
const sizeMod = computed(() => {
  const s = resolvedSize.value;
  return typeof s === 'string' && s !== 'md' ? s : undefined;
});
const sizeStyle = computed(() => {
  const s = resolvedSize.value;
  if (typeof s !== 'number') return undefined;
  return {
    width: `${s}px`,
    height: `${s}px`,
    fontSize: `${Math.round(s * 0.44)}px`,
  };
});
const showImg = computed(() => src !== undefined && !errored.value);
const altInitial = computed(() => (alt ?? '').charAt(0).toUpperCase());
const fallbackLabel = computed(() => (!showImg.value && src !== undefined ? alt : undefined));
</script>

<template>
  <span
    :class="
      cx(
        'sy-avatar',
        sizeMod && `sy-avatar--${sizeMod}`,
        shape === 'square' && 'sy-avatar--square',
        $attrs.class as string,
      )
    "
    :style="sizeStyle"
    :role="fallbackLabel ? 'img' : undefined"
    :aria-label="fallbackLabel"
  >
    <img v-if="showImg" class="sy-avatar__img" :src="src" :alt="alt" @error="errored = true" />
    <span v-else class="sy-avatar__text" :aria-hidden="src !== undefined ? true : undefined">
      <slot v-if="$slots.default" />
      <template v-else>{{ altInitial }}</template>
    </span>
  </span>
</template>
