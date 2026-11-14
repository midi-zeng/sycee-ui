<script lang="ts">
import type { InjectionKey, Ref } from 'vue';

/** Context provided by SyRadioGroup to its SyRadio children. */
export interface RadioGroupContext {
  /** Currently selected value in the group. */
  value: Ref<string | number | null | undefined>;
  /** Disables every radio in the group. */
  disabled: Ref<boolean>;
  /** `name` shared by every radio input in the group. */
  name: string;
}

export const radioGroupKey: InjectionKey<RadioGroupContext> = Symbol('sy-radio-group');
</script>

<script setup lang="ts">
import { computed, inject, useAttrs } from 'vue';
import { cx } from '../../utils/cx';

defineOptions({ name: 'SyRadio', inheritAttrs: false });

interface Props {
  /** Label text rendered next to the dot; the default slot takes precedence. */
  label?: string;
  disabled?: boolean;
  /** Value used inside a RadioGroup to identify this radio. */
  value?: string | number;
  /** Shared native input `name`; provided by RadioGroup when used inside one. */
  name?: string;
}

const { label, disabled = false, value, name } = defineProps<Props>();

const emit = defineEmits<{ change: [checked: boolean] }>();

const model = defineModel<boolean>();

const group = inject(radioGroupKey, null);

// `inheritAttrs: false` — fallthrough attrs (aria-*, form attrs, ...) go to the
// native input; class/style go to the root element.
const attrs = useAttrs();
const inputAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs;
  return rest;
});

const isChecked = computed(() =>
  group && value !== undefined ? group.value.value === value : (model.value ?? false),
);
const isDisabled = computed(() => disabled || (group ? group.disabled.value : false));
const resolvedName = name ?? group?.name;

const rootClass = computed(() =>
  cx(
    'sy-radio',
    isChecked.value && 'is-checked',
    isDisabled.value && 'is-disabled',
    attrs.class as string | undefined,
  ),
);
const rootStyle = computed(() => attrs.style);

function onChange(event: Event) {
  const checked = (event.target as HTMLInputElement).checked;
  if (group && value !== undefined) {
    if (checked) group.value.value = value;
  } else {
    model.value = checked;
  }
  emit('change', checked);
}
</script>

<template>
  <label :class="rootClass" :style="rootStyle">
    <!-- The native input must stay first so SCSS can draw the focus ring on its sibling dot. -->
    <input
      v-bind="inputAttrs"
      type="radio"
      class="sy-radio__native"
      :name="resolvedName"
      :value="value"
      :checked="isChecked"
      :disabled="isDisabled"
      @change="onChange"
    />
    <span class="sy-radio__dot" aria-hidden="true" />
    <span v-if="label != null || $slots.default" class="sy-radio__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>
