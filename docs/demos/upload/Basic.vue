<script setup lang="ts">
import { ref } from 'vue';
import { Upload } from '@sycee-ui/vue';
import type { UploadFile } from '@sycee-ui/vue';

const files = ref<UploadFile[]>([]);

const dragFiles = ref<UploadFile[]>([]);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 16px; max-width: 420px">
    <Upload v-model="files" multiple accept="image/*" />
    <Upload v-model="dragFiles" drag />
  </div>
</template>
