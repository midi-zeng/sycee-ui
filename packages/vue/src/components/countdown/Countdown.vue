<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { cx } from '../../utils/cx';
import type { ComponentSize } from '../../types';

defineOptions({ name: 'SyCountdown' });

interface Props {
  /** Target timestamp, date string, or `Date` instance. */
  target: number | string | Date;
  /** Token pattern; supports DD, HH, mm, ss and single-digit variants. @default 'DD:HH:mm:ss' */
  format?: string;
  /** Visual size. @default 'md' */
  size?: ComponentSize;
  /** Renders each unit in a raised tile. */
  boxed?: boolean;
  /** Optional accessible label. */
  label?: string;
}

const {
  target,
  format = 'DD:HH:mm:ss',
  size = 'md',
  boxed = false,
  label,
} = defineProps<Props>();

const emit = defineEmits<{ finish: [] }>();

function targetTime(value: Props['target']) {
  const time =
    value instanceof Date
      ? value.getTime()
      : typeof value === 'number'
        ? value
        : Date.parse(value);
  return Number.isFinite(time) ? time : 0;
}

const now = ref(Date.now());
const finished = ref(false);
let timer: ReturnType<typeof setInterval> | undefined;

const total = computed(() => Math.max(0, Math.floor((targetTime(target) - now.value) / 1000)));
const values = computed(() => {
  const DD = Math.floor(total.value / 86400);
  const HH = Math.floor((total.value % 86400) / 3600);
  const mm = Math.floor((total.value % 3600) / 60);
  const ss = total.value % 60;
  return {
    DD: String(DD).padStart(2, '0'),
    HH: String(HH).padStart(2, '0'),
    mm: String(mm).padStart(2, '0'),
    ss: String(ss).padStart(2, '0'),
    D: String(DD),
    H: String(HH),
    m: String(mm),
    s: String(ss),
  } as Record<string, string>;
});

const segments = computed(() => format.split(/(DD|HH|mm|ss|D|H|m|s)/g));

function start() {
  if (timer) clearInterval(timer);
  finished.value = false;
  now.value = Date.now();
  timer = setInterval(() => {
    now.value = Date.now();
    checkFinished();
  }, 1000);
}

function checkFinished() {
  if (total.value > 0 || finished.value) return;
  finished.value = true;
  emit('finish');
}

watch(
  () => target,
  () => {
    start();
    void nextTick(checkFinished);
  },
);

onMounted(() => {
  start();
  void nextTick(checkFinished);
});
onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <div
    role="timer"
    :aria-label="label"
    :class="
      cx(
        'sy-countdown',
        `sy-countdown--${size}`,
        boxed && 'sy-countdown--boxed',
        total === 0 && 'is-finished',
        $attrs.class as string,
      )
    "
  >
    <template v-for="(segment, index) in segments" :key="`${segment}-${index}`">
      <span v-if="values[segment]" class="sy-countdown__segment">{{ values[segment] }}</span>
      <span v-else class="sy-countdown__separator" aria-hidden="true">{{ segment }}</span>
    </template>
  </div>
</template>
